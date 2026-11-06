import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0B0A] text-[#F3F3EE] overflow-x-clip selection:bg-[#00D4FF] selection:text-[#0B0B0A]">
        {children}
      </body>
    </html>
  );
}
