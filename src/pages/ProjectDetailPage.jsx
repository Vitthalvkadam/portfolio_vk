import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolioData";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="container-px mx-auto max-w-3xl py-40 text-center">
        <h1 className="section-heading">Project not found</h1>
        <p className="mt-4 text-muted">This project doesn't exist or may have been moved.</p>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:text-accent-2"
        >
          <HiOutlineArrowLeft />
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <section className="container-px mx-auto max-w-4xl py-32">
      <Link
        to="/projects"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <HiOutlineArrowLeft />
        Back to projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">Case Study</span>
        <h1 className="section-heading mt-3">{project.title}</h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-accent-2"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="glass mt-8 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2">
          <span className="font-display text-3xl font-semibold text-muted/40">{project.title}</span>
        </div>

        <p className="mt-8 max-w-2xl leading-relaxed text-muted">{project.description}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <HiOutlineArrowTopRightOnSquare />
            Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            <FaGithub />
            View Source
          </a>
        </div>
      </motion.div>
    </section>
  );
}
