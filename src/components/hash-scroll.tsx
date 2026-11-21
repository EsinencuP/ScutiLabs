"use client";

import { useEffect } from "react";

/**
 * Client-side navigation to "/{locale}#faq" from another page lands at the top of the home page.
 * Scroll to the hash target once the page has mounted, and on later in-page hash changes.
 */
export function HashScroll() {
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };
    const timer = window.setTimeout(go, 80);
    window.addEventListener("hashchange", go);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", go);
    };
  }, []);

  return null;
}
