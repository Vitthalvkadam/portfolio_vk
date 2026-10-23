import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { blogPosts } from "../data/portfolioData";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <section className="container-px mx-auto max-w-5xl py-32">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <HiOutlineArrowLeft />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Blog</span>
        <h2 className="section-heading mt-3">
          Notes & <span className="gradient-text">write-ups</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          Thoughts on Java, Spring Boot, React, and whatever I'm learning along the way.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${post.id}`}
              className="glass group flex flex-col gap-3 rounded-2xl p-7 transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_var(--shadow-warm)]"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-text transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="leading-relaxed text-muted">{post.excerpt}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-accent-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 font-mono text-sm text-accent">
                  Read
                  <HiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
