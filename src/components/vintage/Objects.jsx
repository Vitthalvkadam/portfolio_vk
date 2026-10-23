/**
 * Vintage objects
 * Small sepia "3D" illustrations built from SVG gradients (no image files, no
 * dependencies). Colours come from the --sp-* CSS variables so they re-tint
 * automatically for the light (cream) and dark (candlelit) themes.
 *
 * <SepiaDefs /> must be mounted once on the page (Background does this); the
 * objects reference its gradients by id.
 */

const stop = (v) => ({ stopColor: `var(${v})` });

export function SepiaDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        {/* lit sphere: highlight top-left, shadow bottom-right */}
        <radialGradient id="sp-sphere" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" style={stop("--sp-hi")} />
          <stop offset="0.55" style={stop("--sp-mid")} />
          <stop offset="1" style={stop("--sp-lo")} />
        </radialGradient>
        {/* cylindrical body: light edge, dark edge */}
        <linearGradient id="sp-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={stop("--sp-mid")} />
          <stop offset="0.3" style={stop("--sp-hi")} />
          <stop offset="1" style={stop("--sp-lo")} />
        </linearGradient>
        {/* brushed metal, top to bottom */}
        <linearGradient id="sp-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop("--sp-hi")} />
          <stop offset="0.5" style={stop("--sp-mid")} />
          <stop offset="1" style={stop("--sp-lo")} />
        </linearGradient>
      </defs>
    </svg>
  );
}

const common = {
  viewBox: "0 0 120 120",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
  className: "h-full w-full overflow-visible",
};

export function Globe() {
  return (
    <svg {...common}>
      <ellipse cx="60" cy="112" rx="28" ry="4" className="f-lo" opacity=".3" />
      <path d="M42 110h36l-7-12H49z" fill="url(#sp-body)" />
      <rect x="57" y="86" width="6" height="14" className="f-mid" />
      <g transform="rotate(-18 60 52)">
        <circle cx="60" cy="52" r="36" fill="url(#sp-sphere)" />
        {/* land masses */}
        <path d="M38 40c6-8 16-6 18 0s-6 8-4 14-12 6-14-2-4-6 0-12z" className="f-lo" opacity=".38" />
        <path d="M68 58c8-4 16 2 14 10s-10 12-14 6-4-12 0-16z" className="f-lo" opacity=".38" />
        <path d="M70 30c5-3 10 0 9 4s-8 4-9-4z" className="f-lo" opacity=".38" />
        {/* graticule */}
        <g fill="none" className="s-line" strokeWidth="0.8" opacity=".45">
          <ellipse cx="60" cy="52" rx="14" ry="36" />
          <ellipse cx="60" cy="52" rx="28" ry="36" />
          <path d="M24 52h72M30 34h60M30 70h60" />
        </g>
        {/* meridian ring */}
        <path d="M60 10a42 42 0 0 1 0 84" fill="none" stroke="url(#sp-metal)" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function CoffeeCup() {
  return (
    <svg {...common}>
      <g fill="none" className="s-line" strokeWidth="3" strokeLinecap="round">
        <path className="vt-steam" d="M46 34c-7-8 7-12 0-22" opacity=".6" />
        <path className="vt-steam" style={{ "--delay": "-1.6s" }} d="M60 34c-7-8 7-12 0-22" opacity=".6" />
        <path className="vt-steam" style={{ "--delay": "-3.2s" }} d="M74 34c-7-8 7-12 0-22" opacity=".6" />
      </g>
      <ellipse cx="58" cy="102" rx="44" ry="9" fill="url(#sp-metal)" />
      <ellipse cx="58" cy="99" rx="30" ry="5" className="f-lo" opacity=".45" />
      <path d="M92 58c22-4 20 26-2 28" fill="none" stroke="url(#sp-metal)" strokeWidth="7" strokeLinecap="round" />
      <path d="M24 46c0 34 12 50 34 50s34-16 34-50z" fill="url(#sp-body)" />
      <ellipse cx="58" cy="46" rx="34" ry="8" className="f-hi" />
      <ellipse cx="58" cy="47" rx="29" ry="5.5" className="f-lo" />
      <ellipse cx="50" cy="45.5" rx="10" ry="1.8" className="f-mid" opacity=".7" />
    </svg>
  );
}

export function Camera() {
  return (
    <svg {...common}>
      <ellipse cx="60" cy="104" rx="46" ry="5" className="f-lo" opacity=".25" />
      <path d="M36 40l6-11h28l6 11z" className="f-mid" />
      <rect x="82" y="30" width="16" height="9" rx="2" className="f-hi" />
      <circle cx="30" cy="34" r="4.5" className="f-lo" />
      <rect x="12" y="38" width="96" height="62" rx="9" fill="url(#sp-metal)" />
      <rect x="12" y="54" width="96" height="30" className="f-lo" opacity=".42" />
      <circle cx="60" cy="69" r="26" className="f-lo" />
      <circle cx="60" cy="69" r="21" fill="url(#sp-sphere)" />
      <circle cx="60" cy="69" r="12" className="f-lo" />
      <circle cx="60" cy="69" r="6" fill="url(#sp-sphere)" />
      <circle cx="51" cy="60" r="4" className="f-hi" opacity=".85" />
      <circle cx="95" cy="48" r="3" className="f-hi" opacity=".8" />
    </svg>
  );
}

export function Balloon() {
  return (
    <svg {...common}>
      <path
        d="M60 6c38 0 48 38 26 68L71 84H49L34 74C12 44 22 6 60 6z"
        fill="url(#sp-sphere)"
      />
      <g fill="none" className="s-line" strokeWidth="0.9" opacity=".5">
        <path d="M60 6c-10 24-10 52-6 78M60 6c10 24 10 52 6 78" />
        <path d="M60 6C36 22 36 54 44 80M60 6c24 16 24 48 16 74" />
      </g>
      <path d="M31 50c20 8 38 8 58 0l-3 10c-18 8-34 8-52 0z" className="f-lo" opacity=".4" />
      <path d="M50 84l3 17M70 84l-3 17M56 84l1 17M64 84l-1 17" className="s-mid" strokeWidth="1.2" />
      <rect x="49" y="100" width="22" height="13" rx="2.5" fill="url(#sp-metal)" />
      <path d="M49 106h22M55 100v13M65 100v13" className="s-line" strokeWidth=".8" opacity=".5" />
    </svg>
  );
}

export function PocketWatch() {
  const ticks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg {...common}>
      <rect x="53" y="2" width="14" height="12" rx="3" fill="url(#sp-metal)" />
      <circle cx="60" cy="20" r="9" fill="none" stroke="url(#sp-metal)" strokeWidth="4" />
      <circle cx="60" cy="68" r="44" fill="url(#sp-sphere)" />
      <circle cx="60" cy="68" r="36" className="f-hi" opacity=".92" />
      <circle cx="60" cy="68" r="36" fill="none" className="s-mid" strokeWidth="1.5" />
      {ticks.map((i) => (
        <line
          key={i}
          x1="60"
          y1="36"
          x2="60"
          y2={i % 3 === 0 ? 43 : 40}
          className="s-line"
          strokeWidth={i % 3 === 0 ? 2.4 : 1.2}
          transform={`rotate(${i * 30} 60 68)`}
        />
      ))}
      <line x1="60" y1="68" x2="60" y2="50" className="s-line" strokeWidth="3" strokeLinecap="round" transform="rotate(-50 60 68)" />
      <line x1="60" y1="68" x2="60" y2="42" className="s-line" strokeWidth="2" strokeLinecap="round" transform="rotate(70 60 68)" />
      <g className="vt-spin" style={{ "--dur": "60s", transformOrigin: "60px 68px", transformBox: "view-box" }}>
        <line x1="60" y1="74" x2="60" y2="38" className="s-line" strokeWidth="1" />
      </g>
      <circle cx="60" cy="68" r="3.4" className="f-lo" />
    </svg>
  );
}

export function PaperPlane() {
  return (
    <svg {...common}>
      <path d="M4 100c22-4 20-24 44-30" fill="none" className="s-line" strokeWidth="1.4" strokeDasharray="3 5" opacity=".55" />
      <path d="M12 60L110 14 64 74z" className="f-hi" />
      <path d="M110 14L64 74l8 32z" className="f-mid" />
      <path d="M64 74l8 32-24-26z" className="f-lo" />
      <path d="M12 60l52 14" fill="none" className="s-line" strokeWidth=".9" opacity=".5" />
    </svg>
  );
}

function gearPath(cx, cy, rOut, rIn, teeth) {
  const pts = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    [
      [a - step * 0.28, rIn],
      [a - step * 0.16, rOut],
      [a + step * 0.16, rOut],
      [a + step * 0.28, rIn],
    ].forEach(([ang, r]) => pts.push(`${(cx + r * Math.cos(ang)).toFixed(1)} ${(cy + r * Math.sin(ang)).toFixed(1)}`));
  }
  return `M${pts.join("L")}Z`;
}

const GEAR = gearPath(60, 60, 50, 40, 12);

export function Cog() {
  return (
    <svg {...common}>
      <g className="vt-spin" style={{ "--dur": "90s" }}>
        <path d={GEAR} fill="url(#sp-sphere)" />
        <circle cx="60" cy="60" r="26" fill="none" className="s-line" strokeWidth="1.2" opacity=".5" />
        <circle cx="60" cy="60" r="14" className="f-lo" />
        <circle cx="60" cy="60" r="8" fill="url(#sp-metal)" />
      </g>
    </svg>
  );
}

export function MapPin() {
  return (
    <svg {...common}>
      <ellipse cx="60" cy="110" rx="18" ry="4" className="f-lo" opacity=".3" />
      <path d="M60 108S24 70 24 46a36 36 0 0 1 72 0c0 24-36 62-36 62z" fill="url(#sp-sphere)" />
      <circle cx="60" cy="46" r="14" className="f-lo" />
      <circle cx="56" cy="42" r="5" className="f-hi" opacity=".8" />
    </svg>
  );
}
