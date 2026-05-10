"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { useReflectiveArticles } from "@/hooks/useReflectiveArticles";
import type { ReflectiveArticle } from "@/types/reflective";

const CATEGORY_LABELS: Record<string, string> = {
  feature: "Feature",
  opinion: "Opinion",
  profile: "Profile",
  "the-game": "The Game",
};

type SectionKey = "all" | "feature" | "opinion" | "profile" | "the-game";

function variantForIndex(i: number): "lead" | "feature" | "brief" {
  if (i === 0) return "lead";
  if (i >= 1 && i <= 3) return "feature";
  return "brief";
}

function ReflectiveCard({
  article,
  variant,
  visible,
}: {
  article: ReflectiveArticle;
  variant: "lead" | "feature" | "brief";
  visible: boolean;
}) {
  const kicker =
    (article.category && CATEGORY_LABELS[article.category]) || "Dispatch";

  return (
    <article
      className={`reflective-card r-card r-card--${variant}`}
      data-slug={article.slug}
      data-category={article.category ?? ""}
      role="listitem"
      hidden={!visible || undefined}
    >
      <Link
        href={`/writing/${article.slug}`}
        className="r-card__link"
        aria-label={`Open article: ${article.title}`}
      >
        <div
          className="r-card__cover"
          style={{ backgroundImage: `url(${article.cover})` }}
        >
          <span className="r-card__cover-fallback">{article.title}</span>
        </div>
        <div className="r-card__body">
          <span className="r-card__kicker">{kicker.toUpperCase()}</span>
          <h3 className="r-card__title reflective-card__title">{article.title}</h3>
          <p className="r-card__summary reflective-card__summary">{article.summary}</p>
          {variant === "lead" ? (
            <span className="r-card__readtime" aria-hidden="true">
              ⟿ {article.readTime ?? "8 min read"}
            </span>
          ) : null}
          <span className="r-card__readmore" aria-hidden="true">
            Read →
          </span>
        </div>
      </Link>
    </article>
  );
}

function SectionDivider({ label, visible }: { label: string; visible: boolean }) {
  return (
    <hr className="r-divider" data-label={label} hidden={!visible || undefined} />
  );
}

export default function WritingIndexClient() {
  const { articles, error, loading } = useReflectiveArticles();
  const [section, setSection] = useState<SectionKey>("all");

  const gridItems = useMemo(() => {
    if (!articles?.length) return [];
    return articles.flatMap((article, i) => {
      const visible = section === "all" || article.category === section;
      const pieces: ReactNode[] = [];
      if (section === "all" && i === 4) {
        pieces.push(
          <SectionDivider
            key="div-opinion"
            label="Opinion"
            visible={articles.slice(4).some((a) => a.category !== "feature")}
          />,
        );
      }
      if (section === "all" && i === 8) {
        pieces.push(
          <SectionDivider
            key="div-profiles"
            label="Profiles & The Game"
            visible={articles.length > 8}
          />,
        );
      }
      pieces.push(
        <ReflectiveCard
          key={article.slug}
          article={article}
          variant={variantForIndex(i)}
          visible={visible}
        />,
      );
      return pieces;
    });
  }, [articles, section]);

  return (
    <>
      <section className="reflective-chrome" aria-labelledby="reflective-title">
        <div className="r-masthead">
          <div className="r-flagstrip" role="presentation">
            <span className="r-flagstrip__left">Edited by W. Melo Doumani · 2026</span>
            <span className="r-flagstrip__center">The half-decent football dispatch</span>
            <div className="r-flagstrip__end">
              <Link href="/play" className="r-flagstrip__ufm" aria-label="Open Ultimate Fantasy Manager">
                UFM (Football Fantasy Game)
              </Link>
              <Link href="/" className="r-flagstrip__return" aria-label="Return to portfolio home">
                ← W. Melo Doumani · Portfolio
              </Link>
            </div>
          </div>
          <div className="r-masthead__rule r-masthead__rule--top" aria-hidden="true" />
          <h2 id="reflective-title" className="r-masthead__wordmark">
            The Reflective
          </h2>
          <p className="r-masthead__deck">
            A football newspaper for people who still think about the game.
          </p>
          <nav className="r-masthead__sections" aria-label="Sections">
            {(
              [
                ["all", "All"],
                ["feature", "Features"],
                ["opinion", "Opinion"],
                ["profile", "Profiles"],
                ["the-game", "The Game"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                data-section={key}
                className={section === key ? "is-active" : undefined}
                aria-current={section === key ? "true" : undefined}
                onClick={() => setSection(key)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="r-masthead__rule r-masthead__rule--bottom" aria-hidden="true" />
        </div>
      </section>

      <div className="reflective-grid-wrap">
        {loading ? (
          <p className="reflective-loading">Loading articles…</p>
        ) : error ? (
          <p className="reflective-loading">
            Could not load articles. Please refresh the page.
          </p>
        ) : (
          <div className="reflective-grid" role="list">
            {gridItems}
          </div>
        )}
      </div>

      <footer className="r-colophon" aria-labelledby="r-colophon-title">
        <div className="r-colophon__rule" aria-hidden="true" />
        <div className="r-colophon__grid">
          <section className="r-colophon__masthead">
            <h3 id="r-colophon-title" className="r-colophon__h">
              The Reflective
            </h3>
            <p className="r-colophon__body">
              Edited by W. Melo Doumani. Dubai · Beirut · Brighton.
              <br />
              Published when it is worth reading.
            </p>
          </section>
          <section className="r-colophon__letters">
            <h3 className="r-colophon__h">Letters to the editor</h3>
            <p className="r-colophon__body">
              Write the paper back. Real replies. No moderation theatre.
              <br />
              <a href="mailto:doumani@metronventures.com?subject=Letter%20to%20The%20Reflective">
                doumani@metronventures.com
              </a>
            </p>
          </section>
          <section className="r-colophon__sources">
            <h3 className="r-colophon__h">Sources &amp; methodology</h3>
            <p className="r-colophon__body">
              Data and research compiled by Metron Ventures. No personal attachment or favourite
              player. The Catalyst Metric reflects six pillars: tactical importance, leadership,
              consistency, impact on results, ability to elevate teammates, and measurable absence.
            </p>
          </section>
          <section className="r-colophon__type">
            <h3 className="r-colophon__h">Colophon</h3>
            <p className="r-colophon__body">
              Headlines in Zilla Slab; body and subheads in PT Serif; labels in Oswald; notes in
              Special Elite.
              <br />
              Printed nowhere. Published here.
              <br />
              Issue 02 lands when it&apos;s worth reading.
            </p>
          </section>
        </div>
        <div className="r-colophon__rule" aria-hidden="true" />
        <p className="r-colophon__legal">
          © 2026 W. Melo Doumani · The Reflective is a publication of Metron Ventures.
        </p>
      </footer>
    </>
  );
}
