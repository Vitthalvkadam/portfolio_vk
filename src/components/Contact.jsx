import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePaperAirplane } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, socials } from "../data/portfolioData";

// 1. Sign up free at https://formspree.io using vitthalvkadam@gmail.com
// 2. Create a form, verify the email link Formspree sends you
// 3. Copy the ID from your endpoint (https://formspree.io/f/THIS_PART)
//    and paste it below.
const FORM_ENDPOINT = "https://formspree.io/f/xykrjowj";

const infoCards = [
  { icon: HiOutlineMail, label: "Email", value: profile.email, href: socials.email },
  { icon: FaGithub, label: "GitHub", value: "@Vitthalvkadam", href: socials.github },
  { icon: FaLinkedin, label: "LinkedIn", value: "/in/Vitthalvkadam", href: socials.linkedin },
  { icon: HiOutlineLocationMarker, label: "Location", value: profile.location, href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="container-px mx-auto max-w-7xl py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Contact</span>
        <h2 className="section-heading mt-3">
          Let's build something <span className="gradient-text">together</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          Open to full-stack roles and collaborations. Reach out and I'll get back to you soon.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* info cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1"
        >
          {infoCards.map((card) => {
            const Icon = card.icon;
            const content = (
              <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-accent/40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xl text-accent">
                  <Icon />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                    {card.label}
                  </p>
                  <p className="text-sm text-text">{card.value}</p>
                </div>
              </div>
            );
            return card.href ? (
              <a key={card.label} href={card.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={card.label}>{content}</div>
            );
          })}
        </motion.div>

        {/* form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-7 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-muted">
                Name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-muted">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-muted">
                Message
              </label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project or role..."
                className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary mt-6 w-full justify-center disabled:opacity-70"
          >
            {status === "idle" && (
              <>
                <HiOutlinePaperAirplane className="-rotate-45" />
                Send Message
              </>
            )}
            {status === "sending" && "Sending..."}
            {status === "sent" && "Message sent ✓"}
            {status === "error" && "Couldn't send — try again"}
          </button>

          {status === "error" && (
            <p className="mt-3 text-center text-xs text-muted">
              Something went wrong. You can also email me directly at{" "}
              <a href={socials.email} className="text-accent underline">
                {profile.email}
              </a>
              .
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}