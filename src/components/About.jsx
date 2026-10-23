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

      
 
    </section>
  );
}
