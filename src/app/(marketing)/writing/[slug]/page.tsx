import type { Metadata } from "next";
import WritingArticleClient from "@/components/writing/WritingArticleClient";
import { REFLECTIVE_SLUGS } from "@/data/reflective-slugs";

export function generateStaticParams() {
  return REFLECTIVE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title,
    description: "The Reflective — football dispatch.",
  };
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <WritingArticleClient slug={slug} />;
}
