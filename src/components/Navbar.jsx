import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks, profile } from "../data/portfolioData";
import profileImg from "../assets/profile.jpg";
import ThemeToggle from "./ThemeToggle.jsx";

/**
 * Navbar
 * Elegant serif typography with responsive navigation,
 * scroll effects, active links, and mobile menu animation.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#about");

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;

    const sectionLinks = navLinks.filter(
      (link) => link.type === "section"
    );

    const sections = sectionLinks
      .map((link) => document.querySelector(link.href.replace("/", "")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  const handleSectionClick = (href) => {
    setMenuOpen(false);

    const hash = href.replace("/", "");

    if (isHome) {
      document.querySelector(hash)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate(href);
    }
  };

  const isLinkActive = (link) => {
    if (link.type === "section") {
      return isHome && active === link.href.replace("/", "");
    }

    return (
      location.pathname === link.href ||
      location.pathname.startsWith(`${link.href}/`)
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-2 border-cyan-30 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
          : "py-6"
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo and name */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
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
                .map((name) => name[0])
                .join("")}
            </span>
          </span>

          <span className="font-display text-xl font-semibold tracking-tight text-text">
            {profile.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const activeLink = isLinkActive(link);

            const linkClass = `font-display text-lg font-semibold transition-colors duration-300 ${
              activeLink
                ? "text-accent"
                : "text-muted hover:text-text"
            }`;

            return (
              <li key={link.href} className="relative">
                {link.type === "section" ? (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.label}

                    {activeLink && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-accent to-accent-2"
                      />
                    )}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={linkClass}
                  >
                    {link.label}

                    {activeLink && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-accent to-accent-2"
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:flex" />

          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick("/#contact");
            }}
            className="btn-ghost hidden md:inline-flex font-display text-lg"
          >
            Let's talk
          </a>

          <ThemeToggle className="flex h-9 w-9 md:hidden" />

          {/* Mobile menu toggle */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="glass rounded-full p-2 text-text md:hidden"
          >
            {menuOpen ? (
              <HiOutlineX size={22} />
            ) : (
              <HiOutlineMenu size={22} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
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
              {navLinks.map((link) => {
                const activeLink = isLinkActive(link);

                const linkClass = `block rounded-lg px-3 py-2.5 font-display text-lg font-semibold ${
                  activeLink
                    ? "bg-surface-2 text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-text"
                }`;

                return (
                  <li key={link.href}>
                    {link.type === "section" ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSectionClick(link.href);
                        }}
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}