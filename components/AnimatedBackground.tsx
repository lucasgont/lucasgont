"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Init nodes
        const nodeCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
        nodesRef.current = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouse);

        const connectionDist = 150;
        const mouseDist = 200;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const nodes = nodesRef.current;
            const mouse = mouseRef.current;

            // Update & draw nodes
            for (const node of nodes) {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Mouse repulsion
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseDist && dist > 0) {
                    const force = (mouseDist - dist) / mouseDist * 0.02;
                    node.vx += (dx / dist) * force;
                    node.vy += (dy / dist) * force;
                }

                // Damping
                node.vx *= 0.999;
                node.vy *= 0.999;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity * 0.6})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw mouse connections
            for (const node of nodes) {
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseDist) {
                    const alpha = (1 - dist / mouseDist) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, [mounted]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0d1117] via-nx-bg to-[#080a0e]" />

            {/* Animated grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Canvas network */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Scanning line */}
            <div
                className="absolute left-0 right-0 h-0.5 animate-scan-line"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.08), transparent)",
                }}
            />

            {/* Ambient glow spots */}
            <div
                className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full animate-float"
                style={{
                    background: "radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full animate-float"
                style={{
                    background: "radial-gradient(circle, rgba(255, 51, 68, 0.02) 0%, transparent 70%)",
                    animationDelay: "3s",
                }}
            />

            {/* Noise grain */}
            <div className="absolute inset-0 noise-overlay opacity-[0.025]" />

            {/* Scanlines */}
            <div className="absolute inset-0 scanlines opacity-[0.03]" />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.7) 100%)",
                }}
            />
        </div>
    );
}
