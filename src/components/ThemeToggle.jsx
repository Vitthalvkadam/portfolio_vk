import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`glass relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-text transition-colors duration-300 hover:border-accent/50 hover:text-accent ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center text-lg"
        >
          {isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
