import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  SiIntellijidea,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";
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

  // Tools
  intellij: SiIntellijidea,
  vscode: FaCode,
  mongodbCompass: SiMongodb,
  pgadmin: SiPostgresql,
};

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0]?.category);

  const skills =
    skillCategories.find((c) => c.category === active)?.skills || [];

  return (
    <section id="skills" className="container-px mx-auto max-w-6xl py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Stack</span>

        <h2 className="section-heading mt-3">
          What I build <span className="gradient-text">with</span>
        </h2>

        <p className="mt-5 text-muted">
          Technologies and tools I use to turn ideas into things that work.
        </p>
      </div>

      {/* Categories */}
      <div className="mt-12 flex justify-center gap-2">
        {skillCategories.map(({ category }) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              active === category
                ? "bg-gradient-to-r from-accent to-accent-2 text-bg"
                : "text-muted hover:text-text"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Logos */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-14 flex min-h-[240px] flex-wrap items-center justify-center gap-6"
        >
          {skills.map((skill, i) => {
            const Icon = ICONS[skill.icon];

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.08 }}
                className="group relative"
              >
                <div
                  className="
                    vt-bob
                    flex h-24 w-24 items-center justify-center
                    rounded-3xl
                    border border-border
                    bg-surface/60
                    shadow-[0_14px_30px_-22px_var(--shadow-warm)]
                    backdrop-blur-xl
                    text-5xl
                    transition-transform duration-300
                  "
                  style={{ "--dur": `${5 + ((i * 7) % 5)}s`, "--delay": `${-((i * 13) % 7)}s` }}
                >
                  {Icon && <Icon />}
                </div>

                {/* Name appears only on hover */}
                <span
                  className="
                    pointer-events-none absolute left-1/2 top-full z-20
                    mt-3 -translate-x-1/2
                    whitespace-nowrap
                    rounded-md bg-bg/95 px-3 py-1.5
                    font-mono text-[11px] text-text
                    opacity-0 shadow-lg
                    transition-opacity duration-200
                    group-hover:opacity-100
                  "
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
