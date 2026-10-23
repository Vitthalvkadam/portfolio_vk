
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowDown, HiOutlineMail } from "react-icons/hi";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { profile, socials } from "../data/portfolioData";
import profileImg from "../assets/profile.jpg";
import { HeroSkyline } from "./vintage/Skyline";

/**
 * Typing Effect
 * Cycles through the roles defined in portfolioData.
 */
function useTypingEffect(words, typingSpeed = 65, pauseTime = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, pauseTime);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting
            ? current.slice(0, t.length - 1)
            : current.slice(0, t.length + 1)
        );
      }, deleting ? typingSpeed / 2 : typingSpeed);
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
      style={{ "--hero-sky": "clamp(7rem, 17vw, 16rem)" }}
      className="container-px relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-14 pt-28 pb-[calc(var(--hero-sky)*0.6+3rem)] lg:flex-row lg:gap-16 lg:pt-24"
    >
      {/* Vintage skyline pinned to the bottom of the hero */}
      <HeroSkyline />

      {/* Image Section */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="relative z-10 order-1 shrink-0 lg:order-1"
      >
        {/* Photo - No Floating Animation */}

        <div className="relative h-64 w-64 sm:h-80 sm:w-80">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 opacity-30 blur-2xl" />

          <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-accent/20">
            <img
              src={profileImg}
              alt={profile.name}
              className="h-full w-full object-cover sepia-[.55] contrast-[1.05] transition duration-700 hover:sepia-0"
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
        </div>
      </motion.div>

      {/* Text Section */}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 order-2 max-w-xl text-center lg:text-left"
      >
        {/* Availability */}

        <span className="eyebrow inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>

          Available for opportunities
        </span>

        {/* Heading */}

        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl">
          Hi, I'm{" "}
          <span className="gradient-text">{profile.name}</span>
        </h1>

        {/* Typing Role */}

        <div className="glass mx-auto mt-6 w-fit rounded-xl px-4 py-3 font-mono text-sm text-muted lg:mx-0 sm:text-base">
          <span className="text-accent-2">🧑‍💻</span>&nbsp; who am i
          <br />

          <span className="text-accent">{typed}</span>

          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
        </div>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-muted lg:mx-0">
          {profile.headline}
        </p>

        {/* Buttons */}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <Link
            to="/projects"
            className="btn-primary"
          >
            View Projects
          </Link>

          <a href={socials.email} className="btn-ghost">
            <HiOutlineMail />
            Contact Me
          </a>
        </div>

        {/* Social Links */}

        <div className="mt-8 flex items-center justify-center gap-5 lg:justify-start">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-muted transition-colors hover:text-accent"
          >
            <FaGithub />
          </a>

          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xl text-muted transition-colors hover:text-accent"
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

      {/* Scroll Button */}

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();

          document.querySelector("#about")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[calc(var(--hero-sky)+0.25rem)] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-accent [@media(min-width:640px)_and_(min-height:960px)]:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Go Down
        </span>

        <HiOutlineArrowDown />
      </motion.a>
    </section>
  );
}
