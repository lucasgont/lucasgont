"use client";

import { useEffect, useRef } from "react";
import styles from "./Background.module.css";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let tick = 0;
    let startTime = Date.now();
    const totalDurationMs = 8000; // 8 second total
    const animationDurationMs = 6000; // Animation runs for 6 seconds

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function frame() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── Check if duration has passed ──
      const elapsed = Date.now() - startTime;

      // ── Drifting grid ──
      const gs = 52;
      const drift = (tick * 0.2) % gs;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.022)";
      ctx.lineWidth = 1;
      for (let x = (drift % gs) - gs; x < W + gs; x += gs) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, H);
      }
      for (let y = (drift % gs) - gs; y < H + gs; y += gs) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(W, Math.round(y) + 0.5);
      }
      ctx.stroke();

      // ── Sweep line (only during first 6 seconds) ──
      if (elapsed < animationDurationMs) {
        const period = 720; // ticks per full sweep
        const scanY = ((tick % period) / period) * (H + 140) - 70;
        const sg = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
        sg.addColorStop(0,    "rgba(255,255,255,0)");
        sg.addColorStop(0.35, "rgba(255,255,255,0.007)");
        sg.addColorStop(0.5,  "rgba(255,255,255,0.032)");
        sg.addColorStop(0.65, "rgba(255,255,255,0.007)");
        sg.addColorStop(1,    "rgba(255,255,255,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, scanY - 60, W, 120);
      }

      // ── Vignette ──
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Only increment tick during the first 6 seconds ──
      if (elapsed < animationDurationMs) {
        tick++;
      }
      raf = requestAnimationFrame(frame);
    }

    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={styles.canvas}
    />
  );
}
