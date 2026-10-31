"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const SpatialCanvas: React.FC = () => {
  const mountRef = useRef<HTMLCanvasElement | null>(null);

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

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0a, 0.03);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 140);
    scene.add(camera);

    // Dynamic Lights
    const accentLight = new THREE.PointLight(0xff5533, 2.5, 40);
    accentLight.position.set(3, 2, 4);
    camera.add(accentLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(-5, 8, 6);
    const dirLight2 = new THREE.DirectionalLight(0xffeedd, 0.6);
    dirLight2.position.set(6, -3, -5);
    scene.add(dirLight1, dirLight2, new THREE.AmbientLight(0xffffff, 0.45));

    // Star Constellation Field
    const starCount = 1400;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starCoords[i * 3] = (Math.random() - 0.5) * 50;
      starCoords[i * 3 + 1] = Math.random() * -120 + 10;
      starCoords[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xf3f3ee,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Shared Materials
    const stdMat = (color: number, metal = 0.75, rough = 0.25) =>
      new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });
    const wireMat = (color: number, opacity = 0.4) =>
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
    const lineMat = (color: number, opacity = 0.3) =>
      new THREE.LineBasicMaterial({ color, transparent: true, opacity });

    // Scene Chapters Groups
    const chapters: { group: THREE.Group; update: (progress: number, t: number) => void }[] = [];
    const SPACING = 14;

    // 0. Hero: Solid knot wrapped in electric wireframe
    {
      const group = new THREE.Group();
      const knotGeo = new THREE.TorusKnotGeometry(1.5, 0.42, 200, 24, 2, 3);
      const solidMesh = new THREE.Mesh(knotGeo, stdMat(0x181816, 0.9, 0.2));
      const wireMesh = new THREE.Mesh(knotGeo, wireMat(0xff5533, 0.65));
      wireMesh.scale.setScalar(1.02);
      group.add(solidMesh, wireMesh);
      chapters.push({
        group,
        update: (lp, t) => {
          group.rotation.set(t * 0.15 + lp * 2.2, t * 0.22 + lp * 1.5, 0);
        },
      });
    }

    // 1. Nestys: Distributed Microservices Network Graph
    {
      const group = new THREE.Group();
      const N = 14;
      const R = 2.4;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = i * 2.39996;
        pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(R));
      }
      const nodes = pts.map((p) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 18), stdMat(0xf3f3ee, 0.3, 0.4));
        mesh.position.copy(p);
        group.add(mesh);
        return mesh;
      });
      const linePts: THREE.Vector3[] = [];
      pts.forEach((a, i) =>
        pts.forEach((b, j) => {
          if (j > i && a.distanceTo(b) < 2.6) linePts.push(a, b);
        })
      );
      group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePts), lineMat(0xf3f3ee, 0.25)));
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 1), stdMat(0xff5533, 0.5, 0.25));
      group.add(core);

      chapters.push({
        group,
        update: (lp, t) => {
          group.rotation.y = t * 0.12 + lp * 4;
          group.rotation.x = 0.25;
          core.rotation.y = t * 0.8;
          nodes.forEach((m, i) => {
            const on = (lp * 1.5 * N) > i;
            m.scale.setScalar(on ? 1.5 + Math.sin(t * 3 + i) * 0.2 : 1);
            m.material.color.setHex(on ? 0xff5533 : 0xf3f3ee);
          });
        },
      });
    }

    // 2. Scrollr: Ascending Film Reel Helix
    {
      const group = new THREE.Group();
      const F = 8;
      const frames: THREE.Mesh[] = [];
      const pal = [0xff5533, 0x2b6cff, 0x18c38a, 0xf5b700, 0xb04dff];
      const planeGeo = new THREE.PlaneGeometry(1.1, 1.8);
      const edgeGeo = new THREE.EdgesGeometry(planeGeo);
      for (let i = 0; i < F; i++) {
        const m = new THREE.Mesh(
          planeGeo,
          new THREE.MeshBasicMaterial({ color: pal[i % 5], transparent: true, opacity: 0.65, side: THREE.DoubleSide })
        );
        m.add(new THREE.LineSegments(edgeGeo, lineMat(0xf3f3ee, 0.8)));
        group.add(m);
        frames.push(m);
      }
      chapters.push({
        group,
        update: (lp, t) => {
          frames.forEach((m, i) => {
            const a = i * 0.78 + lp * Math.PI * 3 + t * 0.1;
            m.position.set(Math.cos(a) * 2.4, (i - (F - 1) / 2) * 0.65, Math.sin(a) * 2.4);
            m.rotation.y = -a + Math.PI / 2;
            m.rotation.z = Math.sin(a) * 0.1;
          });
        },
      });
    }

    // 3. WoKataa: Dual Clashing Orbital Rings
    {
      const group = new THREE.Group();
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(2, 0.05, 16, 120), stdMat(0xf3f3ee, 0.6, 0.3));
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(2, 0.05, 16, 120), stdMat(0x18c38a, 0.6, 0.3));
      const r3 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.03, 16, 80), stdMat(0xff5533, 0.6, 0.3));
      const t1 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), stdMat(0x18c38a, 0.4, 0.2));
      const t2 = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), stdMat(0xff5533, 0.4, 0.2));
      group.add(r1, r2, r3, t1, t2);

      chapters.push({
        group,
        update: (lp, t) => {
          r1.rotation.set(lp * Math.PI * 2 + t * 0.2, 0, 0);
          r2.rotation.set(0, lp * Math.PI * 2 + t * 0.2, Math.PI / 2);
          r3.rotation.set(t * 0.3, t * 0.2, lp * 5);
          const q = lp * Math.PI * 4;
          t1.position.set(Math.cos(q) * 2, Math.sin(q) * 2, 0);
          t2.position.set(-Math.cos(q) * 2, 0, Math.sin(q) * 2);
        },
      });
    }

    // 4. Earth Air: Kinetic Airflow Vortex
    {
      const group = new THREE.Group();
      const nPts = 1600;
      const pCoords = new Float32Array(nPts * 3);
      const orbitData = Array.from({ length: nPts }, () => ({
        a: Math.random() * Math.PI * 2,
        r: 0.6 + Math.random() * 2.6,
        h: (Math.random() - 0.5) * 4.2,
        speed: 0.3 + Math.random() * 0.8,
      }));
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pCoords, 3));
      group.add(
        new THREE.Points(
          pGeo,
          new THREE.PointsMaterial({
            size: 0.045,
            color: 0xf5b700,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
      const turbineCore = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32), stdMat(0xf5b700, 0.5, 0.2));
      turbineCore.rotation.x = Math.PI / 2;
      group.add(turbineCore);

      chapters.push({
        group,
        update: (lp, t) => {
          const sp = 0.3 + lp * 2;
          orbitData.forEach((o, i) => {
            const a = o.a + t * o.speed * sp;
            const r = o.r * (0.6 + 0.4 * Math.sin(o.h * 0.7 + t * 0.4));
            pCoords[i * 3] = Math.cos(a) * r;
            pCoords[i * 3 + 1] = o.h + Math.sin(a * 2) * 0.15;
            pCoords[i * 3 + 2] = Math.sin(a) * r - o.h * 0.2;
          });
          pGeo.attributes.position.needsUpdate = true;
          group.rotation.x = 0.8;
          turbineCore.rotation.z = t * 3;
        },
      });
    }

    // 5. UrbanArena: 3D Multi-Tenant Venue Grid
    {
      const group = new THREE.Group();
      const G = 6;
      const boxes: THREE.Mesh[] = [];
      const boxGeo = new THREE.BoxGeometry(0.6, 1, 0.6);
      for (let x = 0; x < G; x++) {
        for (let z = 0; z < G; z++) {
          const isHot = (x * 7 + z * 3) % 9 === 0;
          const m = new THREE.Mesh(boxGeo, stdMat(isHot ? 0xb04dff : 0x222220, isHot ? 0.4 : 0.8, 0.35));
          m.userData = { x, z, h: 0.5 + ((x * 5 + z * 3) % 7) * 0.28 };
          m.add(new THREE.LineSegments(new THREE.EdgesGeometry(boxGeo), lineMat(0xf3f3ee, 0.2)));
          group.add(m);
          boxes.push(m);
        }
      }
      chapters.push({
        group,
        update: (lp, t) => {
          boxes.forEach((m) => {
            const { x, z, h } = m.userData;
            const s = Math.max(0.04, Math.sin(lp * 3 + (x + z) * 0.3) * h + Math.sin(t + x + z) * 0.12);
            m.scale.y = Math.abs(s);
            m.position.set((x - 2.5) * 0.75, Math.abs(s) / 2 - 1.2, (z - 2.5) * 0.75);
          });
          group.rotation.set(0.45, 0.6 + lp * 1.5, 0);
        },
      });
    }

    // Mount chapters along the descent
    chapters.forEach((c, i) => {
      c.group.position.y = -i * SPACING;
      scene.add(c.group);
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

      chapters.forEach((c, i) => {
        const isCenter = i === 0 || i === chapters.length - 1;
        c.group.position.x = isDesktop && !isCenter ? 3.2 : 0;
        c.group.scale.setScalar(isDesktop ? 1 : 0.65);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / width - 0.5;
      mouseY = e.clientY / height - 0.5;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onMouseMove, { passive: true });
    onResize();

    let targetChapter = 0;
    let currentChapter = 0;
    let lastTime = performance.now();
    let totalTime = 0;
    let animId: number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollPct = scrollY / totalScrollable;
      targetChapter = scrollPct * (chapters.length - 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      totalTime += dt;

      currentChapter += (targetChapter - currentChapter) * 0.08;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y = -currentChapter * SPACING - mouseY * 0.6 + 0.2;
      camera.position.z = 9.5;
      camera.lookAt(0, -currentChapter * SPACING, 0);

      chapters.forEach((c, i) => {
        const isNear = Math.abs(currentChapter - i) < 1.3;
        c.group.visible = isNear;
        if (isNear) {
          c.update(Math.max(0, Math.min(1, currentChapter - i + 0.5)), totalTime);
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
    <canvas
      ref={mountRef}
      className="fixed inset-0 h-full w-full pointer-events-none -z-10 block"
      aria-hidden="true"
    />
  );
};

