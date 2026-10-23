import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollManager
 * On every route change: scroll to the top of the new page, unless the
 * URL carries a #hash (e.g. "/#about"), in which case smooth-scroll to
 * that section once it's mounted.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a tick for the target page to render before scrolling
      const id = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}
