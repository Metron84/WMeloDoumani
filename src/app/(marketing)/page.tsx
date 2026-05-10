import Link from "next/link";

export default function HubPage() {
  return (
    <div className="hub">
      <section className="hub__hero">
        <p className="hub__eyebrow">Fantasy football · Built here</p>
        <h1 className="hub__title">Ultimate Fantasy Manager</h1>
        <p className="hub__lead">
          Strategy, leagues, and competition — hosted as part of this site.
          Writing and reflections live alongside the game.
        </p>
        <div className="hub__cta-row">
          <Link href="/play" className="hub__cta hub__cta--primary">
            Play UFM
          </Link>
          <Link href="/writing" className="hub__cta hub__cta--secondary">
            Read Writing
          </Link>
        </div>
      </section>

      <section className="hub__panels" aria-label="Choose your path">
        <article className="hub-panel hub-panel--play">
          <h2 className="hub-panel__title">Play</h2>
          <p className="hub-panel__body">
            Create or join a league, draft your roster, and compete through the
            season.
          </p>
          <Link href="/play" className="hub-panel__link">
            Enter Ultimate Fantasy Manager →
          </Link>
        </article>

        <article className="hub-panel hub-panel--writing">
          <h2 className="hub-panel__title">Writing</h2>
          <p className="hub-panel__body">
            Long-form essays and dispatches — The Reflective — moving here from the
            legacy site.
          </p>
          <Link href="/writing" className="hub-panel__link">
            Browse Writing →
          </Link>
        </article>
      </section>

      <section className="hub__builder">
        <p className="hub__builder-text">
          <strong>W. Melo Doumani</strong> — writer, thinker, builder. Founder at{" "}
          <a href="https://metronventures.com" target="_blank" rel="noopener noreferrer">
            Metron Ventures
          </a>
          .{" "}
          <Link href="/about" className="hub__builder-link">
            More (muted)
          </Link>
        </p>
      </section>
    </div>
  );
}
