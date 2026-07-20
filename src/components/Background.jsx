import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Background
 * Fixed ambient layer shared by the whole page:
 *  - faint circuit-style grid (nods to backend/systems work)
 *  - two slow-drifting gradient blobs
 *  - a soft glow that follows the cursor (desktop only)
 *  - a sparse field of floating particles
 * Purely decorative — sits behind all content via -z-10.
 */
const PARTICLE_COUNT = 22;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 12 + 12,
  delay: Math.random() * 10,
}));

export default function Background() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* circuit grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* gradient blobs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 25%, transparent), transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[30%] h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent-2) 18%, transparent), transparent 70%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* cursor glow (desktop) */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 hidden h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[100px] transition-transform duration-300 ease-out lg:block"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />

      {/* floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent/40"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -20 }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
