"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { FEATURED_PROJECTS, PROFILE, Project } from "@/data/portfolioData";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export const SpatialProjectExperience: React.FC = () => {
  const mountRef = useRef<HTMLCanvasElement | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const chapters: Array<{
    title: string;
    kind: string;
    slug?: string;
    summary?: string;
    facts?: string[];
    tech?: string[];
    isHero?: boolean;
    isEnd?: boolean;
    project?: Project;
  }> = [
    {
      title: "Samad Kausar",
      kind: "Opening",
      isHero: true,
    },
    ...FEATURED_PROJECTS.map((p) => ({
      title: p.title,
      kind: p.category,
      slug: p.slug,
      summary: p.overview,
      facts: [
        p.metrics[0] ? `${p.metrics[0].value} — ${p.metrics[0].label}` : "",
        p.metrics[1] ? `${p.metrics[1].value} — ${p.metrics[1].label}` : "",
        p.role,
      ].filter(Boolean),
      tech: p.techStack.slice(0, 4),
      project: p,
    })),
    {
      title: "Let's build the next one.",
      kind: "Credits",
      isEnd: true,
    },
  ];

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const SP = 10;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0a, 0.028);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 120);
    scene.add(camera);

    const rimLight = new THREE.PointLight(0xff5533, 2.4, 35);
    rimLight.position.set(3, 2, 4);
    camera.add(rimLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(-4, 6, 5);
    const dirLight2 = new THREE.DirectionalLight(0xffeedd, 0.6);
    dirLight2.position.set(5, -2, -4);
    scene.add(dirLight1, dirLight2, new THREE.AmbientLight(0xffffff, 0.55));

    // Star Constellation
    const nStars = 1400;
    const starCoords = new Float32Array(nStars * 3);
    for (let i = 0; i < nStars; i++) {
      starCoords[i * 3] = (Math.random() - 0.5) * 44;
      starCoords[i * 3 + 1] = Math.random() * -85 + 8;
      starCoords[i * 3 + 2] = (Math.random() - 0.5) * 32 - 8;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ size: 0.05, color: 0xf3f3ee, transparent: true, opacity: 0.45, depthWrite: false })
      )
    );

    // Realistic Screen Texture Generator
    const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    };

    const makeScreen = (
      w: number,
      h: number,
      radius: number,
      draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => void
    ) => {
      const cvs = document.createElement("canvas");
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext("2d");
      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;

      return {
        tex,
        draw(p: number, t: number) {
          if (!ctx) return;
          ctx.clearRect(0, 0, w, h);
          ctx.save();
          roundRect(ctx, 0, 0, w, h, radius);
          ctx.clip();
          draw(ctx, w, h, p, t);
          ctx.restore();
          tex.needsUpdate = true;
        },
      };
    };

    // Realistic UI Screen Canvas Painters
    const screenDrawers = {
      // 1. Nestys: Seller Central Dashboard
      nestys: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => {
        ctx.fillStyle = "#0C0D0E";
        ctx.fillRect(0, 0, w, h);

        // Sidebar
        ctx.fillStyle = "#111315";
        ctx.fillRect(0, 0, w * 0.18, h);
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = i === 0 ? "#FF5533" : "rgba(255,255,255,0.12)";
          roundRect(ctx, 14, 50 + i * 28, w * 0.18 - 28, 12, 4);
          ctx.fill();
        }

        // Header
        ctx.fillStyle = "#F3F3EE";
        ctx.font = "bold 18px Geist, -apple-system, sans-serif";
        ctx.fillText("Nestys Seller Central", w * 0.22, 34);

        ctx.fillStyle = "rgba(255,85,51,0.2)";
        roundRect(ctx, w - 160, 16, 140, 24, 6);
        ctx.fill();
        ctx.fillStyle = "#FF5533";
        ctx.font = "bold 11px monospace";
        ctx.fillText("9 Microservices", w - 145, 32);

        // Metric Cards
        for (let i = 0; i < 3; i++) {
          const x = w * 0.22 + i * (w * 0.25);
          ctx.fillStyle = "#15181C";
          roundRect(ctx, x, 52, w * 0.23, 56, 8);
          ctx.fill();

          ctx.fillStyle = "rgba(255,255,255,0.4)";
          roundRect(ctx, x + 12, 64, w * 0.1, 7, 3);
          ctx.fill();

          ctx.fillStyle = i === 0 ? "#FF5533" : "#FFFFFF";
          ctx.font = "bold 15px monospace";
          ctx.fillText(i === 0 ? "$84,920" : i === 1 ? "1,248" : "48 HLS", x + 12, 94);
        }

        // Animated Bar Chart
        const base = h - 75;
        const nBars = 12;
        const bWidth = (w * 0.74 - 24) / nBars;
        for (let i = 0; i < nBars; i++) {
          const val = (0.35 + 0.6 * Math.abs(Math.sin(i * 1.2 + t * 0.6))) * Math.min(1, 0.4 + p);
          ctx.fillStyle = i % 4 === 1 ? "#FF5533" : "rgba(255,85,51,0.4)";
          roundRect(ctx, w * 0.22 + i * bWidth, base - val * 110, bWidth - 6, val * 110, 3);
          ctx.fill();
        }

        // Live Order Rows
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = "rgba(255,255,255,0.06)";
          roundRect(ctx, w * 0.22, h - 60 + i * 18, w * 0.74 * (1 - i * 0.15), 10, 3);
          ctx.fill();
        }
      },

      // 2. Scrollr: Short Video Reel
      scrollr: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#1A162B");
        grad.addColorStop(0.5, "#0D1F38");
        grad.addColorStop(1, "#1F0D0D");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Play Symbol Orb
        ctx.fillStyle = "rgba(43,108,255,0.3)";
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.45, 42, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(w / 2 - 10, h * 0.45 - 16);
        ctx.lineTo(w / 2 + 18, h * 0.45);
        ctx.lineTo(w / 2 - 10, h * 0.45 + 16);
        ctx.fill();

        // Feed Action Pills
        for (let q = 0; q < 3; q++) {
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.beginPath();
          ctx.arc(w - 28, h * 0.6 + q * 42, 12, 0, Math.PI * 2);
          ctx.fill();
        }

        // Creator Caption
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 13px Geist, sans-serif";
        ctx.fillText("@potato_dev", 20, h - 85);

        ctx.fillStyle = "rgba(255,255,255,0.65)";
        roundRect(ctx, 20, h - 70, w * 0.65, 8, 4);
        ctx.fill();

        // 60fps Scrubber
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        roundRect(ctx, 20, h - 45, w - 40, 4, 2);
        ctx.fill();
        ctx.fillStyle = "#2B6CFF";
        roundRect(ctx, 20, h - 45, (w - 40) * 0.65, 4, 2);
        ctx.fill();
      },

      // 3. WoKataa: Real-Time Multiplayer Clash
      wokataa: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number, offset = 0) => {
        ctx.fillStyle = "#0A0D14";
        ctx.fillRect(0, 0, w, h);

        // Ping Indicator
        ctx.fillStyle = "#18C38A";
        ctx.font = "bold 11px monospace";
        ctx.fillText("18ms (Ably Cloud)", 20, 36);

        // Dynamic Scoreboard
        ctx.fillStyle = "#121A24";
        roundRect(ctx, 20, 52, w - 40, 48, 8);
        ctx.fill();

        ctx.fillStyle = "#18C38A";
        ctx.font = "bold 16px monospace";
        ctx.fillText("4,850", 32, 82);

        ctx.fillStyle = "#FF5533";
        ctx.font = "bold 16px monospace";
        ctx.fillText("3,920", w - 85, 82);

        // Floating Kite Cards
        const drawCard = (x: number, y: number, rot: number, colorA: string, colorB: string, label: string) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          const g = ctx.createLinearGradient(-60, -90, 60, 90);
          g.addColorStop(0, colorA);
          g.addColorStop(1, colorB);
          ctx.fillStyle = g;
          roundRect(ctx, -75, -110, 150, 220, 16);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "italic bold 64px 'Instrument Serif', Georgia, serif";
          ctx.textAlign = "center";
          ctx.fillText(label, 0, 22);
          ctx.restore();
        };

        const swing = Math.sin(t * 1.2 + offset);
        drawCard(w / 2, h * 0.56, 0, "#18C38A", "#064A36", offset ? "W" : "K");
        drawCard(w / 2 + swing * w * 0.45, h * 0.56 - Math.abs(swing) * 12, swing * 0.3, "#FF5533", "#7A1D0C", offset ? "K" : "W");
      },

      // 4. Earth Air: 98 Core Web Vitals Platform
      earthAir: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => {
        ctx.fillStyle = "#0E1116";
        ctx.fillRect(0, 0, w, h);

        // Header
        ctx.fillStyle = "#141922";
        ctx.fillRect(0, 0, w, 40);
        ctx.fillStyle = "#F5B700";
        ctx.font = "bold 14px Geist, sans-serif";
        ctx.fillText("Earth Air Condition — Commercial HVAC", 20, 26);

        // Hero Block
        const grad = ctx.createLinearGradient(0, 40, 0, h * 0.6);
        grad.addColorStop(0, "#16202C");
        grad.addColorStop(1, "#0E1116");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 40, w, h * 0.5);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px Geist, sans-serif";
        ctx.fillText("Industrial Climate Engineering", 24, 85);

        ctx.fillStyle = "rgba(255,255,255,0.6)";
        roundRect(ctx, 24, 105, w * 0.55, 10, 4);
        ctx.fill();

        // 98 Core Web Vitals Dial
        const cx = w * 0.8;
        const cy = h * 0.5;
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.arc(cx, cy, 44, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "#2FD27A";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(cx, cy, 44, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.98);
        ctx.stroke();

        ctx.fillStyle = "#2FD27A";
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.fillText("98", cx, cy + 11);
        ctx.textAlign = "left";

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px monospace";
        ctx.fillText("LCP 0.6s · 0s Downtime", cx - 65, cy + 70);
      },

      // 5. Urban Arena: Multi-Tenant Venue Suite (Replaces Servotech)
      urbanArena: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => {
        ctx.fillStyle = "#0D0B12";
        ctx.fillRect(0, 0, w, h);

        // Header
        ctx.fillStyle = "#13101C";
        ctx.fillRect(0, 0, w, 40);
        ctx.fillStyle = "#B04DFF";
        ctx.font = "bold 14px Geist, sans-serif";
        ctx.fillText("UrbanArena — Venue Reservation Suite", 20, 26);

        // Facility Venue Box
        ctx.fillStyle = "#171322";
        roundRect(ctx, 20, 56, w * 0.62, h - 80, 10);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px Geist, sans-serif";
        ctx.fillText("Centennial Badminton Arena · Court 03", 34, 84);

        // Slot Buttons
        for (let i = 0; i < 4; i++) {
          const isSelected = i === 2;
          ctx.fillStyle = isSelected ? "#B04DFF" : "rgba(255,255,255,0.08)";
          roundRect(ctx, 34 + i * 85, 105, 75, 42, 6);
          ctx.fill();

          ctx.fillStyle = isSelected ? "#000000" : "#FFFFFF";
          ctx.font = "bold 12px monospace";
          ctx.fillText(`${17 + i}:00`, 48 + i * 85, 131);
        }

        // Redis Mutex Chip
        ctx.fillStyle = "rgba(176,77,255,0.15)";
        roundRect(ctx, 34, 165, 260, 26, 6);
        ctx.fill();
        ctx.fillStyle = "#B04DFF";
        ctx.font = "bold 11px monospace";
        ctx.fillText("Redis Mutex: Slot Locked for 04:58", 44, 182);

        // Right QR Pass Box
        const qx = w * 0.68;
        ctx.fillStyle = "#171322";
        roundRect(ctx, qx, 56, w * 0.28, h - 80, 10);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        roundRect(ctx, qx + 20, 85, w * 0.28 - 40, w * 0.28 - 40, 8);
        ctx.fill();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 11px monospace";
        ctx.fillText("[QR PASS]", qx + 40, 140);

        ctx.fillStyle = "#2FD27A";
        ctx.font = "bold 11px monospace";
        ctx.fillText("Turnstile Verified", qx + 25, 220);
      },
    };

    // 3D Physical Hardware Device Builders
    const metalMaterial = (color = 0x242422) =>
      new THREE.MeshStandardMaterial({ color, metalness: 0.88, roughness: 0.26 });

    const createPhone = (drawFn: (c: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => void) => {
      const w = 1.1;
      const h = 2.3;
      const d = 0.1;
      const r = 0.22;
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

      const geo = new THREE.ExtrudeGeometry(s, {
        depth: d,
        bevelEnabled: true,
        bevelSize: 0.025,
        bevelThickness: 0.025,
        bevelSegments: 5,
        curveSegments: 16,
      });
      geo.translate(0, 0, -d / 2);

      const group = new THREE.Group();
      const screen = makeScreen(256, 560, 42, drawFn);
      group.add(new THREE.Mesh(geo, metalMaterial()));

      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w - 0.09, h - 0.09),
        new THREE.MeshBasicMaterial({ map: screen.tex, transparent: true, toneMapped: false })
      );
      screenMesh.position.z = d / 2 + 0.028;
      group.add(screenMesh);

      // Camera Bump Lens
      [-0.26, 0.86].forEach((q) => {
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 28), metalMaterial(0x0c0c0b));
        lens.rotation.x = Math.PI / 2;
        lens.position.set(-0.27, q, -d / 2 - 0.04);
        group.add(lens);
      });

      return { group, screens: [screen] };
    };

    const createLaptop = (drawFn: (c: CanvasRenderingContext2D, w: number, h: number, p: number, t: number) => void) => {
      const group = new THREE.Group();
      const screen = makeScreen(640, 380, 10, drawFn);

      // Aluminum Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.09, 1.95), metalMaterial());
      group.add(base);

      // Trackpad Deck
      const trackpad = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 0.7),
        new THREE.MeshStandardMaterial({ color: 0x1f1f1d, roughness: 0.5, metalness: 0.4 })
      );
      trackpad.rotation.x = -Math.PI / 2;
      trackpad.position.set(0, 0.048, 0.45);
      group.add(trackpad);

      // Animated Display Hinge
      const hinge = new THREE.Group();
      hinge.position.set(0, 0.045, -0.97);
      group.add(hinge);

      const lidGeo = new THREE.BoxGeometry(2.9, 1.85, 0.07);
      lidGeo.translate(0, 0.925, 0);
      hinge.add(new THREE.Mesh(lidGeo, metalMaterial()));

      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.7, 1.62),
        new THREE.MeshBasicMaterial({ map: screen.tex, transparent: true, toneMapped: false })
      );
      screenMesh.position.set(0, 0.93, 0.038);
      hinge.add(screenMesh);

      return {
        group,
        screens: [screen],
        open(v: number) {
          const ease = (x: number) => x * x * (3 - 2 * x);
          const clamped = Math.max(0, Math.min(1, v));
          hinge.rotation.x = Math.PI / 2 + (-0.22 - Math.PI / 2) * ease(clamped);
        },
      };
    };

    // Rig Spatial Scenes along the scroll descent
    interface SceneRig {
      group: THREE.Group;
      screens: Array<{ draw: (p: number, t: number) => void }>;
      update: (lp: number, t: number, shouldDraw: boolean) => void;
      baseY?: number;
    }

    const sceneRigs: SceneRig[] = [];

    type ScreenItem = { draw: (p: number, t: number) => void; tex: THREE.CanvasTexture };
    type DeviceItem = { group: THREE.Group; screens: ScreenItem[]; open?: (v: number) => void };

    const addRig = (
      parts: Array<[DeviceItem, number, number, number, number, number]>,
      options: { isHero?: boolean; baseRotation?: number; y0?: number } = {}
    ) => {
      const outer = new THREE.Group();
      const inner = new THREE.Group();
      outer.add(inner);

      const screens: ScreenItem[] = [];
      const laptops: DeviceItem[] = [];

      parts.forEach(([dev, x, y, z, ry, scale]) => {
        dev.group.position.set(x, y, z);
        dev.group.rotation.y = ry;
        dev.group.scale.setScalar(scale || 1);
        inner.add(dev.group);
        screens.push(...dev.screens);
        if (dev.open) laptops.push(dev);
      });

      sceneRigs.push({
        group: outer,
        screens,
        baseY: options.y0 || 0,
        update: (lp, t, shouldDraw) => {
          const spin = (lp - 0.5) * 1.15;
          inner.rotation.y = (options.baseRotation || -0.35) + spin + Math.sin(t * 0.5) * 0.06;
          inner.rotation.x = 0.06 + mouseY * 0.18;
          inner.rotation.z = mouseX * 0.04;
          inner.position.y = Math.sin(t * 0.9) * 0.07;

          laptops.forEach((l) => l.open?.(lp * 3.5));
          if (shouldDraw) {
            screens.forEach((s) => s.draw(lp, t));
          }
        },
      });
    };

    // 0. Hero: Laptop + Phone orbiting together
    addRig(
      [
        [createLaptop(screenDrawers.nestys), -0.4, -0.5, 0, 0, 1.05],
        [createPhone(screenDrawers.scrollr), 1.9, -0.3, 0.9, -0.35, 0.8],
      ],
      { isHero: true, baseRotation: -0.2, y0: -0.9 }
    );

    // 1. Nestys: 3D Laptop with Seller Central Dashboard
    addRig([[createLaptop(screenDrawers.nestys), 0, -0.6, 0, 0, 1.15]], { baseRotation: -0.4 });

    // 2. Scrollr: Two 3D Phones in Portrait
    addRig(
      [
        [createPhone(screenDrawers.scrollr), -0.75, 0, 0.4, 0.15, 1],
        [createPhone(screenDrawers.scrollr), 0.95, -0.15, -0.6, -0.2, 1],
      ],
      { baseRotation: -0.3 }
    );

    // 3. WoKataa: Clashing Multiplayer Duel Phones
    addRig(
      [
        [createPhone((c, w, h, p, t) => screenDrawers.wokataa(c, w, h, p, t, 0)), -0.95, 0, 0, 0.35, 1],
        [createPhone((c, w, h, p, t) => screenDrawers.wokataa(c, w, h, p, t, 1)), 0.95, 0, 0, -0.35, 1],
      ],
      { baseRotation: 0 }
    );

    // 4. Earth Air: 3D Laptop with 98 Core Web Vitals Dial
    addRig([[createLaptop(screenDrawers.earthAir), 0, -0.6, 0, 0, 1.15]], { baseRotation: -0.4 });

    // 5. Urban Arena: 3D Laptop with Venue Reservation (Replaces Servotech)
    addRig([[createLaptop(screenDrawers.urbanArena), 0, -0.6, 0, 0, 1.15]], { baseRotation: -0.4 });

    // 6. Outro: Dual Laptop & Phone
    addRig(
      [
        [createLaptop(screenDrawers.urbanArena), -0.4, -0.5, 0, 0, 1.05],
        [createPhone((c, w, h, p, t) => screenDrawers.wokataa(c, w, h, p, t, 0)), 1.9, -0.3, 0.9, -0.35, 0.8],
      ],
      { isHero: true, baseRotation: -0.2, y0: -0.5 }
    );

    sceneRigs.forEach((rig, i) => {
      rig.group.position.y = -i * SP;
      scene.add(rig.group);
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isDesktop = width > 820;
    let mouseX = 0;
    let mouseY = 0;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isDesktop = width > 820;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      sceneRigs.forEach((rig, i) => {
        const isCenter = i === 0 || i === sceneRigs.length - 1;
        rig.group.position.x = isDesktop && !isCenter ? 2.5 : 0;
        rig.group.scale.setScalar(isDesktop ? 1 : isCenter ? 0.7 : 0.62);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / width - 0.5;
      mouseY = e.clientY / height - 0.5;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onMouseMove, { passive: true });
    onResize();

    let targetChapterFloat = 0;
    let currentChapterFloat = 0;
    let lastTime = performance.now();
    let totalTime = 0;
    let frame = 0;
    let animId: number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = scrollY / totalScrollable;
      setScrollProgress(progress);

      const sectionEls = document.querySelectorAll(".ch-section");
      let activeIdx = 0;
      sectionEls.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          activeIdx = idx;
        }
        const sp = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
        if (idx === activeIdx) {
          targetChapterFloat = Math.min(chapters.length - 1, Math.max(0, idx - 0.5 + sp));
        }
      });
      setActiveChapter(activeIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      totalTime += dt;
      frame++;

      currentChapterFloat += (targetChapterFloat - currentChapterFloat) * 0.08;

      camera.position.x += (mouseX * 1.3 - camera.position.x) * 0.05;
      camera.position.y = -currentChapterFloat * SP - mouseY * 0.6 + 0.2;
      camera.position.z = 9.5;
      camera.lookAt(0, -currentChapterFloat * SP, 0);

      sceneRigs.forEach((rig, i) => {
        const isNear = Math.abs(currentChapterFloat - i) < 1.3;
        rig.group.visible = isNear;
        if (isNear) {
          rig.update(
            Math.max(0, Math.min(1, currentChapterFloat - i + 0.5)),
            totalTime,
            frame % 2 === 0
          );
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={mountRef}
        id="gl"
        className="fixed inset-0 w-full h-full z-0 block pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Red Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] w-full bg-[#FF5533] origin-left z-30 transition-transform duration-75 pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Right Navigation Dots */}
      <nav
        className="hidden md:grid fixed right-6 top-1/2 -translate-y-1/2 z-30 gap-3.5"
        aria-label="Story Chapters"
      >
        {chapters.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => {
              const el = document.querySelectorAll(".ch-section")[idx] as HTMLElement;
              if (el) {
                window.scrollTo({
                  top: el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.5,
                  behavior: "smooth",
                });
              }
            }}
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              idx === activeChapter
                ? "bg-[#FF5533] border-[#FF5533] scale-150"
                : "border-white/40 hover:border-white bg-transparent"
            }`}
            aria-label={`Jump to ${ch.title}`}
          />
        ))}
      </nav>

      {/* Story Sections Stack */}
      <main className="relative z-10">
        {chapters.map((ch, idx) => {
          if (ch.isHero) {
            return (
              <section
                key={idx}
                className="ch-section relative h-[240vh]"
                data-chap="Reel 00 · Opening"
              >
                <div className="sticky top-0 h-[100svh] flex items-center justify-center p-6 text-center pointer-events-none">
                  <div className="pointer-events-auto max-w-4xl space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1 text-xs font-mono text-zinc-300 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5533] animate-pulse" />
                      <span>Full Stack Developer (Frontend Heavy)</span>
                    </div>

                    <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-normal tracking-tight text-white leading-[0.88]">
                      Samad Kausar
                    </h1>

                    <p className="font-sans text-base sm:text-xl text-zinc-300 max-w-xl mx-auto leading-relaxed">
                      Frontend-heavy full stack engineer. I build interfaces that feel{" "}
                      <em className="italic text-[#FF5533] font-serif">finished</em>.
                    </p>

                    <div className="pt-4 flex items-center justify-center gap-3">
                      <a
                        href="#nestys"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FF5533] px-6 py-3 text-xs sm:text-sm font-bold text-[#0B0B0A] hover:scale-105 transition-transform"
                      >
                        <span>Explore Story</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (ch.isEnd) {
            return (
              <section
                key={idx}
                className="ch-section relative h-[180vh]"
                data-chap="Reel 08 · Credits"
              >
                <div className="sticky top-0 h-[100svh] flex items-center justify-center p-6 text-center pointer-events-none">
                  <div className="pointer-events-auto max-w-3xl space-y-6">
                    <div className="text-xs font-mono text-[#FF5533] uppercase">
                      Reel 08 · Credits
                    </div>
                    <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-normal text-white tracking-tight leading-[0.92]">
                      Let&apos;s build<br />
                      the <em className="italic text-[#FF5533]">next</em> one.
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto">
                      Available for high-scale full-stack architecture, low-latency mobile media engines, or specialized contracts.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#FF5533] px-8 py-3.5 text-sm font-semibold text-[#0B0B0A] hover:scale-105 transition-transform"
                      >
                        <span>Say Hello</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // Project Chapters (Nestys, Scrollr, WoKataa, Earth Air, Urban Arena)
          return (
            <section
              key={idx}
              id={ch.slug}
              className="ch-section relative h-[300vh]"
              data-chap={ch.project?.shortName || ch.title}
            >
              <div className="sticky top-0 h-[100svh] flex items-center p-4 sm:p-12 pointer-events-none">
                {/* Frosted Glass Pinned Story Card */}
                <div className="pointer-events-auto w-full max-w-[540px] p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B0B0A]/85 via-[#0B0B0A]/75 to-[#0B0B0A]/60 backdrop-blur-xl border border-white/[0.14] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#FF5533] font-semibold">{ch.kind}</span>
                    <span className="text-zinc-400">{ch.project?.timeline}</span>
                  </div>

                  <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.92]">
                    {ch.project?.shortName || ch.title}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {ch.summary}
                  </p>

                  {/* Fact Bullet Strip */}
                  <ul className="space-y-2 border-l-2 border-[#FF5533] pl-3 py-0.5 text-xs text-zinc-400 font-sans">
                    {ch.facts?.map((f, fIdx) => (
                      <li key={fIdx} className="leading-snug text-zinc-300">
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ch.tech?.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-white/10 bg-white/[0.03] text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Know More Action */}
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/projects/${ch.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#FF5533] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0B0B0A] hover:scale-105 hover:gap-3 transition-all shadow-[0_0_20px_rgba(255,85,51,0.25)]"
                    >
                      <span>Know more</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    {ch.project?.liveUrl && (
                      <a
                        href={ch.project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                      >
                        <span>Live</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};
