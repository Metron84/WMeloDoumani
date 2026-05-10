import type { Metadata } from "next";
import WritingIndexClient from "@/components/writing/WritingIndexClient";

export const metadata: Metadata = {
  title: "Writing | Melo Doumani",
  description: "Essays and dispatches — The Reflective.",
};

export default function WritingPage() {
  return <WritingIndexClient />;
}
