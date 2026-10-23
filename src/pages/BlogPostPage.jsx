import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { blogPosts } from "../data/portfolioData";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="container-px mx-auto max-w-3xl py-40 text-center">
        <h1 className="section-heading">Post not found</h1>
        <p className="mt-4 text-muted">This post doesn't exist or may have been moved.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:text-accent-2"
        >
          <HiOutlineArrowLeft />
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section className="container-px mx-auto max-w-3xl py-32">
      <Link
        to="/blog"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <HiOutlineArrowLeft />
        Back to blog
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="section-heading mt-3">{post.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-accent-2"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-2xl leading-relaxed text-muted">{post.content}</p>
      </motion.article>
    </section>
  );
}
