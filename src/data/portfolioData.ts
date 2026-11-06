export interface Project {
  id: string;
  slug: string;
  title: string;
  shortName: string;
  tagline: string;
  category: 'Enterprise' | 'Mobile & Media' | 'Real-Time Gaming' | 'Client Infrastructure' | 'Full-Stack Platform';
  badge: string;
  statusLabel: string;
  role: string;
  whereToSee: string;
  timeline: string;
  overview: string;
  metrics: { label: string; value: string }[];
  keyEngineeringWins: string[];
  features: { title: string; description: string }[];
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
  mockupType: 'laptop' | 'phone' | 'dual';
  media?: {
    videoUrl?: string;
    screenshotUrl?: string;
  };
}

export const PROFILE = {
  name: "Samad Kausar",
  role: "Frontend-Heavy Full Stack Developer",
  subHeadline: "Crafting thoughtful, high-performance websites and web applications with clean design and robust code.",
  bio: "Full-stack developer with 2+ years of production experience building modern web portals, fluid mobile experiences, and scalable web applications. Focused on clean aesthetics, responsive interactions, and reliable engineering.",
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
    { label: "Smooth 60fps frame rate on interactive feeds", value: "60 FPS" },
    { label: "Core Web Vitals performance score", value: "95+" },
    { label: "Production web applications shipped", value: "5+" },
    { label: "Multiplayer real-time response time", value: "<40ms" }
  ]
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "nestys-ecosystem",
    slug: "nestys",
    title: "Nestys Multi-Portal Platform",
    shortName: "Nestys",
    tagline: "Modern multi-portal e-commerce platform and seller management ecosystem",
    category: "Enterprise",
    badge: "Production Client Platform",
    statusLabel: "Enterprise Platform",
    role: "Built the 3 web portals, integration layer, and shared UI system",
    whereToSee: "Client enterprise platform",
    timeline: "2026 – Present",
    accentColor: "#00D4FF",
    mockupType: "laptop",
    overview: "Three specialized web portals built for scale: Seller Central for real-time inventory and orders, candidate discovery portal, and an administrative moderation suite.",
    metrics: [
      { label: "Microservices", value: "9 Services" },
      { label: "Queue Throughput", value: "BullMQ / Redis" },
      { label: "Video Latency", value: "Adaptive HLS.js" }
    ],
    features: [
      { title: "Seller Central", description: "Real-time order pipelines, dynamic inventory matrix, and rich-text publishing powered by TipTap and Redux Toolkit." },
      { title: "Super Admin", description: "Role-Based Access Control console with HLS.js adaptive video streaming for short reel moderation and live revenue analytics." },
      { title: "Eureka Portal", description: "Candidate recruitment and listings portal with asynchronous CSV/Excel bulk upload parsers." }
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
    techStack: ["NestJS", "Prisma ORM", "BullMQ", "Redis", "AWS RDS", "HLS.js", "TipTap", "React 18", "TypeScript", "ApexCharts", "Docker"],
    demoType: "dashboard-preview"
  },
  {
    id: "scrollr-linkplay",
    slug: "scrollr",
    title: "Scrollr (LinkPlay)",
    shortName: "Scrollr",
    tagline: "Android-First Cinematic Vertical Reel Player & Universal Media Resolver API",
    category: "Mobile & Media",
    badge: "Native Mobile Engine",
    statusLabel: "Android Showcase",
    role: "Designed and engineered the full mobile client and streaming API",
    whereToSee: "Android native APK & GitHub repository",
    timeline: "2025 – 2026",
    accentColor: "#2B6CFF",
    mockupType: "phone",
    githubUrl: "https://github.com/PotatoTummy/wokata",
    overview: "A vertical video reel player with zero algorithmic manipulation: private, editorial, and fully deterministic. Paired with a hardened Fastify proxy supporting HTTP byte-range streaming.",
    metrics: [
      { label: "Display Cadence", value: "60 FPS Virtualized" },
      { label: "Assets Handled", value: "2,500+ Clips" },
      { label: "Replay Trap Prevention", value: "15-Item Recency Guard" }
    ],
    features: [
      { title: "Algorithm-Free Feed", description: "Custom Fisher-Yates memory shuffle engine prioritizes unviewed media and enforces a 15-item recency guard to prevent loops." },
      { title: "Smooth at Scale", description: "Virtualized FlatList windowing holds 2,500+ video items at consistent 60fps with zero memory leaks." },
      { title: "Hardened Streaming API", description: "Fastify reverse proxy with yt-dlp, byte-range HTTP 206 chunking, two-tier cache, and SSRF defense." }
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
    techStack: ["Expo SDK 54", "React Native 0.81", "Fastify", "yt-dlp", "TypeScript", "Zustand", "Hermes Bytecode", "Reanimated"],
    demoType: "video-reel"
  },
  {
    id: "wokataa-kite-clash",
    slug: "wokataa",
    title: "WoKataa (Kite Clash)",
    shortName: "WoKataa",
    tagline: "Real-Time Multiplayer Mobile Game with WebSocket & Ably Pub/Sub Architecture",
    category: "Real-Time Gaming",
    badge: "Client Production App",
    statusLabel: "Mobile Game",
    role: "Built the mobile client and real-time multiplayer backend",
    whereToSee: "Client production mobile app",
    timeline: "2025 – 2026",
    accentColor: "#18C38A",
    mockupType: "phone",
    overview: "A competitive real-time mobile game where two players clash token cards head to head. Low-latency state synchronization with dynamic perspective scoreboards and asynchronous streak queues.",
    metrics: [
      { label: "Sync Latency", value: "<40ms State Sync" },
      { label: "Real-Time Layer", value: "Ably Cloud + Socket.IO" },
      { label: "Background Queues", value: "BullMQ Workers" }
    ],
    features: [
      { title: "Swipeable Token Deck", description: "Reanimated 3 gesture-driven card deck with perspective scoreboards flipping dynamically per player." },
      { title: "Dual-Transport Sync", description: "Hybrid Socket.IO and Ably Cloud pub/sub channels ensure sub-40ms match synchronization with automatic failover." },
      { title: "Background Scoring", description: "BullMQ workers process streaks, medal distributions, and leaderboards entirely off the hot request path." }
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
    techStack: ["React Native 0.74", "Kotlin", "Reanimated 3", "Express", "Socket.IO", "Ably Realtime", "Prisma ORM", "BullMQ", "PostgreSQL"],
    demoType: "interactive-terminal"
  },
  {
    id: "earth-air-condition",
    slug: "earth-air",
    title: "Earth Air Condition",
    shortName: "Earth Air",
    tagline: "Commercial HVAC Enterprise Web Infrastructure, Zero-Downtime CI/CD & MCP AI Engine",
    category: "Client Infrastructure",
    badge: "Live Client Platform",
    statusLabel: "Live in Production",
    role: "Built the custom theme, admin dashboard, CI/CD, and MCP AI bridge",
    whereToSee: "Live public website (earthaircondition.in)",
    timeline: "2025 – 2026",
    accentColor: "#F5B700",
    mockupType: "laptop",
    liveUrl: "https://earthaircondition.in",
    overview: "Commercial HVAC platform completely reconstructed from a bloated visual page builder into a lightweight custom theme, achieving a 95+ Core Web Vitals score, automated GitHub Actions deploy, and an MCP AI bridge.",
    metrics: [
      { label: "Core Web Vitals", value: "95+ Performance" },
      { label: "Deployment Downtime", value: "0 Seconds (CI/CD)" },
      { label: "Spam Reduction", value: "100% via 410 Shield" }
    ],
    features: [
      { title: "Fast by Design", description: "Zero framework overhead; custom semantic HTML5/CSS3/vanilla JS architecture delivering sub-second LCP and zero CLS." },
      { title: "Command Center Dashboard", description: "Bespoke administrative dashboard empowering client staff to manage pricing, case studies, and testimonials." },
      { title: "MCP AI Content Bridge", description: "Model Context Protocol integration with PKCE OAuth2 allows external AI agents to safely query and manage live content." }
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
    techStack: ["Custom Theme", "GitHub Actions CI/CD", "FTPS", "MCP (Model Context Protocol)", "PKCE OAuth2", "PHP 8", "Vanilla JS", "SEO Engine"],
    demoType: "live-site"
  },
  {
    id: "urban-arena",
    slug: "urban-arena",
    title: "UrbanArena Platform",
    shortName: "UrbanArena",
    tagline: "Full-Stack Multi-Tenant Sports Facility & Venue Reservation Ecosystem",
    category: "Full-Stack Platform",
    badge: "Architecture Showcase",
    statusLabel: "Live Showcase",
    role: "Architected the full-stack multi-tenant platform, slot locks & QR engine",
    whereToSee: "Open source showcase & interactive preview",
    timeline: "2025",
    accentColor: "#A855F7",
    mockupType: "laptop",
    overview: "A multi-tenant sports facility reservation ecosystem featuring real-time slot scheduling with Redis mutex concurrency locks, dynamic QR entry pass validation, and provider revenue settlements.",
    metrics: [
      { label: "Database", value: "Neon Serverless Postgres" },
      { label: "Cache & Locks", value: "Upstash Redis" },
      { label: "Ticket Validation", value: "Dynamic QR Codes" }
    ],
    features: [
      { title: "Zero Double-Bookings", description: "Real-time venue slot scheduling guarded by Redis mutex concurrency locks to eliminate race conditions." },
      { title: "Dynamic QR Validation", description: "Instant cryptographic QR code generation sent via Resend for instant venue turnstile and gate validation." },
      { title: "Multi-Tenant Architecture", description: "Dedicated customer reservation flow, provider slot management portal, and platform oversight console." }
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
    techStack: ["NestJS", "React 18", "Prisma ORM", "Neon Postgres", "Upstash Redis", "TanStack Query", "Radix UI", "Resend", "Tailwind CSS"],
    demoType: "dashboard-preview"
  }
];

export const ALL_PROJECTS: Project[] = FEATURED_PROJECTS;

// For backwards compatibility
export const PROJECTS = FEATURED_PROJECTS;

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase();
  return ALL_PROJECTS.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      p.id.toLowerCase().startsWith(normalized)
  );
}

export function getAdjacentProjects(currentSlug: string) {
  const list = FEATURED_PROJECTS;
  const index = list.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug
  );
  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  return { prev, next, index };
}

export const SKILL_CATEGORIES = [
  {
    name: "Frontend Craft",
    skills: ["React 19 / 18", "Next.js 15+ (App Router)", "TypeScript", "React Native", "Tailwind CSS v4", "Redux Toolkit", "Zustand", "Radix UI", "Framer Motion", "TipTap", "HLS.js", "ApexCharts"]
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
    skills: ["Docker & Docker Compose", "AWS (RDS, S3, ElastiCache)", "Cloudflare R2", "Nginx Reverse Proxy", "GitHub Actions CI/CD", "Model Context Protocol (MCP)", "FTPS Automated Deploy"]
  },
  {
    name: "Engineering Practices",
    skills: ["Role-Based Access Control (RBAC)", "Cucumber BDD Testing", "Vitest & Jest", "Type-Safe Contracts (Zod)", "Core Web Vitals Optimization", "Clean Architecture"]
  }
];
