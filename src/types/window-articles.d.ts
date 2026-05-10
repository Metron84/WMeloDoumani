import type { ReflectiveArticle } from "@/types/reflective";

declare global {
  interface Window {
    ARTICLES?: ReflectiveArticle[];
  }
}

export {};
