import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { certificates } from "../data/portfolioData";

export default function Certificates() {
  return (
    <section id="certificates" className="container-px mx-auto max-w-7xl py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Certificates</span>
        <h2 className="section-heading mt-3">
          Proof of <span className="gradient-text">practice</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.015 }}
            className="glass relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_22px_44px_-22px_var(--shadow-warm)]"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
            <HiOutlineAcademicCap className="text-3xl text-accent" />
            <h3 className="mt-4 font-display text-base font-semibold text-text">{cert.title}</h3>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            <span className="mt-4 inline-block font-mono text-xs uppercase tracking-wide text-accent-2">
              {cert.date}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
