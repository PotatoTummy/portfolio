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
  role: "Full Stack Developer (Frontend Leaning)",
  subHeadline: "Building clean, responsive web applications and fluid mobile experiences.",
  bio: "Full Stack Developer with 2+ years of production experience crafting modern web portals, responsive user interfaces, and real-time mobile applications. Focused on clean design, fluid interactions, and reliable, maintainable code.",
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
    { label: "Google PageSpeed performance score", value: "98 / 100" },
    { label: "Production web applications delivered", value: "5+ Apps" },
    { label: "Real-time multiplayer response time", value: "<40ms" }
  ]
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "nestys-ecosystem",
    slug: "nestys",
    title: "Nestys Multi-Portal Platform",
    shortName: "Nestys",
    tagline: "An enterprise e-commerce suite with dedicated portals for sellers, recruiters, and administrators.",
    category: "Enterprise",
    badge: "Production Client Platform",
    statusLabel: "Enterprise Platform",
    role: "Built the 3 web portals, shared UI component system, and integration layer",
    whereToSee: "Client enterprise platform",
    timeline: "2026 – Present",
    accentColor: "#00D4FF",
    mockupType: "laptop",
    overview: "Built a unified three-portal web application for an enterprise client. Created an intuitive Seller Dashboard for tracking daily orders and inventory, a candidate listings portal for recruiters, and an admin moderation console.",
    metrics: [
      { label: "Portals Built", value: "3 Web Consoles" },
      { label: "Tech Stack", value: "React & NestJS" },
      { label: "Real-Time Updates", value: "Live Sync" }
    ],
    features: [
      { title: "Seller Dashboard", description: "Intuitive inventory management and real-time order tracking built with React and Redux." },
      { title: "Admin Console", description: "Centralized moderation panel with video review tools and live revenue analytics." },
      { title: "Recruitment Portal", description: "Searchable candidate listings with bulk Excel/CSV file upload support." }
    ],
    keyEngineeringWins: [
      "Designed and developed three production web portals with consistent, responsive UI components using React and TypeScript.",
      "Built real-time order and inventory management workflows that reduced manual updates for vendors.",
      "Integrated visual analytics and charts allowing business owners to monitor daily sales and performance.",
      "Collaborated on backend APIs using NestJS and PostgreSQL to ensure fast and reliable data handling."
    ],
    architecture: {
      overview: "Three specialized React frontends connected to a modular NestJS backend with PostgreSQL and Redis.",
      nodes: [
        { name: "Web Portals", role: "3 Web Consoles (React 18 + Redux)", tech: "React, TypeScript, Redux Toolkit" },
        { name: "API Gateway", role: "Authentication & Request Routing", tech: "NestJS, JWT Authentication" },
        { name: "Backend Services", role: "Orders, Catalog & Video Review", tech: "NestJS, Prisma ORM, PostgreSQL" },
        { name: "Background Jobs", role: "Order notifications & file processing", tech: "Redis Queue" }
      ],
      dataFlow: [
        "User interactions route through authenticated REST endpoints",
        "NestJS services process transactions and update PostgreSQL",
        "Live orders sync instantly across seller and admin dashboards",
        "Video clips stream smoothly for fast administrative review"
      ]
    },
    techStack: ["React", "TypeScript", "Redux Toolkit", "NestJS", "Prisma", "PostgreSQL", "Redis", "Docker"],
    demoType: "dashboard-preview"
  },
  {
    id: "scrollr-linkplay",
    slug: "scrollr",
    title: "Scrollr (LinkPlay)",
    shortName: "Scrollr",
    tagline: "A clean, distraction-free vertical video player for Android with smooth playback.",
    category: "Mobile & Media",
    badge: "Native Mobile App",
    statusLabel: "Android Showcase",
    role: "Designed and developed the mobile app and video streaming API",
    whereToSee: "Android native APK & GitHub repository",
    timeline: "2025 – 2026",
    accentColor: "#2B6CFF",
    mockupType: "phone",
    githubUrl: "https://github.com/PotatoTummy/wokata",
    overview: "Designed and built an Android-first mobile media app using React Native and Expo. Replaces distracting social media feeds with a private, ad-free video player that organizes local videos and shared links into a smooth full-screen reel.",
    metrics: [
      { label: "Performance", value: "60 FPS Fluid" },
      { label: "Library Capacity", value: "2,500+ Videos" },
      { label: "Platform", value: "React Native & Expo" }
    ],
    features: [
      { title: "Distraction-Free Reels", description: "A clean vertical swipe interface that plays personal videos without ads or algorithmic feeds." },
      { title: "High-Performance Playback", description: "Optimized list virtualization that maintains a smooth 60fps frame rate across thousands of clips." },
      { title: "Custom Media Streaming", description: "A lightweight Node.js companion service that streams external video links smoothly." }
    ],
    keyEngineeringWins: [
      "Built a custom full-screen video reel component with hardware acceleration and zero black-bar letterboxing.",
      "Engineered smart list windowing to smoothly scroll through 2,500+ video files with zero stutter or lag.",
      "Implemented local album scanning to organize device videos into easily browsable collections.",
      "Built an API streaming proxy using Fastify that chunks video data for instant startup times."
    ],
    architecture: {
      overview: "React Native mobile client with an optimized Node.js streaming proxy.",
      nodes: [
        { name: "Mobile App", role: "Cross-platform mobile player", tech: "React Native, Expo SDK, TypeScript" },
        { name: "Reel Engine", role: "Full-screen video playback modal", tech: "expo-video, Zustand" },
        { name: "Streaming Service", role: "High-speed video streaming proxy", tech: "Fastify, Node.js, yt-dlp" },
        { name: "Cache Layer", role: "Fast video metadata retrieval", tech: "In-Memory LRU Cache" }
      ],
      dataFlow: [
        "App scans local device folders for video files into a smooth list",
        "User swipes vertically; adjacent videos pre-load for instant playback",
        "External video links pass to the Fastify proxy for fast streaming",
        "Videos play back smoothly without buffering delays"
      ]
    },
    techStack: ["React Native", "Expo", "TypeScript", "Zustand", "Fastify", "Node.js", "Reanimated"],
    demoType: "video-reel"
  },
  {
    id: "wokataa-kite-clash",
    slug: "wokataa",
    title: "WoKataa (Kite Clash)",
    shortName: "WoKataa",
    tagline: "A competitive real-time multiplayer mobile game with instant match synchronization.",
    category: "Real-Time Gaming",
    badge: "Client Production App",
    statusLabel: "Mobile Game",
    role: "Built the mobile client and real-time game backend",
    whereToSee: "Client production mobile app",
    timeline: "2025 – 2026",
    accentColor: "#18C38A",
    mockupType: "phone",
    overview: "Engineered a real-time multiplayer mobile card game where players compete in live matches. Features responsive touch gesture controls, dynamic dual-perspective scorecards, and low-latency match synchronization.",
    metrics: [
      { label: "Latency", value: "<40ms Response" },
      { label: "Real-Time Engine", value: "WebSockets & Ably" },
      { label: "Platform", value: "React Native" }
    ],
    features: [
      { title: "Gesture-Driven Gameplay", description: "Smooth card swipe mechanics built with React Native Reanimated for tactile physical feel." },
      { title: "Live Match Sync", description: "Sub-40ms response times connecting players across different devices in real-time." },
      { title: "Dual Scoreboard", description: "Automatic perspective calculation showing live scores clearly from each player's viewpoint." }
    ],
    keyEngineeringWins: [
      "Developed touch-responsive card swiping animations that feel natural and responsive on both iOS and Android.",
      "Integrated WebSockets and Ably Realtime to ensure immediate move synchronization between opposing players.",
      "Created dynamic scoreboard interfaces that adjust live scores based on each player's perspective.",
      "Structured a clean Node.js backend to handle match matchmaking, score verification, and game results."
    ],
    architecture: {
      overview: "Real-time communication bridging React Native mobile apps with cloud WebSocket infrastructure.",
      nodes: [
        { name: "Mobile Client", role: "React Native game application", tech: "React Native, Reanimated, Zustand" },
        { name: "Real-Time Edge", role: "WebSocket connection management", tech: "Ably Cloud, Socket.IO" },
        { name: "API Server", role: "User profiles & match results", tech: "Node.js, Express, TypeScript" },
        { name: "Database", role: "Player stats and history", tech: "PostgreSQL, Prisma ORM" }
      ],
      dataFlow: [
        "Players swipe cards to launch moves during live matches",
        "Move data transmits across real-time WebSocket channels in <40ms",
        "Scoreboards calculate and update live on both players' screens",
        "Final match scores save to PostgreSQL with leaderboard updates"
      ]
    },
    techStack: ["React Native", "TypeScript", "Reanimated", "Socket.IO", "Ably Realtime", "Node.js", "Express", "PostgreSQL"],
    demoType: "interactive-terminal"
  },
  {
    id: "earth-air-condition",
    slug: "earth-air",
    title: "Earth Air Condition",
    shortName: "Earth Air",
    tagline: "High-performance commercial HVAC website with automated deployments and 95+ PageSpeed.",
    category: "Client Infrastructure",
    badge: "Live Client Platform",
    statusLabel: "Live in Production",
    role: "Designed custom responsive theme, client dashboard, and automated CI/CD",
    whereToSee: "Live public website (earthaircondition.in)",
    timeline: "2025 – 2026",
    accentColor: "#F5B700",
    mockupType: "laptop",
    liveUrl: "https://earthaircondition.in",
    overview: "Rebuilt an established HVAC contractor's website from scratch to eliminate slow page load times. Delivered a clean, responsive web experience with automated GitHub deployment and a 95+ performance rating on Google PageSpeed.",
    metrics: [
      { label: "Google PageSpeed", value: "98 / 100" },
      { label: "Deployment", value: "Automated CI/CD" },
      { label: "Load Time", value: "< 1 Second" }
    ],
    features: [
      { title: "Lightning Fast Loads", description: "Lightweight semantic HTML and modern CSS delivering instant sub-second page loads." },
      { title: "Client Admin Panel", description: "A simple dashboard allowing non-technical business staff to easily update pricing and projects." },
      { title: "Automated Deployment", description: "Continuous integration pipeline that publishes updates automatically on code commit." }
    ],
    keyEngineeringWins: [
      "Replaced a slow visual page builder with clean custom code, boosting PageSpeed score from 42 to 98.",
      "Created an easy-to-use custom admin interface for the client team to update services and testimonials.",
      "Set up automated GitHub Actions deployment to deliver zero-downtime updates upon git push.",
      "Optimized mobile responsiveness and SEO metadata, helping drive higher inbound customer inquiries."
    ],
    architecture: {
      overview: "Lightweight frontend connected to an automated GitHub Actions deployment pipeline.",
      nodes: [
        { name: "Frontend", role: "Fast, responsive web layout", tech: "Semantic HTML5, CSS3, JavaScript" },
        { name: "Content Admin", role: "Easy updates for non-technical staff", tech: "Custom Admin Suite" },
        { name: "CI/CD Pipeline", role: "Automated live server sync", tech: "GitHub Actions, FTPS Deployer" }
      ],
      dataFlow: [
        "Code commits to GitHub trigger automated build checks",
        "Production server receives verified updates with zero downtime",
        "Visitors enjoy instant page loads without sluggish scripts"
      ]
    },
    techStack: ["HTML5", "CSS3", "JavaScript", "GitHub Actions", "CI/CD", "SEO Optimization"],
    demoType: "live-site"
  },
  {
    id: "urban-arena",
    slug: "urban-arena",
    title: "UrbanArena Platform",
    shortName: "UrbanArena",
    tagline: "A sports venue booking platform with real-time slot scheduling and digital QR entry passes.",
    category: "Full-Stack Platform",
    badge: "Architecture Showcase",
    statusLabel: "Live Showcase",
    role: "Architected and built the full-stack booking system and digital ticketing",
    whereToSee: "Open source showcase & interactive preview",
    timeline: "2025",
    accentColor: "#A855F7",
    mockupType: "laptop",
    overview: "Designed and developed an end-to-end sports facility reservation platform. Allows athletes to easily discover local courts, reserve available timeslots without double-booking conflicts, and receive instant digital QR entry passes.",
    metrics: [
      { label: "Double Bookings", value: "Zero Conflicts" },
      { label: "Validation", value: "Instant QR Codes" },
      { label: "Tech Stack", value: "React & NestJS" }
    ],
    features: [
      { title: "Real-Time Scheduling", description: "Interactive court calendar that prevents simultaneous overlapping reservations." },
      { title: "Digital QR Passes", description: "Automatic confirmation pass generation with instant QR validation for entry gates." },
      { title: "Multi-Role Dashboards", description: "Dedicated portals for customers booking courts and facility owners managing slots." }
    ],
    keyEngineeringWins: [
      "Built an interactive slot-booking calendar interface with clear availability indicators across different sports.",
      "Implemented backend reservation safeguards that eliminate double-booking errors during peak traffic.",
      "Created automated email delivery of digital QR entry passes upon booking confirmation.",
      "Structured modular backend services with PostgreSQL and Redis to handle fast searches and venue management."
    ],
    architecture: {
      overview: "React booking interface connected to a modular NestJS API with database concurrency locks.",
      nodes: [
        { name: "Booking App", role: "Customer court discovery and checkout", tech: "React, Tailwind CSS, TanStack Query" },
        { name: "Owner Portal", role: "Facility schedule & pricing controls", tech: "React, Zustand" },
        { name: "Backend API", role: "Reservation management & auth", tech: "NestJS, Prisma ORM" },
        { name: "Database & Cache", role: "Slot scheduling and conflict prevention", tech: "PostgreSQL, Redis" }
      ],
      dataFlow: [
        "User chooses a court and desired timeslot in the interactive calendar",
        "Backend checks slot availability and temporarily reserves the spot",
        "Booking confirms and generates an automated QR entry ticket",
        "Calendar updates immediately across all user screens"
      ]
    },
    techStack: ["React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Redis", "Tailwind CSS"],
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
