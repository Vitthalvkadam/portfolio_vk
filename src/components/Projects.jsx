import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolioData";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      style={{ perspective: 1200 }}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_0_50px_-15px_rgba(56,189,248,0.4)]"
      >
        {/* preview panel — code-window motif since no live screenshot is provided */}
        <div className="relative mb-6 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2">
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>
          <span className="font-display text-2xl font-semibold text-muted/40 transition-colors duration-300 group-hover:text-accent/40">
            {project.title}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-text">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-accent-2"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-sm text-text transition-colors hover:text-accent"
          >
            <HiOutlineArrowTopRightOnSquare />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <FaGithub />
            Source
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="container-px mx-auto max-w-7xl py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Projects</span>
        <h2 className="section-heading mt-3">
          Things I've <span className="gradient-text">built</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          A selection of full-stack projects spanning booking systems, admin dashboards, and data
          tools.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
