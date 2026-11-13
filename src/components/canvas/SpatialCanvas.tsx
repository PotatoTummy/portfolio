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
}) => {
  const mountRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on mobile/touch screens to preserve 60 FPS and battery
    if (typeof window === "undefined" || window.innerWidth < 840) return;

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
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // Ambient floating star/depth particles in cyan and ice white
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = Math.random() * 0.8 + 0.4;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    onResize();
    window.addEventListener("resize", onResize);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-300"
      style={{ opacity: Math.max(0, 0.6 - heroProgress * 0.8) }}
      aria-hidden="true"
    />
  );
};
