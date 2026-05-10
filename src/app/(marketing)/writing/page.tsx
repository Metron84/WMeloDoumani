import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | Melo Doumani",
  description: "Essays and dispatches — The Reflective.",
};

export default function WritingPage() {
  return (
    <article className="writing-page">
      <h1 className="writing-page__title">Writing</h1>
      <p className="writing-page__lead">
        The Reflective archive will migrate here from the legacy static site as
        individual routes under <code>/writing/[slug]</code>.
      </p>
      <p className="writing-page__muted">
        Placeholder page — no articles migrated yet in this construction phase.
      </p>
    </article>
  );
}
