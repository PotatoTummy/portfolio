"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface SpatialCanvasProps {
  heroProgress?: number;
  approachProgress?: number;
  approachStep?: number;
  approachStepProgress?: number;
}

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({
  heroProgress = 0,
  approachProgress = 0,
  approachStep = 0,
  approachStepProgress = 0,
}) => {
  const mountRef = useRef<HTMLCanvasElement | null>(null);

  // References to keep latest progress in animation loop without re-triggering effects
  const progressRef = useRef({
    hero: heroProgress,
    approach: approachProgress,
    step: approachStep,
    stepProg: approachStepProgress,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    progressRef.current.hero = heroProgress;
    progressRef.current.approach = approachProgress;
    progressRef.current.step = approachStep;
    progressRef.current.stepProg = approachStepProgress;
  }, [heroProgress, approachProgress, approachStep, approachStepProgress]);

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
    } catch (e) {
      console.warn("WebGL initialization failed", e);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9.5);
    scene.add(camera);

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.25);
    dirLight.position.set(-4, 6, 6);
    scene.add(dirLight);

    const redRimLight = new THREE.PointLight(0xff5533, 2.4, 40);
    redRimLight.position.set(3.5, 2, 4);
    camera.add(redRimLight);

    const metalMaterial = (color = 0x222220) =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.88,
        roughness: 0.28,
      });

    // Helper: Rounded Rectangle for 2D Canvas Textures
    const drawRoundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    };

    // Helper: Dynamic Canvas Texture
    const makeCanvasTexture = (
      width: number,
      height: number,
      roundRadius: number,
      drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    ) => {
      const cv = document.createElement("canvas");
      cv.width = width;
      cv.height = height;
      const ctx = cv.getContext("2d");
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;

      return {
        tex,
        update() {
          if (!ctx) return;
          ctx.clearRect(0, 0, width, height);
          ctx.save();
          drawRoundRect(ctx, 0, 0, width, height, roundRadius);
          ctx.clip();
          drawFn(ctx, width, height);
          ctx.restore();
          tex.needsUpdate = true;
        },
      };
    };

    // Modelled Phone with rounded bevels and camera lenses
    const createPhone = (drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) => {
      const w = 1.15, h = 2.35, d = 0.1, r = 0.22;
      const shape = new THREE.Shape();
      shape.moveTo(-w / 2 + r, -h / 2);
      shape.lineTo(w / 2 - r, -h / 2);
      shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      shape.lineTo(w / 2, h / 2 - r);
      shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      shape.lineTo(-w / 2 + r, h / 2);
      shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      shape.lineTo(-w / 2, -h / 2 + r);
      shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: d,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.024,
        bevelThickness: 0.024,
        curveSegments: 16,
      });
      geo.translate(0, 0, -d / 2);

      const group = new THREE.Group();
      group.add(new THREE.Mesh(geo, metalMaterial()));

      const screenData = makeCanvasTexture(280, 580, 36, drawFn);
      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w - 0.1, h - 0.1),
        new THREE.MeshBasicMaterial({ map: screenData.tex, transparent: true })
      );
      screenMesh.position.z = d / 2 + 0.026;
      group.add(screenMesh);

      [[-0.28, 0.88], [-0.28, 0.62]].forEach((pos) => {
        const lens = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24),
          metalMaterial(0x0c0c0b)
        );
        lens.rotation.x = Math.PI / 2;
        lens.position.set(pos[0], pos[1], -d / 2 - 0.03);
        group.add(lens);
      });

      return { group, screen: screenData };
    };

    // Modelled Laptop with keyboard deck, hinged display, and screen
    const createLaptop = (drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) => {
      const group = new THREE.Group();

      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.09, 1.95), metalMaterial());
      group.add(baseMesh);

      const kbCanvas = document.createElement("canvas");
      kbCanvas.width = 520;
      kbCanvas.height = 240;
      const kCtx = kbCanvas.getContext("2d");
      if (kCtx) {
        kCtx.fillStyle = "#181817";
        kCtx.fillRect(0, 0, 520, 240);
        kCtx.fillStyle = "#2a2a28";
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 14; c++) {
            drawRoundRect(kCtx, 8 + c * 36.5, 8 + r * 30, 32, 26, 4);
            kCtx.fill();
          }
        }
        kCtx.fillStyle = "#222220";
        drawRoundRect(kCtx, 190, 172, 140, 60, 6);
        kCtx.fill();
      }

      const kbTexture = new THREE.CanvasTexture(kbCanvas);
      const deck = new THREE.Mesh(
        new THREE.PlaneGeometry(2.65, 1.2),
        new THREE.MeshStandardMaterial({ map: kbTexture, roughness: 0.6, metalness: 0.25 })
      );
      deck.rotation.x = -Math.PI / 2;
      deck.position.set(0, 0.048, 0.25);
      group.add(deck);

      const hinge = new THREE.Group();
      hinge.position.set(0, 0.046, -0.96);
      group.add(hinge);

      const lidGeo = new THREE.BoxGeometry(2.95, 1.88, 0.07);
      lidGeo.translate(0, 0.94, 0);
      hinge.add(new THREE.Mesh(lidGeo, metalMaterial()));

      const screenData = makeCanvasTexture(620, 380, 8, drawFn);
      const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.74, 1.66),
        new THREE.MeshBasicMaterial({ map: screenData.tex, transparent: true })
      );
      screenMesh.position.set(0, 0.94, 0.038);
      hinge.add(screenMesh);

      return {
        group,
        screen: screenData,
        setLidOpen: (angleProgress: number) => {
          const clamped = Math.min(1, Math.max(0, angleProgress));
          const eased = clamped * clamped * (3 - 2 * clamped);
          hinge.rotation.x = Math.PI / 2 + (-0.24 - Math.PI / 2) * eased;
        },
      };
    };

    // Hero Rigs: Laptop + Phone
    const heroGroup = new THREE.Group();
    const heroLaptop = createLaptop((ctx, w, h) => {
      ctx.fillStyle = "#0D0D0C";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#161615";
      ctx.fillRect(0, 0, w * 0.18, h);
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i === 1 ? "#FF5533" : "rgba(255, 255, 255, 0.15)";
        drawRoundRect(ctx, 16, 60 + i * 32, w * 0.18 - 32, 12, 4);
        ctx.fill();
      }
      ctx.fillStyle = "#F3F3EE";
      ctx.font = "600 18px sans-serif";
      ctx.fillText("Nestys Seller Central", w * 0.22, 38);
    });
    heroLaptop.group.position.set(-0.5, -0.5, 0);
    heroLaptop.group.scale.setScalar(1.05);
    heroLaptop.setLidOpen(1);
    heroGroup.add(heroLaptop.group);

    const heroPhone = createPhone((ctx, w, h) => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w * 0.7, h);
      grad.addColorStop(0, "#FF5533");
      grad.addColorStop(1, "#0B0B0A");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });
    heroPhone.group.position.set(1.95, -0.3, 0.9);
    heroPhone.group.rotation.y = -0.35;
    heroPhone.group.scale.setScalar(0.85);
    heroGroup.add(heroPhone.group);
    scene.add(heroGroup);

    // Approach Rig: Center Laptop that dollies into screen
    const approachGroup = new THREE.Group();
    const approachLaptop = createLaptop((ctx, w, h) => {
      const step = progressRef.current.step;
      const tp = progressRef.current.stepProg;

      ctx.fillStyle = "#0B0B0A";
      ctx.fillRect(0, 0, w, h);

      if (step === 0) {
        // 01 Architect
        ctx.fillStyle = "#FF5533";
        ctx.font = "13px monospace";
        ctx.fillText("architecture.md", 24, 34);

        const nodes = ["Client", "Gateway", "Queue", "Worker"];
        nodes.forEach((n, idx) => {
          const x = 36 + idx * 138;
          const active = tp > idx / 4;
          ctx.strokeStyle = active ? "#FF5533" : "rgba(255,255,255,0.2)";
          ctx.lineWidth = 2;
          drawRoundRect(ctx, x, 130, 100, 54, 8);
          ctx.stroke();

          ctx.fillStyle = active ? "#FFF" : "rgba(255,255,255,0.4)";
          ctx.font = "600 15px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(n, x + 50, 163);
          ctx.textAlign = "left";
        });
      } else if (step === 1) {
        // 02 Build
        ctx.fillStyle = "#FF5533";
        ctx.font = "13px monospace";
        ctx.fillText("ReelPlayer.tsx", 24, 34);

        const code = [
          "export function ReelPlayer({ feed }: Props) {",
          "  const virtualizer = useVirtual({ size: feed.length })",
          "  const [active, setActive] = useState(0)",
          "  return <VirtualizedFeed rows={virtualizer.rows} targetFps={60} />",
          "}",
        ];
        code.forEach((line, idx) => {
          ctx.fillStyle = idx === 0 || idx === 3 ? "#FF5533" : "#DDD";
          ctx.font = "15px monospace";
          ctx.fillText(line, 24, 76 + idx * 28);
        });
      } else if (step === 2) {
        // 03 Tune
        ctx.fillStyle = "#FF5533";
        ctx.font = "13px monospace";
        ctx.fillText("vitals.config", 24, 34);

        const cx = w / 2, cy = h / 2 + 10;
        ctx.lineWidth = 16;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "#2FD27A";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(cx, cy, 80, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.95 * tp);
        ctx.stroke();

        ctx.fillStyle = "#2FD27A";
        ctx.textAlign = "center";
        ctx.font = "700 52px sans-serif";
        ctx.fillText("95+", cx, cy + 18);
        ctx.textAlign = "left";
      } else {
        // 04 Ship
        ctx.fillStyle = "#FF5533";
        ctx.font = "13px monospace";
        ctx.fillText("deploy.yml", 24, 34);

        if (tp > 0.7) {
          ctx.fillStyle = "#2FD27A";
          ctx.textAlign = "center";
          ctx.font = "600 78px sans-serif";
          ctx.fillText("Live.", w / 2, h / 2 + 60);
          ctx.textAlign = "left";
        }
      }
    });

    approachLaptop.group.position.set(0, -0.5, 0);
    approachLaptop.group.scale.setScalar(1.22);
    approachGroup.add(approachLaptop.group);
    scene.add(approachGroup);
    approachGroup.visible = false;

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      progressRef.current.mouseX = e.clientX / window.innerWidth - 0.5;
      progressRef.current.mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Main RAF Loop
    let animationFrameId: number;
    let clockTime = 0;
    let frame = 0;

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      clockTime += 0.016;
      frame++;
      const shouldDraw = frame % 2 === 0;

      const hp = progressRef.current.hero;
      const ap = progressRef.current.approach;
      const mx = progressRef.current.mouseX;
      const my = progressRef.current.mouseY;
      const isDesktop = window.innerWidth > 820;

      // Dolly portal camera calculation
      const clampedDolly = Math.min(1, Math.max(0, (ap - 0.78) / 0.22));
      const dollyEased = clampedDolly * clampedDolly * (3 - 2 * clampedDolly);

      camera.position.x += (mx * 1.05 * (1 - dollyEased) - camera.position.x) * 0.06;
      camera.position.y = -my * 0.45 * (1 - dollyEased) + dollyEased * 0.52;
      camera.position.z = 9.5 * (1 - dollyEased) + 4.0 * dollyEased;
      camera.lookAt(0, dollyEased * 0.52, 0);

      // Hero Rigs
      const isHeroVis = hp < 0.99;
      heroGroup.visible = isHeroVis;
      if (isHeroVis) {
        heroGroup.position.set(0, (isDesktop ? 1.2 : 1.85) + hp * 3.4, -hp * 2.8);
        heroGroup.scale.setScalar((isDesktop ? 1 : 0.65) * (1 - hp * 0.25));
        heroGroup.rotation.y = -0.2 + hp * 1.35 + Math.sin(clockTime * 0.6) * 0.05;
        heroGroup.rotation.x = 0.08 + my * 0.16;
        heroGroup.rotation.z = mx * 0.04;
        heroGroup.position.y += Math.sin(clockTime * 0.9) * 0.06;

        if (shouldDraw) {
          heroLaptop.screen.update();
          heroPhone.screen.update();
        }
      }

      // Approach Rig
      const isAppVis = ap > 0.01 && ap < 0.99;
      approachGroup.visible = isAppVis;
      if (isAppVis) {
        approachGroup.position.set(0, isDesktop ? -0.1 : 0.25, 0);
        approachGroup.scale.setScalar(isDesktop ? 1 : 0.72);
        approachGroup.rotation.y = -0.15 + Math.sin(ap * 5) * 0.1;
        approachGroup.rotation.x = 0.06 + my * 0.15;
        approachGroup.rotation.z = mx * 0.03;
        approachLaptop.setLidOpen(Math.min(1, ap * 8));

        if (shouldDraw) {
          approachLaptop.screen.update();
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none block" aria-hidden="true" />;
};
