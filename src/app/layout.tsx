import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samad Kausar — Full Stack Developer (Frontend Heavy)",
  description:
    "Portfolio of Samad Kausar. Architecting high-scale React enterprise portals, mobile video and gaming engines, and distributed NestJS microservices.",
  keywords: [
    "Samad Kausar",
    "Frontend Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "NestJS",
    "React Native",
    "TypeScript",
    "Fastify",
    "Microservices"
  ],
  authors: [{ name: "Samad Kausar" }],
  openGraph: {
    title: "Samad Kausar — Full Stack Developer (Frontend Heavy)",
    description:
      "Architecting high-scale React enterprise portals, mobile video and gaming engines, and distributed NestJS microservices.",
    type: "website",
    url: "https://samadkausar.dev"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a09] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
