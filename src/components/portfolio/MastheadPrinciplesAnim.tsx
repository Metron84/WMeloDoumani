"use client";

import { useEffect, useRef } from "react";

export function MastheadPrinciplesAnim() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const el = document.getElementById("masthead-principles");
    if (!el || document.body.classList.contains("is-reflective")) return;
    const masthead = el;

    const cycleEl = masthead.querySelector(".masthead-principles__cycle");
    const finalEl = masthead.querySelector(".masthead-principles__final");
    const slides = masthead.querySelectorAll(".masthead-principles__slide");
    if (!cycleEl || !finalEl || !slides.length) return;
    const cycle = cycleEl;
    const finalWords = finalEl;

    started.current = true;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const FADE = 550;
    const HOLD = 1000;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    masthead.classList.add("masthead-principles--is-animating");
    finalWords.setAttribute("aria-hidden", "true");

    async function runAt(i: number) {
      if (i >= slides.length) {
        cycle.setAttribute("hidden", "");
        cycle.setAttribute("aria-hidden", "true");
        masthead.classList.remove("masthead-principles--is-animating");
        masthead.classList.add("masthead-principles--done");
        finalWords.removeAttribute("aria-hidden");
        return;
      }
      slides[i].classList.add("is-visible");
      await wait(FADE + 70);
      await wait(HOLD);
      slides[i].classList.remove("is-visible");
      await wait(FADE);
      await runAt(i + 1);
    }

    void runAt(0);
  }, []);

  return null;
}
