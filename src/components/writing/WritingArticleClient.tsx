"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useReflectiveArticles } from "@/hooks/useReflectiveArticles";

export default function WritingArticleClient({ slug }: { slug: string }) {
  const { articles, loading, error } = useReflectiveArticles();
  const article = useMemo(
    () => articles?.find((a) => a.slug === slug),
    [articles, slug],
  );

  if (loading) {
    return <p className="reflective-loading">Loading article…</p>;
  }
  if (error) {
    return (
      <p className="reflective-loading">
        Could not load this article. Please refresh the page.
      </p>
    );
  }
  if (!article) {
    return (
      <div className="reflective-article-route">
        <p className="reflective-loading">Article not found.</p>
        <p>
          <Link href="/writing">← Back to The Reflective</Link>
        </p>
      </div>
    );
  }

  return (
    <article className="reflective-article-route">
      <nav className="reflective-article-route__nav" aria-label="Article">
        <Link href="/writing">← The Reflective</Link>
      </nav>
      <div
        className="reflective-article-route__body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
