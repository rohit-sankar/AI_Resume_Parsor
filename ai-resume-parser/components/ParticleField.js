"use client";

import { useEffect, useRef } from "react";

// Lightweight canvas particle field — avoids heavy WebGL cost for ambient dots.
export default function ParticleField({ count = 60, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles, raf;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.5 + 0.2,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * devicePixelRatio;
      mouse.y = (e.clientY - rect.top) * devicePixelRatio;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - dist / (200 * devicePixelRatio));
        p.x += p.vx + dx * force * 0.002;
        p.y += p.vy + dy * force * 0.002;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
