export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Enterprise' | 'Mobile & Media' | 'Real-Time Gaming' | 'Client Infrastructure' | 'Full-Stack Platform';
  badge: string;
  statusLabel: string;
  timeline: string;
  overview: string;
  metrics: { label: string; value: string }[];
  keyEngineeringWins: string[];
  architecture: {
    overview: string;
    nodes: { name: string; role: string; tech: string }[];
    dataFlow: string[];
  };
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoType: 'video-reel' | 'interactive-terminal' | 'dashboard-preview' | 'live-site';
  accentColor: string;
}

export const PROFILE = {
  name: "Samad Kausar",
  role: "Full Stack Developer (Frontend Heavy)",
  subHeadline: "Architecting high-scale React portals, mobile video/gaming engines, and distributed NestJS microservices.",
  bio: "Full Stack Engineer with 2+ years of production experience building multi-portal enterprise ecosystems (Nestys), real-time multiplayer gaming platforms (WoKataa), algorithm-free cinematic video players (Scrollr), and zero-downtime client infrastructure. Obsessed with sub-50ms render times, low-latency state sync, and uncompromising UI craftsmanship.",
  location: "Gorakhpur, UP, India (Open to Remote / Hybrid)",
  email: "samadkausar786@gmail.com",
  phone: "+91 7317368358",
  github: "https://github.com/PotatoTummy",
  linkedin: "https://linkedin.com",
  currentCompany: {
    name: "Stack-IT Technologies",
    url: "https://stack-it.tech/",
    role: "Full Stack Developer (Frontend Heavy)",
    duration: "April 2026 – Present"
  },
  stats: [
    { label: "Production Platforms Delivered", value: "8+" },
    { label: "Concurrent Microservices Orchestrated", value: "9" },
    { label: "Average Mobile Feed Frame Rate", value: "60 FPS" },
    { label: "Academic Engineering CGPI", value: "9.5 / 10" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "nestys-ecosystem",
    title: "Nestys Multi-Portal Ecosystem",
    tagline: "Enterprise E-Commerce & Opportunity Network Powered by 9 Distributed Microservices",
    category: "Enterprise",
    badge: "Production Client Ecosystem",
    statusLabel: "Enterprise Auth-Gated",
    timeline: "2026 – Present",
    accentColor: "#F59E0B",
    overview: "Architected the frontend suites and microservice integrations for Nestys—an enterprise platform uniting three specialized control planes: Seller Central, Eureka Candidate Management, and Super Admin.",
    metrics: [
      { label: "Microservices", value: "9 Services" },
      { label: "Queue Throughput", value: "BullMQ / Redis" },
      { label: "Video Latency", value: "Adaptive HLS.js" }
    ],
    keyEngineeringWins: [
      "Engineered Nestys Seller Central featuring real-time inventory management, order pipelines, and WYSIWYG publishing powered by React 18, TypeScript, Redux Toolkit, and TipTap.",
      "Delivered Nestys Eureka Portal providing recruiters multi-parameter candidate filtering across offers with asynchronous CSV/Excel bulk upload parsers.",
      "Built Nestys Super Admin with Role-Based Access Control (RBAC), HLS.js adaptive video streaming for reels content moderation, and visual revenue analytics using ApexCharts.",
      "Co-architected backend microservices in NestJS with Prisma ORM, PostgreSQL, Redis caching, BullMQ queues, and Dockerized Nginx reverse proxy."
    ],
    architecture: {
      overview: "Distributed microservices coordinated via Docker Compose, Nginx Reverse Proxy, and Redis event messaging.",
      nodes: [
        { name: "Frontend Portals", role: "3 Web Consoles (React 18 + Redux)", tech: "Vite, Redux Toolkit, TipTap" },
        { name: "API Gateway", role: "Routing, JWT Auth & Rate Limiting", tech: "Nginx + NestJS Auth MS" },
        { name: "Microservices Tier", role: "9 Domain Services (Discovery, Wallet, Reels)", tech: "NestJS, Prisma, TypeScript" },
        { name: "Async Event Bus", role: "Background Job Scheduling & Notifications", tech: "BullMQ, Redis 7" },
        { name: "Database Tier", role: "Distributed Relational Storage", tech: "PostgreSQL, AWS RDS" }
      ],
      dataFlow: [
        "Client requests enter through Nginx reverse proxy with SSL termination",
        "NestJS Auth MS validates JWT tokens and enforces fine-grained RBAC permissions",
        "Domain microservices communicate asynchronously via BullMQ event streams",
        "Video moderation streams feed directly into HLS.js buffers for zero-stutter review"
      ]
    },
    techStack: ["React 18", "TypeScript", "NestJS", "Prisma ORM", "PostgreSQL", "Redis", "BullMQ", "HLS.js", "TipTap", "ApexCharts", "Docker", "AWS"],
    demoType: "dashboard-preview"
  },
  {
    id: "scrollr-linkplay",
    title: "Scrollr (LinkPlay)",
    tagline: "Android-First Cinematic Vertical Reel Player & Universal Media Resolver API",
    category: "Mobile & Media",
    badge: "Native Mobile Engine",
    statusLabel: "Open Source / Showcase",
    timeline: "2025 – 2026",
    accentColor: "#EF4444",
    githubUrl: "https://github.com/PotatoTummy/wokata",
    overview: "Reimagined vertical short-form video as an editorial, private, algorithm-free mobile reel experience, supported by a high-throughput Fastify byte-range proxy streaming API.",
    metrics: [
      { label: "Display Cadence", value: "60 FPS Virtualized" },
      { label: "Assets Handled", value: "2,500+ Clips" },
      { label: "Replay Trap Prevention", value: "15-Item Recency Guard" }
    ],
    keyEngineeringWins: [
      "Engineered the UnifiedReelPlayer modal in Expo SDK 54 / React Native 0.81 with hardware-accelerated expo-video and zero letterbox bleeding.",
      "Designed a custom Fisher-Yates memory shuffle algorithm that prioritizes unviewed media while enforcing a 15-item recency guard to eliminate repetitive playback loops.",
      "Implemented strict Android MediaStore video asset auditing (`getDeviceAlbums`) eliminating empty room anomalies caused by non-video directories.",
      "Built companion Universal Media Resolver API in Fastify with yt-dlp, featuring HTTP byte-range proxy streaming (`/api/v1/stream`), two-tier caching, and SSRF defense."
    ],
    architecture: {
      overview: "Client-side virtualized rendering paired with an edge media resolution proxy streaming engine.",
      nodes: [
        { name: "Mobile Client", role: "Expo SDK 54 / React Native 0.81 App", tech: "Hermes Bytecode, Reanimated" },
        { name: "Playback Engine", role: "Unified In-Tab Fullscreen Reel Player", tech: "expo-video, Zustand" },
        { name: "Resolver API", role: "Fastify High-Throughput HTTP Proxy", tech: "Fastify, TypeScript, yt-dlp" },
        { name: "Two-Tier Cache", role: "Metadata (24h) & Ephemeral Streams (45m)", tech: "In-Memory LRU / Redis" }
      ],
      dataFlow: [
        "Device scans native MediaStore video URIs into a windowed FlatList buffer",
        "User swipes vertically; UnifiedReelPlayer pre-buffers adjacent frames",
        "External video links pass to Fastify Resolver API which extracts raw streams via yt-dlp",
        "Proxy streams content chunk-by-chunk using HTTP 206 Partial Content range requests"
      ]
    },
    techStack: ["React Native 0.81", "Expo SDK 54", "TypeScript", "Fastify", "yt-dlp", "Zustand", "expo-video", "Hermes", "Vitest", "Zod"],
    demoType: "video-reel"
  },
  {
    id: "wokataa-kite-clash",
    title: "WoKataa (Kite Clash)",
    tagline: "Real-Time Multiplayer Mobile Game with WebSocket & Ably Pub/Sub Architecture",
    category: "Real-Time Gaming",
    badge: "Client Production App",
    statusLabel: "Client Project",
    timeline: "2025 – 2026",
    accentColor: "#8B5CF6",
    overview: "High-performance real-time gaming ecosystem featuring an interactive mobile client with gesture-driven swipe mechanics and a hybrid WebSocket/Ably distributed backend.",
    metrics: [
      { label: "Sync Latency", value: "<40ms State Sync" },
      { label: "Real-Time Layer", value: "Ably Cloud + Socket.IO" },
      { label: "Background Queues", value: "BullMQ Workers" }
    ],
    keyEngineeringWins: [
      "Built cross-platform mobile client with React Native 0.74, modern Kotlin entrypoints, and gesture-driven card decks using Reanimated 3 and Deck Swiper.",
      "Engineered real-time dynamic perspective scoreboard calculating live scores into bidirectional 'Your Team' vs 'Opponent Team' projections.",
      "Built resilient distributed backend using Node.js, Express, Prisma ORM, and PostgreSQL 15 with hybrid WebSocket and Ably Realtime channels.",
      "Implemented BullMQ queue workers handling asynchronous medal calculations, streak tracking, leaderboard updates, and Firebase Cloud Messaging (FCM)."
    ],
    architecture: {
      overview: "Dual pub/sub state synchronization bridging stateful Socket.IO connections and serverless Ably channels.",
      nodes: [
        { name: "Mobile App", role: "React Native + Kotlin Native Layer", tech: "RN 0.74, Reanimated 3, Zustand" },
        { name: "Real-Time Edge", role: "Persistent WebSockets & Cloud Pub/Sub", tech: "Ably Realtime Cloud, Socket.IO" },
        { name: "API Server", role: "REST Endpoints & Match Scheduling", tech: "Node.js, Express, TypeScript" },
        { name: "Queue Workers", role: "Medals, Streaks & Leaderboard Sync", tech: "BullMQ, Redis 7" },
        { name: "Storage Layer", role: "Relational Data & Asset CDN", tech: "PostgreSQL 15, Cloudflare R2" }
      ],
      dataFlow: [
        "Players swipe token cards to initiate team attacks; state emits over Ably channels",
        "Backend validates move sequence against session state stored in Redis",
        "Dynamic scoreboards sync across all spectator and participant screens in <40ms",
        "BullMQ workers process end-of-match streaks and trigger FCM notifications"
      ]
    },
    techStack: ["React Native", "TypeScript", "Kotlin", "Express", "Prisma ORM", "PostgreSQL", "Redis 7", "Ably Realtime", "Socket.IO", "BullMQ", "Cloudflare R2"],
    demoType: "interactive-terminal"
  },
  {
    id: "earth-air-condition",
    title: "Earth Air Condition",
    tagline: "Commercial HVAC Enterprise Web Infrastructure, Zero-Downtime CI/CD & MCP AI Engine",
    category: "Client Infrastructure",
    badge: "Live Client Platform",
    statusLabel: "Live in Production",
    timeline: "2025 – 2026",
    accentColor: "#0284C7",
    liveUrl: "https://earthaircondition.in",
    overview: "Engineered production commercial web platform, custom WordPress theme, automated CI/CD pipeline, and AI Model Context Protocol (MCP) bridge for an authorized industrial HVAC contractor.",
    metrics: [
      { label: "Core Web Vitals", value: "95+ Performance" },
      { label: "Deployment Downtime", value: "0 Seconds (CI/CD)" },
      { label: "Spam Reduction", value: "100% via 410 Shield" }
    ],
    keyEngineeringWins: [
      "Eliminated bloated visual page builders, replacing them with a custom semantic HTML5/CSS3/vanilla JS architecture delivering sub-second LCP and zero CLS.",
      "Developed the 'Earth Air Command Center' bespoke admin suite giving non-technical staff zero-code management over live pricing, case studies, and testimonials.",
      "Configured Model Context Protocol (MCP) PKCE OAuth2 authentication allowing external AI assistants to safely query and manage WordPress REST endpoints.",
      "Engineered automated GitHub Actions CI/CD deploying directly to Hostinger upon git push, complete with an HTTP 410 Gone spam defense firewall."
    ],
    architecture: {
      overview: "Lightweight custom theme backed by automated GitHub Actions FTPS deployments and MCP AI integration.",
      nodes: [
        { name: "Custom Theme", role: "Semantic HTML5/CSS3/Vanilla JS", tech: "PHP 8, Pure CSS, JS" },
        { name: "Client Admin Suite", role: "Easy Edit Command Center", tech: "WordPress Custom Post Types & Meta" },
        { name: "MCP AI Bridge", role: "PKCE OAuth2 Agent Connector", tech: "Model Context Protocol, REST API" },
        { name: "CI/CD Pipeline", role: "Automated Production Sync", tech: "GitHub Actions, FTPS Deployer" }
      ],
      dataFlow: [
        "Code commits to `main` branch trigger GitHub Actions automated test & FTPS sync",
        "Production server receives atomic updates with zero downtime",
        "Visitors receive pre-rendered HTML with zero JavaScript framework overhead",
        "External AI assistants authenticate via MCP to manage blog and case study drafts"
      ]
    },
    techStack: ["WordPress Custom Architecture", "PHP 8", "Vanilla JavaScript", "HTML5/CSS3", "GitHub Actions CI/CD", "Model Context Protocol (MCP)", "JSON-LD Schema", "SEO Engine"],
    demoType: "live-site"
  },
  {
    id: "servotech-suite",
    title: "Servotech Enterprise Suite",
    tagline: "Mission-Critical Internal Dashboards: PM Board, HRMS, Asset Management & ATS",
    category: "Enterprise",
    badge: "W3villa Technologies",
    statusLabel: "Enterprise Production",
    timeline: "2024 – 2025",
    accentColor: "#10B981",
    overview: "Delivered four mission-critical enterprise systems under the Servotech suite: Project Management Board, HRMS Workplace, Asset Management, and Applicant Tracking System (ATS).",
    metrics: [
      { label: "Sub-Applications", value: "4 Full Dashboards" },
      { label: "Test Automation", value: "Cucumber BDD" },
      { label: "Auth Standards", value: "OAuth 2.0 / JWT" }
    ],
    keyEngineeringWins: [
      "PM Board: Built sprint management boards, timeline views, and task state tracking interfaces.",
      "HRMS Workplace: Implemented employee directory, attendance workflows, and executive analytics.",
      "Asset Management: Built high-performance inventory tracking UI featuring full-text search and multi-layer filters.",
      "ATS System: Engineered applicant tracking pipeline visualizers and recruiter workflow boards.",
      "Maintained strict quality gates with Cucumber end-to-end automation and React performance optimization."
    ],
    architecture: {
      overview: "Multi-tenant enterprise frontend communicating with secure RESTful backend services.",
      nodes: [
        { name: "PM & HRMS UI", role: "Interactive Workspaces", tech: "React.js, Redux, Tailwind" },
        { name: "ATS & Asset UI", role: "Recruiter & Inventory Dashboards", tech: "React.js, React Table" },
        { name: "API Gateway", role: "Secure Enterprise Auth", tech: "OAuth 2.0, JWT" },
        { name: "E2E Testing", role: "Regression & Quality Gate", tech: "Cucumber BDD" }
      ],
      dataFlow: [
        "Single Sign-On (SSO) authentication grants scoped access across workspace apps",
        "React frontend leverages optimistic updates for low-latency task and status changes",
        "Automated Cucumber suites run continuous regression checks on candidate and asset pipelines"
      ]
    },
    techStack: ["React.js", "React Native", "TypeScript", "Redux", "REST APIs", "Cucumber", "OAuth 2.0", "Webpack"],
    demoType: "dashboard-preview"
  },
  {
    id: "urban-arena",
    title: "UrbanArena",
    tagline: "Full-Stack Multi-Tenant Sports Facility & Venue Reservation Ecosystem",
    category: "Full-Stack Platform",
    badge: "Architecture Showcase",
    statusLabel: "Open Source / Showcase",
    timeline: "2025",
    accentColor: "#06B6D4",
    overview: "Architected a multi-tenant sports facility booking platform consisting of a user-facing booking portal, venue service provider console, super admin dashboard, and NestJS API.",
    metrics: [
      { label: "Database", value: "Neon Serverless Postgres" },
      { label: "Cache", value: "Upstash Redis" },
      { label: "Ticket Validation", value: "Dynamic QR Codes" }
    ],
    keyEngineeringWins: [
      "Engineered real-time venue slot scheduling with concurrency locks preventing double bookings.",
      "Implemented automated provider revenue settlements and automated transactional email dispatch via Resend.",
      "Built dynamic QR-code entry pass generation for instant venue gate validation.",
      "Constructed a clean full-stack architecture using NestJS, Prisma ORM, Neon PostgreSQL, and Upstash Redis."
    ],
    architecture: {
      overview: "Serverless PostgreSQL paired with NestJS modular architecture and edge caching.",
      nodes: [
        { name: "Booking Web App", role: "Customer Reservation Flow", tech: "React 18, Vite, Radix UI, TanStack Query" },
        { name: "Provider Portal", role: "Venue & Slot Management", tech: "React 18, Tailwind, Zustand" },
        { name: "Admin Console", role: "Platform Oversight & Settlements", tech: "React 18, Vite" },
        { name: "Backend API", role: "Modular Micro-Architecture", tech: "NestJS, Prisma, Neon Postgres, Upstash Redis" }
      ],
      dataFlow: [
        "User selects sport facility and available timeslot in real time",
        "NestJS backend verifies slot availability with Redis mutex locks",
        "Confirmed booking writes to Neon PostgreSQL and triggers Resend confirmation email with QR pass",
        "Provider checks in visitor by scanning QR pass at the gate"
      ]
    },
    techStack: ["NestJS", "React 18", "TypeScript", "Neon Postgres", "Prisma ORM", "Upstash Redis", "TanStack Query", "Radix UI", "Resend", "Tailwind CSS"],
    demoType: "dashboard-preview"
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Frontend Craft",
    skills: ["React 19 / 18", "Next.js 15 (App Router)", "TypeScript", "React Native", "Tailwind CSS v4", "Redux Toolkit", "Zustand", "Radix UI", "Framer Motion", "TipTap", "HLS.js", "ApexCharts"]
  },
  {
    name: "Backend & Distributed Systems",
    skills: ["NestJS", "Node.js", "Fastify", "Express.js", "Prisma ORM", "PostgreSQL", "MySQL", "Neon Serverless", "Redis 7 / Upstash", "BullMQ Queues", "yt-dlp", "RESTful & RPC APIs"]
  },
  {
    name: "Real-Time & Media Protocols",
    skills: ["WebSockets (Socket.IO)", "Ably Realtime Cloud", "HTTP Byte-Range Proxy Streaming", "Adaptive Bitrate Video (HLS)", "Two-Tier Stream Caching", "Firebase Cloud Messaging"]
  },
  {
    name: "DevOps & Infrastructure",
    skills: ["Docker & Docker Compose", "Kubernetes", "AWS (RDS, S3, ElastiCache)", "Cloudflare R2", "Nginx Reverse Proxy", "GitHub Actions CI/CD", "Model Context Protocol (MCP)", "FTPS Automated Deploy"]
  },
  {
    name: "Engineering Practices",
    skills: ["Role-Based Access Control (RBAC)", "Cucumber BDD Testing", "Vitest & Jest", "Type-Safe Contracts (Zod)", "Core Web Vitals Optimization", "Clean Architecture"]
  }
];
