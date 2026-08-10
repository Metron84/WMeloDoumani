"use client";

import { useEffect, useRef, useState } from "react";

/** Replays when a section enters/exits the viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    let debounceId: number | null = null;
    let pending: boolean | null = null;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        pending = entry.isIntersecting;
        if (debounceId !== null) window.clearTimeout(debounceId);
        debounceId = window.setTimeout(() => {
          if (pending !== null) setVisible(pending);
          debounceId = null;
        }, 150);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (debounceId !== null) window.clearTimeout(debounceId);
    };
  }, []);

  // Layout stays CSS-only; this only keeps aria-hidden on the hidden branch.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mobile = root.querySelector(".layoutMobile");
    const desktop = root.querySelector(".layoutDesktop");
    if (!mobile || !desktop) return;

    const mq = window.matchMedia("(min-width: 48rem)");
    const sync = () => {
      mobile.setAttribute("aria-hidden", mq.matches ? "true" : "false");
      desktop.setAttribute("aria-hidden", mq.matches ? "false" : "true");
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { ref, visible };
}
