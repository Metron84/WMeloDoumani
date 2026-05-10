"use client";

import { useEffect, useState } from "react";
import type { ReflectiveArticle } from "@/types/reflective";

/**
 * Loads `public/reflective/articles.js` once; mirrors the legacy static site’s
 * `window.ARTICLES` contract.
 */
export function useReflectiveArticles() {
  const [articles, setArticles] = useState<ReflectiveArticle[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finish = () => {
      queueMicrotask(() => setArticles(window.ARTICLES ?? []));
    };

    if (window.ARTICLES) {
      finish();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-reflective-articles='1']",
    );
    if (existing) {
      const onLoad = () => finish();
      if (window.ARTICLES) {
        finish();
        return;
      }
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }
    const s = document.createElement("script");
    s.src = "/reflective/articles.js";
    s.async = true;
    s.dataset.reflectiveArticles = "1";
    s.onload = () => finish();
    s.onerror = () => queueMicrotask(() => setError(true));
    document.head.appendChild(s);
  }, []);

  const loading = articles === null && !error;
  return { articles, error, loading };
}
