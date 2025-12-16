"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Vehicle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  history: { x: number; y: number }[]; // For trails
}

export default function InteractiveRoad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Track mouse
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Color definitions
    const colors = {
      // Background grid
      grid: isDark ? "rgba(100, 100, 100, 0.1)" : "rgba(0, 0, 0, 0.03)",
      // The "Road" text color
      roadText: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
      // Lane markings inside the road
      laneLine: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
      carMain: isDark ? "#ffffff" : "#333333",
      carWing: isDark ? "#a1a1aa" : "#666666",
      lkaActive: "#10b981",
      shadow: "rgba(0,0,0,0.2)"
    };

    // Simulation State
    const cars: Vehicle[] = [
      { x: 0, y: 0, angle: 0, speed: 0, color: colors.carMain, history: [] }, // Leader
      { x: 0, y: 0, angle: 0, speed: 0, color: colors.carWing, history: [] }, // Top Wing
      { x: 0, y: 0, angle: 0, speed: 0, color: colors.carWing, history: [] }, // Bottom Wing
    ];

    const resize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;

        // Initial positions centered
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        cars[0].x = cx; cars[0].y = cy;
        cars[1].x = cx - 40; cars[1].y = cy - 40;
        cars[2].x = cx - 40; cars[2].y = cy + 40;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isActive = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- RENDER LOOP ---
    const render = () => {
      time += 0.05;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw Background Grid (Removed as per request)
      /* 
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      */

      // Draw Top Border (Road Edge)
      // ctx.beginPath();
      // ctx.strokeStyle = colors.laneLine; // Use same color as lane lines or slightly stronger
      // ctx.lineWidth = 2;
      // ctx.moveTo(0, 0);
      // ctx.lineTo(canvas.width, 0);
      // ctx.stroke();

      // 2. Draw "AUWOMO" shaped ROAD (Horizontal)
      // Position road in the upper third to sit between image and buttons
      const roadY = canvas.height * 0.25;

      ctx.save();
      ctx.translate(centerX, roadY);

      // Using the text as the "Road Surface"
      // We want it huge, spanning the width roughly
      // Responsive font size: smaller of 1/4 width or 200px (desktop max), but ensuring readability on mobile
      const fontSize = Math.min(Math.max(canvas.width / 5, 50), 160);
      ctx.font = `900 ${fontSize}px sans-serif`; // Heavy weight for "road" feel
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = "AUWOMO";

      // Draw the "Road" (The Text)
      ctx.fillStyle = colors.roadText;
      // Slant it slightly for speed/style? No, keep it clean as requested "fixed lane look"
      ctx.fillText(text, 0, 0);

      // Draw Center Lane Markings *through* the text
      // This makes the text look like the road
      const textMetrics = ctx.measureText(text);
      const roadWidth = textMetrics.width;
      const roadStart = -roadWidth / 2;
      const roadEnd = roadWidth / 2;

      ctx.beginPath();
      ctx.strokeStyle = colors.laneLine;
      ctx.lineWidth = 4;
      ctx.setLineDash([30, 30]); // Dashed line
      ctx.moveTo(roadStart, 0);
      ctx.lineTo(roadEnd, 0);
      ctx.stroke();

      // Draw Top/Bottom boundaries (optional, adds to "Road" feel)
      ctx.lineWidth = 2;
      ctx.setLineDash([]); // Solid
      const roadHeight = fontSize * 0.6; // approx height
      ctx.beginPath();
      ctx.moveTo(roadStart, -roadHeight / 2);
      ctx.lineTo(roadEnd, -roadHeight / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(roadStart, roadHeight / 2);
      ctx.lineTo(roadEnd, roadHeight / 2);
      ctx.stroke();

      ctx.restore();

      // 3. Update Vehicle Physics

      // Determine Target Point
      let targetX = mouseRef.current.isActive ? mouseRef.current.x : centerX;
      let targetY = mouseRef.current.isActive ? mouseRef.current.y : centerY;

      // BOUNDARY CHECK: Prevent cars from going off-road (especially top)
      // We clamp the targetY so the leader car stays within visible area
      // 80px buffer keeps them from hugging the top edge too closely
      const topMargin = 80;
      const bottomMargin = canvas.height - 40;
      targetY = Math.max(topMargin, Math.min(bottomMargin, targetY));

      // MAGNETIC LANE KEEPING (Horizontal Center Line)
      const magnetThreshold = 60; // Pixel distance to trigger magnet vertically
      const laneY = roadY; // Use new road position

      let isMagnetized = false;
      // We check Y distance for horizontal lane keeping
      if (Math.abs(targetY - laneY) < magnetThreshold) {
        targetY = targetY * 0.1 + laneY * 0.9; // Strong pull to center line
        isMagnetized = true;
      }

      // Update Cars
      cars.forEach((car, index) => {
        // Horizontal Formation
        // Leader in front (right side or towards mouse), wings behind
        // But since mouse can be anywhere, we relate to velocity or just fixed offsets relative to leader

        let offsetX = 0;
        let offsetY = 0;

        // Formation: Leader (0), Wing Top (1), Wing Bottom (2)
        // Leader is at mouse
        // Wings trail behind (-x) and to the sides (+/- y)
        if (index === 1) { offsetX = -60; offsetY = -50; }
        if (index === 2) { offsetX = -60; offsetY = 50; }

        // Apply offsets based on car angle? 
        // For simplicity in this "arcade" view, fixed screen offsets work well if we assume "forward" is generally right or towards mouse.
        // But to make it follow nicely, we just add offset to target.

        const destX = targetX + offsetX;
        const destY = targetY + offsetY;

        const lerpFactor = index === 0 ? 0.08 : 0.05;

        const dx = destX - car.x;
        const dy = destY - car.y;

        car.x += dx * lerpFactor;
        car.y += dy * lerpFactor;

        // Calculate Angle
        const moveAngle = Math.atan2(dy, dx);

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          car.angle = moveAngle; // 0 is Right in Canvas, which matches our Horizontal road default
        } else {
          // If stopped, face Right (0)
          // or keep last angle
          // car.angle = 0; 
        }

        // Draw Car
        ctx.save();
        ctx.translate(car.x, car.y);
        ctx.rotate(car.angle);

        // Body
        ctx.fillStyle = isMagnetized && index === 0 ? colors.lkaActive : car.color;
        ctx.shadowColor = isMagnetized && index === 0 ? colors.lkaActive : colors.shadow;
        ctx.shadowBlur = 10;

        // Horizontal Car Shape (facing right)
        ctx.beginPath();
        // x is length, y is width
        ctx.roundRect(-18, -10, 36, 20, 6);
        ctx.fill();

        // Windshield (towards right)
        ctx.fillStyle = isDark ? "#000" : "#222";
        ctx.beginPath();
        ctx.roundRect(2, -8, 10, 16, 2); // Closer to front
        ctx.fill();

        // Tail lights (at left)
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(-18, -8, 3, 6);
        ctx.fillRect(-18, 2, 3, 6);

        // Headlights (at right)
        if (index === 0) {
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 200, 0, 0.15)";
          ctx.beginPath();
          ctx.moveTo(18, -8);
          ctx.lineTo(120, -30); // Beam out
          ctx.lineTo(120, 30);
          ctx.lineTo(18, 8);
          ctx.fill();
        }

        ctx.restore();
      });

      // Draw "LKA Active" Indicator
      if (isMagnetized) {
        ctx.save();
        ctx.translate(cars[0].x, cars[0].y - 40); // Label above car
        ctx.fillStyle = colors.lkaActive;
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText("LKA ACTIVE", 0, 0);

        // Guide line down to car
        ctx.strokeStyle = colors.lkaActive;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(0, 30);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-crosshair">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* 
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/30 pointer-events-none font-mono">
         [HORIZONTAL MODE]
       </div>
       */}
    </div>
  );
}
