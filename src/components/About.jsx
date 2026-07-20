import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { profile, stats, timeline } from "../data/portfolioData";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1.6, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-text sm:text-5xl">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="container-px mx-auto max-w-7xl py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">About</span>
        <h2 className="section-heading mt-3">
          The engineer behind the <span className="gradient-text">code</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">{profile.about}</p>
      </motion.div>

      {/* stats */}
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl px-4 py-6 text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* timeline */}
      <div className="mx-auto mt-24 max-w-2xl">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-mono text-sm uppercase tracking-[0.25em] text-muted"
        >
          Learning Path
        </motion.h3>

        <ol className="relative border-l border-border pl-8">
          {timeline.map((item, i) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="mb-10 last:mb-0"
            >
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(56,189,248,0.6)]" />
              <span className="font-mono text-xs uppercase tracking-wide text-accent-2">
                {item.year}
              </span>
              <h4 className="mt-1 font-display text-lg font-medium text-text">{item.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
