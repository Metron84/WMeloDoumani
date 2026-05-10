export type ReflectiveArticle = {
  id: number;
  category: string;
  slug: string;
  title: string;
  summary?: string;
  cover: string;
  content: string;
  readTime?: string;
  topics?: string[];
  relatedSlugs?: string[];
};
