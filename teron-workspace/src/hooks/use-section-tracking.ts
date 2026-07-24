import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires a `section_view` event the first time each referenced element
 * becomes 40%+ visible in the viewport. Used to measure funnel depth
 * on the landing page.
 */
export function useSectionTracking(ids: string[]) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            track("section_view", { section: entry.target.id });
          }
        }
      },
      { threshold: 0.4 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
}