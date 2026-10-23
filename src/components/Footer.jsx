import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/portfolioData";
import Skyline from "./vintage/Skyline";
import { Balloon } from "./vintage/Objects";

/**
 * Footer — "golden hour on the way home"
 * The page ends on a sunset version of the hero skyline:
 *  - the sky deepens from cream to night as you scroll into it, and the sun
 *    sinks behind the buildings (scroll-linked, transform/opacity only)
 *  - windows flicker on at random, fireflies drift, a little Street View
 *    pegman strolls along the street
 *  - the name wordmark rises letter by letter and each letter hops on hover
 *  - "Back to top" is a hot-air balloon that lifts off while the page scrolls up
 * Reduced-motion users get the same scene, still.
 */

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${42 + ((i * 53) % 40)}%`,
  dur: `${9 + ((i * 7) % 8)}s`,
  delay: `${-((i * 5) % 11)}s`,
  dx: `${((i * 29) % 70) - 35}px`,
  dy: `${-30 - ((i * 17) % 50)}px`,
}));

const letter = {
  hidden: { y: "70%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 130, damping: 15 } },
};

function Letters({ text, className, offset = 0 }) {
  return [...text].map((ch, i) => (
    <motion.span
      key={i}
      aria-hidden="true"
      variants={letter}
      whileHover={{
        y: -14,
        rotate: (i + offset) % 2 ? 6 : -6,
        transition: { type: "spring", stiffness: 320, damping: 11 },
      }}
      className={`inline-block cursor-default ${className}`}
    >
      {ch}
    </motion.span>
  ));
}

export default function Footer() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [lift, setLift] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const sunY = useTransform(scrollYProgress, [0, 1], ["-15%", "48%"]);
  const dusk = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (reduce) return;
    setLift(true);
    setTimeout(() => setLift(false), 1500);
  };

  const [firstName, ...rest] = profile.name.trim().split(" ");
  const lastName = rest.join(" ");

  return (
    <footer ref={ref} className="relative overflow-hidden">
      <div className="ft-sky sk-night relative">
        {/* night falls as you arrive */}
        <motion.div
          aria-hidden="true"
          style={reduce ? { opacity: 0.25 } : { opacity: dusk }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f08]/40 to-[#1a0f08]"
        />
        {/* sun */}
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { y: sunY }}
          className="ft-sun pointer-events-none absolute bottom-[clamp(3rem,9vw,8rem)] left-1/2 h-[clamp(12rem,28vw,26rem)] w-[clamp(12rem,28vw,26rem)] -translate-x-1/2 md:left-[72%]"
        />
        {/* fireflies */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {FIREFLIES.map((f, i) => (
            <span
              key={i}
              className="ft-firefly"
              style={{ left: f.left, top: f.top, "--dur": f.dur, "--delay": f.delay, "--dx": f.dx, "--dy": f.dy }}
            />
          ))}
        </div>

        {/* skyline, street and strolling pegman */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(8rem,19vw,17rem)]"
        >
          <Skyline layer="back" />
          <Skyline layer="front" walker />
        </div>

        <motion.button
          type="button"
          onClick={scrollToTop}
          whileHover={reduce ? undefined : { y: -4 }}
          aria-label="Back to top"
          title="Back to top"
          className="absolute right-5 top-6 z-20 h-14 w-14 rounded-full sm:right-10 lg:right-20"
        >
          <motion.span
            initial={false}
            animate={lift ? { y: -320, opacity: 0, transition: { duration: 1.2, ease: "easeIn" } } : { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
            className="block h-full w-full"
          >
            <span className="vt-float block h-full w-full" style={{ "--dur": "7s", "--ay": "8px", "--ax": "3px", "--rot": "3deg" }}>
              <Balloon />
            </span>
          </motion.span>
        </motion.button>

        <div className="container-px relative z-10 mx-auto flex max-w-7xl flex-col items-center pb-[calc(clamp(8rem,19vw,17rem)+1.5rem)] pt-[clamp(8rem,22vw,15rem)] text-center">
          <span className="eyebrow !text-[#ffe3b8] [text-shadow:0_1px_8px_rgba(26,15,8,0.95),0_0_2px_rgba(26,15,8,0.8)]">
            {profile.role} · {profile.location}
          </span>

          <motion.h2
            aria-label={profile.name}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-6 font-display text-[clamp(2.75rem,10vw,7rem)] leading-[1.05] tracking-tight [text-shadow:0_2px_0_rgba(26,15,8,0.6),0_0_30px_rgba(26,15,8,0.55)]"
          >
            <Letters text={firstName} className="text-[#fff1d6]" />
            <span aria-hidden="true" className="mx-[0.12em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-[#ffc46b] align-middle shadow-[0_0_14px_3px_rgba(255,196,107,0.8)]" />
            <Letters text={lastName} className="text-[#ffc46b]" offset={firstName.length} />
          </motion.h2>
        </div>
      </div>

      {/* street level: the sign-off line */}
      <div className="relative z-10 border-t border-[#2e1b0d] bg-[#1b0e07] px-6 py-5 text-center">
        <p className="font-mono text-xs leading-relaxed text-[#dcc7a4]">
          © {new Date().getFullYear()} {profile.name} · All rights reserved · Solving problems,
          shipping <span className="font-bold text-[#ffc46b]">real products</span>
        </p>
      </div>
    </footer>
  );
}
