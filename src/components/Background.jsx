import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Balloon,
  Camera,
  CoffeeCup,
  Cog,
  Globe,
  MapPin,
  PaperPlane,
  PocketWatch,
  SepiaDefs,
} from "./vintage/Objects";

/**
 * Background
 * A fixed, cream-and-sepia "old photograph" layer shared by every page:
 * paper glow + film grain + vignette, with a handful of vintage 3D objects
 * that float on their own and drift with scroll and pointer movement.
 *
 * Performance notes: everything animates via transform/opacity only, the
 * objects sit on the edges (away from text), and only 4 of the 8 render on
 * small screens. Reduced-motion users get a static scene.
 *
 * Each object has: a position, a size, a scroll "drift" (vh moved over the
 * whole page, so it always stays on screen), a pointer depth, and its own
 * float period/phase so nothing moves in unison.
 */
const OBJECTS = [
  { id: "globe", Art: Globe, at: { left: "3%", top: "16%" }, size: "clamp(64px, 9vw, 138px)", drift: [10, -16], spin: [-8, 10], pointer: 14, float: { dur: 11, delay: -3, ax: 8, ay: 14, rot: 3 }, opacity: 0.55 },
  { id: "balloon", Art: Balloon, at: { right: "5%", top: "10%" }, size: "clamp(58px, 8vw, 124px)", drift: [4, -30], spin: [6, -8], pointer: 22, float: { dur: 14, delay: -6, ax: 12, ay: 22, rot: 2 }, opacity: 0.5 },
  { id: "cup", Art: CoffeeCup, at: { right: "3%", top: "58%" }, size: "clamp(54px, 7vw, 108px)", drift: [-12, 14], spin: [-6, 8], pointer: 10, float: { dur: 9, delay: -1, ax: 5, ay: 10, rot: 2 }, opacity: 0.5 },
  { id: "pin", Art: MapPin, at: { left: "7%", top: "74%" }, size: "clamp(40px, 5vw, 78px)", drift: [-8, -22], spin: [0, 0], pointer: 18, float: { dur: 7, delay: -2, ax: 3, ay: 16, rot: 4 }, opacity: 0.55 },
  { id: "plane", Art: PaperPlane, at: { right: "14%", top: "36%" }, size: "clamp(46px, 6vw, 96px)", drift: [18, -34], spin: [-6, 12], pointer: 26, float: { dur: 13, delay: -8, ax: 20, ay: 10, rot: 6 }, opacity: 0.45, wide: true },
  // the objects below are hidden on narrow screens (they would sit on the text)
  { id: "camera", Art: Camera, at: { left: "12%", top: "44%" }, size: "clamp(60px, 7vw, 112px)", drift: [6, 18], spin: [-10, 6], pointer: 12, float: { dur: 12, delay: -5, ax: 6, ay: 12, rot: 3 }, opacity: 0.42, wide: true },
  { id: "watch", Art: PocketWatch, at: { right: "11%", top: "78%" }, size: "clamp(52px, 6vw, 96px)", drift: [-4, -18], spin: [10, -6], pointer: 16, float: { dur: 10, delay: -4, ax: 5, ay: 11, rot: 4 }, opacity: 0.42, wide: true },
  { id: "cog", Art: Cog, at: { left: "1%", top: "92%" }, size: "clamp(70px, 9vw, 140px)", drift: [-14, -6], spin: [0, 0], pointer: 8, float: { dur: 15, delay: -9, ax: 4, ay: 6, rot: 1 }, opacity: 0.35, wide: true },
];

function Floater({ item, scrollYProgress, px, py, still }) {
  const { Art, at, size, drift, spin, pointer, float, opacity, wide } = item;

  const y = useTransform(scrollYProgress, [0, 1], [`${drift[0]}vh`, `${drift[1]}vh`]);
  const rotate = useTransform(scrollYProgress, [0, 1], [spin[0], spin[1]]);
  const mx = useTransform(px, (v) => v * pointer);
  const my = useTransform(py, (v) => v * pointer);

  const floatVars = {
    "--dur": `${float.dur}s`,
    "--delay": `${float.delay}s`,
    "--ax": `${float.ax}px`,
    "--ay": `${float.ay}px`,
    "--rot": `${float.rot}deg`,
  };

  return (
    <motion.div
      style={{ ...at, width: size, height: size, opacity, ...(still ? {} : { y, rotate }) }}
      className={`absolute ${wide ? "hidden md:block" : ""}`}
    >
      <motion.div style={still ? undefined : { x: mx, y: my }} className="h-full w-full">
        <div className={still ? "h-full w-full" : "vt-float h-full w-full"} style={floatVars}>
          <Art />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Background() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Pointer parallax (-0.5 … 0.5), smoothed with a spring.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return undefined;
    const onMove = (e) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <SepiaDefs />
      <div className="vt-glow absolute inset-0" />
      {OBJECTS.map((item) => (
        <Floater
          key={item.id}
          item={item}
          scrollYProgress={scrollYProgress}
          px={px}
          py={py}
          still={reduce}
        />
      ))}
      <div className="vt-grain" />
      <div className="vt-vignette absolute inset-0" />
    </div>
  );
}
