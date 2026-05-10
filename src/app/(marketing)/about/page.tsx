import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Melo Doumani",
  description: "Writer, thinker, builder.",
};

export default function AboutPage() {
  return (
    <article className="about-page">
      <h1 className="about-page__title">About</h1>
      <p className="about-page__body">
        This section stays intentionally quiet: credentials, books, and biography
        will expand here. For now, the focus on the hub is{" "}
        <strong>Ultimate Fantasy Manager</strong> and{" "}
        <strong>Writing</strong>.
      </p>
    </article>
  );
}
