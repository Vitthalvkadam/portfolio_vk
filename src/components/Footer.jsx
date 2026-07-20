import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineArrowUp } from "react-icons/hi";
import { profile, socials } from "../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="container-px relative mx-auto max-w-7xl border-t border-border py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}.    
         
        </p >
        <p className="font-mono text-xs text-muted">
            All rights reserved

        </p>

        {/* <div className="flex items-center gap-5">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-lg text-muted transition-colors hover:text-accent"
          >
            <FaGithub />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-lg text-muted transition-colors hover:text-accent"
          >
            <FaLinkedin />
          </a>
          <a
            href={socials.email}
            aria-label="Email"
            className="text-lg text-muted transition-colors hover:text-accent"
          >
            <HiOutlineMail />
          </a>
        </div> */}

        

        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          aria-label="Back to top"
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-accent"
        >
          <HiOutlineArrowUp />
        </motion.button>
      </div>
    </footer>
  );
}
