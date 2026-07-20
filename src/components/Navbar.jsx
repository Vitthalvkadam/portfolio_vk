import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { navLinks, profile } from "../data/portfolioData";
import profileImg from "../assets/profile.jpg";
import ThemeToggle from "./ThemeToggle.jsx";

/**
 * Navbar
 * Sticky + blurred once the page scrolls, active-section underline,
 * and a slide-down mobile menu with smooth-scroll links.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-2 border-cyan-30 transition-all duration-500 ${scrolled ? "glass py-3 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]" : "py-6"
        }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          aria-label={profile.name}
          className="flex items-center gap-2.5"
        >
          <span className="glass flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-accent/30 shadow-[0_0_18px_-6px_var(--color-accent)]">
            <img
              src={profileImg}
              alt={profile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <span
              style={{ display: "none" }}
              className="h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-2 font-display text-sm font-semibold text-accent"
            >
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-text">
            {/* {profile.name.split(" ")[0]} */}
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`font-mono text-sm transition-colors duration-300 ${active === link.href ? "text-accent" : "text-muted hover:text-text"
                  }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-accent to-accent-2"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:flex" />

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#contact");
            }}
            className="btn-ghost hidden md:inline-flex"
          >
            Let's talk
          </a>

          <ThemeToggle className="flex h-9 w-9 md:hidden" />

          {/* mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="glass rounded-full p-2 text-text md:hidden"
          >
            {menuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    className={`block rounded-lg px-3 py-2.5 font-mono text-sm ${active === link.href
                        ? "bg-surface-2 text-accent"
                        : "text-muted hover:bg-surface-2 hover:text-text"
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
