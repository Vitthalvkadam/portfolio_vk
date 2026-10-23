import { useId } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Skyline
 * A row of quirky sepia landmarks — a church with owl-eye windows, a windmill,
 * a giant coffee-cup building (it's a Java developer's portfolio), a
 * double-decker bus, a radio tower, a cottage — and a tiny Street View pegman.
 * A nod to the "wonders" in the reference image, drawn as flat SVG shapes with
 * gradient shading so it stays crisp, tiny and themeable.
 *
 * Colours come from --sk-* CSS variables: the hero uses the day / dark-theme
 * values from :root, the footer wraps it in `.sk-night`.
 *
 * Two layers (back / front) are exported separately so the hero can move them
 * at different scroll speeds.
 */

const VB_W = 2000;
const VB_H = 360;

// deterministic pseudo-random in [0,1) so the window flicker looks random
// but is stable between renders
const rnd = (n) => ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;

const fill = (v) => ({ fill: `var(${v})` });

function Gradients({ uid }) {
  const g = (key, v) => (
    <linearGradient id={`${uid}-${key}`} x1="0" y1="0" x2="1" y2="0.15">
      <stop offset="0" style={{ stopColor: `color-mix(in srgb, var(${v}) 78%, #fff3d8)` }} />
      <stop offset="1" style={{ stopColor: `color-mix(in srgb, var(${v}) 80%, #140a04)` }} />
    </linearGradient>
  );
  return (
    <defs>
      {g("a", "--sk-a")}
      {g("b", "--sk-b")}
      {g("c", "--sk-c")}
      {g("h", "--sk-h")}
    </defs>
  );
}

function Windows({ items, seed = 0 }) {
  return items.map(([x, y, w, h, r = 3], i) => (
    <rect
      key={`${x}-${y}`}
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className="sk-win"
      style={{ "--d": `${4 + rnd(seed + i) * 7}s`, "--dl": `${-rnd(seed + i + 40) * 9}s` }}
    />
  ));
}

const row = (x0, y, n, step, w, h) => Array.from({ length: n }, (_, i) => [x0 + i * step, y, w, h]);

function Pegman({ walking }) {
  const body = (
    <>
      <circle cx="0" cy="-68" r="9.5" style={fill("--sk-peg")} />
      <path d="M-13 -56h26l-4 34h-18z" style={fill("--sk-peg")} />
      <rect x="-9" y="-24" width="7" height="24" rx="2" style={fill("--sk-peg")} />
      <rect x="2" y="-24" width="7" height="24" rx="2" style={fill("--sk-peg")} />
      <rect x="-21" y="-55" width="8" height="24" rx="3.5" style={fill("--sk-peg")} />
      {walking ? (
        <rect x="13" y="-55" width="8" height="24" rx="3.5" style={fill("--sk-peg")} />
      ) : (
        <g className="sk-wave" style={{ transformOrigin: "17px -52px" }}>
          <rect x="13" y="-80" width="8" height="30" rx="3.5" style={fill("--sk-peg")} />
        </g>
      )}
    </>
  );
  return (
    <g transform="translate(1000 360)">
      {walking ? (
        <g className="sk-walk">
          <g className="sk-step">{body}</g>
        </g>
      ) : (
        body
      )}
    </g>
  );
}

function Back({ uid }) {
  const c = `url(#${uid}-c)`;
  // lattice braces for the radio tower
  const legX = (y) => [1268 + (28 * (360 - y)) / 296, 1332 - (28 * (360 - y)) / 296];
  const levels = [360, 300, 240, 180, 120, 70];
  const braces = levels
    .slice(0, -1)
    .map((y, i) => {
      const [l1, r1] = legX(y);
      const [l2, r2] = legX(levels[i + 1]);
      return i % 2 === 0 ? `M${l1} ${y}L${r2} ${levels[i + 1]}` : `M${r1} ${y}L${l2} ${levels[i + 1]}`;
    })
    .join("");

  return (
    <g>
      <path d="M0 336Q260 286 520 320T1040 314T1560 324T2000 300V360H0z" fill={c} opacity=".55" />
      {/* far houses */}
      <g fill={c} opacity=".8">
        <rect x="20" y="312" width="70" height="48" rx="3" />
        <rect x="100" y="298" width="52" height="62" rx="3" />
        <rect x="760" y="318" width="60" height="42" rx="3" />
        <rect x="1960" y="306" width="46" height="54" rx="3" />
      </g>
      <g transform="translate(200 0)">
        {/* windmill */}
        <path d="M306 360h68l-18-154h-32z" fill={c} />
        <path d="M318 208q22-40 44 0z" fill={c} />
        <g className="sk-spin" style={{ transformOrigin: "340px 190px" }}>
          {[0, 90, 180, 270].map((a) => (
            <g key={a} transform={`rotate(${a} 340 190)`} fill={c}>
              <rect x="337" y="104" width="6" height="86" />
              <path d="M343 110h24v52h-24z" opacity=".7" />
            </g>
          ))}
        </g>
        <circle cx="340" cy="190" r="7" fill={c} />

        {/* radio tower */}
        <g style={{ stroke: "var(--sk-c)" }} fill="none" strokeWidth="4" strokeLinecap="round">
          <path d="M1268 360L1296 64M1332 360L1304 64" />
          <path d={braces} strokeWidth="3" />
          <path d="M1300 64V24" />
          <path d="M1280 186h40" strokeWidth="6" />
        </g>
        <circle className="sk-beacon" cx="1300" cy="18" r="5" />
      </g>
    </g>
  );
}

function Front({ uid, walker }) {
  const a = `url(#${uid}-a)`;
  const b = `url(#${uid}-b)`;
  const h = `url(#${uid}-h)`;
  const hedge = (list) =>
    list.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={h} />);

  return (
    <g>
      <g transform="translate(200 0)">
        {/* church with owl eyes */}
        <path d="M50 262l95-40 95 40V360H50z" fill={a} />
        <rect x="98" y="164" width="64" height="196" fill={b} />
        <path d="M88 166l42-46 42 46z" fill={a} />
        <rect x="127" y="84" width="6" height="40" fill={b} />
        <rect x="118" y="94" width="24" height="6" fill={b} />
        <circle cx="114" cy="206" r="13" style={fill("--sk-eye")} />
        <circle cx="146" cy="206" r="13" style={fill("--sk-eye")} />
        <circle cx="114" cy="206" r="5" fill={b} />
        <circle cx="146" cy="206" r="5" fill={b} />
        <path d="M118 360v-34a12 12 0 0 1 24 0v34z" className="sk-win" style={{ "--d": "9s", "--dl": "-2s" }} />
        <Windows items={[[68, 292, 14, 28], [208, 292, 14, 28]]} seed={3} />

        {/* giant coffee cup */}
        <g fill="none" strokeLinecap="round" strokeWidth="7" style={{ stroke: "var(--sk-peg)" }} opacity=".4">
          <path className="sk-steam" d="M556 178c-16-20 16-34 0-62" />
          <path className="sk-steam" style={{ "--delay": "-2s" }} d="M590 178c-16-20 16-34 0-62" />
          <path className="sk-steam" style={{ "--delay": "-4s" }} d="M624 178c-16-20 16-34 0-62" />
        </g>
        <path d="M706 224c68-8 72 84-16 96" fill="none" strokeWidth="20" strokeLinecap="round" style={{ stroke: "var(--sk-b)" }} />
        <path d="M470 196h240l-16 126q-6 30-38 30H524q-32 0-38-30z" fill={b} />
        <ellipse cx="590" cy="196" rx="120" ry="15" fill={a} />
        <ellipse cx="590" cy="198" rx="108" ry="10" style={fill("--sk-h")} />
        <ellipse cx="590" cy="356" rx="150" ry="7" fill={h} />
        <Windows
          items={[...row(514, 226, 5, 40, 24, 22), ...row(514, 260, 5, 40, 24, 22), ...row(534, 294, 4, 40, 24, 22)]}
          seed={20}
        />

        {/* double-decker */}
        <rect x="890" y="236" width="300" height="108" rx="16" fill={a} />
        <rect x="890" y="284" width="300" height="8" style={fill("--sk-h")} />
        <Windows items={[...row(906, 250, 8, 35, 27, 26), ...row(906, 300, 6, 42, 34, 28)]} seed={50} />
        <circle cx="950" cy="340" r="19" fill={h} />
        <circle cx="1130" cy="340" r="19" fill={h} />
        <circle cx="950" cy="340" r="7" style={fill("--sk-eye")} opacity=".7" />
        <circle cx="1130" cy="340" r="7" style={fill("--sk-eye")} opacity=".7" />

        {/* cottage */}
        <rect x="1500" y="246" width="16" height="36" fill={b} />
        <rect x="1392" y="296" width="140" height="64" fill={a} />
        <path d="M1376 298l86-60 86 60z" fill={b} />
        <Windows items={[[1410, 316, 22, 20], [1500, 316, 22, 20], [1450, 322, 24, 38]]} seed={80} />
      </g>

      {/* hedges & ground */}
      <g>
        {hedge([[24, 346, 30], [70, 340, 34], [128, 352, 28], [196, 348, 30]])}
        {hedge([[462, 346, 30], [504, 340, 38], [552, 350, 32], [598, 344, 34], [640, 352, 28]])}
        {hedge([[944, 346, 36], [992, 352, 34], [1040, 346, 34], [1070, 352, 26]])}
        {hedge([[1396, 350, 30], [1438, 344, 34], [1480, 352, 28], [1760, 346, 34], [1806, 340, 30], [1860, 350, 34], [1930, 344, 32], [1984, 352, 30]])}
        <rect x="0" y="352" width={VB_W} height="8" fill={h} />
      </g>

      <Pegman walking={walker} />
    </g>
  );
}

/** layer: "back" | "front". walker: pegman strolls (footer) instead of waving (hero). */
export default function Skyline({ layer = "front", walker = false, className = "" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <Gradients uid={uid} />
      {layer === "back" ? <Back uid={uid} /> : <Front uid={uid} walker={walker} />}
    </svg>
  );
}

/**
 * HeroSkyline
 * Full-bleed strip pinned to the bottom of the hero. It rises into place on
 * load (back layer first, then front) and the two layers drift at different
 * speeds as you scroll away, which gives the cinematic depth.
 */
export function HeroSkyline() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 800], [0, 110]);
  const yFront = useTransform(scrollY, [0, 800], [0, 40]);
  const rise = (delay) => ({
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[var(--hero-sky)] w-screen -translate-x-1/2 overflow-hidden"
    >
      <motion.div style={reduce ? undefined : { y: yBack }} className="absolute inset-0">
        <motion.div {...rise(0.15)} className="absolute inset-0">
          <Skyline layer="back" />
        </motion.div>
      </motion.div>
      <motion.div style={reduce ? undefined : { y: yFront }} className="absolute inset-0">
        <motion.div {...rise(0.4)} className="absolute inset-0">
          <Skyline layer="front" />
        </motion.div>
      </motion.div>
    </div>
  );
}
