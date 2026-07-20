import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowDown, HiOutlineMail } from "react-icons/hi";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, socials } from "../data/portfolioData";
import profileImg from "../assets/profile.jpg";

/**
 * Hero
 * The page's thesis: a build-console motif (`$ whoami`) stands in for the
 * usual hero tagline, because this is a backend engineer's world — a
 * terminal that "compiles" his role list is more characteristic than a
 * generic gradient headline.
 */
function useTypingEffect(words, typingSpeed = 65, pauseTime = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pauseTime]);

  return text;
}

export default function Hero() {
  const typed = useTypingEffect(profile.typingRoles);

  return (
    <section
      id="home"
      className="container-px relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-14 pt-28 lg:flex-row lg:gap-10 lg:pt-24"
    >
      {/* text column */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-xl text-center lg:text-left"
      >
        <span className="eyebrow inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl">
          Hi, I'm <span className="gradient-text">{profile.name}</span>
        </h1>

        {/* terminal-style role display — the signature element */}
        <div className="glass mx-auto mt-6 w-fit rounded-xl px-4 py-3 font-mono text-sm text-muted lg:mx-0 sm:text-base">
          <span className="text-accent-2"></span> who am i
          <br />
          <span className="text-accent">{typed}</span>
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
        </div>

        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-muted lg:mx-0">
          {profile.headline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            View Projects
          </a>
          <a href={socials.email} className="btn-ghost">
            <HiOutlineMail />
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5 lg:justify-start">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-muted transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={profile.resumeUrl}
            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            <HiOutlineDocumentArrowDown />
            Resume
          </a>
        </div>
      </motion.div>

      {/* image column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="relative shrink-0"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-64 w-64 sm:h-80 sm:w-80"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 opacity-30 blur-2xl" />
          <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-accent/20">
            <img
              src={profileImg}
              alt={profile.name}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{ display: "none" }}
              className="h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-2 font-display text-6xl font-semibold text-accent"
            >
              VK
            </div>
          </div>

          {/* floating badge */}
          {/* <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -left-6 bottom-4 rounded-xl px-3 py-2 font-mono text-xs text-accent-2 shadow-lg sm:-left-10"
          >
            Vitthal ✓
          </motion.div> */}
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-accent sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <HiOutlineArrowDown />
      </motion.a>
    </section>
  );
}
