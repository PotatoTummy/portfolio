import type { Metadata } from "next";
import { ArchivePage } from "@/components/ArchivePage";

export const metadata: Metadata = {
  title: "Cutting Room Floor — Samad Kausar",
  description: "Five design drafts that didn't ship. Each one is a live scaled-down preview with notes on what it tried and why it lost.",
  robots: "noindex",
};

export default function Archive() {
  return <ArchivePage />;
}
