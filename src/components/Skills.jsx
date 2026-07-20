import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  SiSpringboot,
  SiSpring,
  SiSpringsecurity,
  SiHibernate,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { HiOutlineCircleStack } from "react-icons/hi2";
import { TbApi } from "react-icons/tb";
import { skillCategories } from "../data/portfolioData";

const ICONS = {
  java: FaJava,
  springboot: SiSpringboot,
  spring: SiSpring,
  springsecurity: SiSpringsecurity,
  hibernate: SiHibernate,
  jpa: HiOutlineCircleStack,
  react: SiReact,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  restapi: TbApi,
};

const allSkills = skillCategories.flatMap((c) => c.skills);
const filters = ["All", ...skillCategories.map((c) => c.category)];

/** Radial progress ring — animates its stroke on mount. */
function RingProgress({ level }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="var(--color-surface-2)"
        strokeWidth="5"
      />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="url(#skillRingGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference * (1 - level / 100) }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="skillRingGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A single skill card with a subtle 3D tilt that follows the cursor. */
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const Icon = ICONS[skill.icon];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-shadow duration-300 hover:shadow-[0_0_45px_-15px_var(--color-accent)]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative shrink-0" style={{ transform: "translateZ(30px)" }}>
          <RingProgress level={skill.level} />
          <span className="absolute inset-0 flex items-center justify-center text-2xl text-accent">
            {Icon ? <Icon /> : null}
          </span>
        </div>
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="font-display text-base font-semibold text-text">{skill.name}</p>
          <p className="font-mono text-xs text-muted">{skill.level}% proficiency</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Infinite scrolling strip of every tech logo — pure vibes, no data loss. */
function Marquee() {
  const loop = [...allSkills, ...allSkills];
  return (
    <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((skill, i) => {
          const Icon = ICONS[skill.icon];
          return (
            <span
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-muted"
            >
              <span className="text-lg text-accent">{Icon ? <Icon /> : null}</span>
              {skill.name}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("All");

  const visibleSkills = useMemo(() => {
    if (active === "All") return allSkills;
    return skillCategories.find((c) => c.category === active)?.skills ?? [];
  }, [active]);

  return (
    <section id="skills" className="container-px mx-auto max-w-7xl py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Skills</span>
        <h2 className="section-heading mt-3">
          Tools I reach for <span className="gradient-text">daily</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          A stack built around the Java ecosystem, paired with a modern React front end. Hover the
          cards — they tilt.
        </p>
      </motion.div>

      <Marquee />

      {/* category filter pills */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`relative rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wide transition-colors duration-300 ${
              active === f ? "text-bg" : "text-muted hover:text-text"
            }`}
          >
            {active === f && (
              <motion.span
                layoutId="skills-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSkills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
