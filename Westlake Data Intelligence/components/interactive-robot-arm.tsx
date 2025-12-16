"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

interface ArmSegment {
  length: number;
  angle: number;
  width: number;
}

export default function InteractiveRobotArm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Store RAW mouse position (screen coordinates)
  // This allows us to re-calculate relative position even if the canvas scrolls/moves
  const mouseRawRef = useRef({ clientX: 0, clientY: 0, isActive: false });
  
  // Current interpolated position of the end effector (in Canvas Space)
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0; 

    // Arm Configuration - LARGE scale
    // Tuned for a "Giant" feel
    const segments: ArmSegment[] = [
      { length: 400, angle: -Math.PI / 2, width: 70 }, // Huge Upper Arm
      { length: 320, angle: 0.5, width: 50 },          // Huge Forearm
      { length: 160, angle: -0.5, width: 35 },         // Hand
    ];

    const basePosition: Point = { x: 0, y: 0 };

    const getColors = () => {
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches);
      return {
        fill: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(37, 99, 235, 0.02)", 
        skeleton: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(37, 99, 235, 0.15)",
        jointOuter: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(37, 99, 235, 0.08)",
        jointInner: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(37, 99, 235, 0.8)",
        accent: isDark ? "rgba(34, 211, 238, 0.8)" : "rgba(8, 145, 178, 0.8)",
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Position base using window height to ensure it's visible even if container is huge
      // But we need it in Canvas coordinates.
      // If container is 100vh, then container.clientHeight ~= window.innerHeight.
      
      // Robust positioning: Anchor to bottom-right of the CONTAINER
      // assuming container is properly sized to the hero section.
      
      if (width > 768) {
          basePosition.x = width * 0.85; 
          basePosition.y = height + 50; // Just slightly off screen bottom
      } else {
          basePosition.x = width * 0.5;
          basePosition.y = height + 50;
      }
      
      if (!mouseRawRef.current.isActive) {
         // Default target if no mouse interaction yet
         // Map a virtual "center" client position to canvas
         const rect = canvas.getBoundingClientRect();
         currentRef.current = { 
             x: width * 0.3, 
             y: height * 0.4 
         };
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRawRef.current.clientX = e.clientX;
      mouseRawRef.current.clientY = e.clientY;
      mouseRawRef.current.isActive = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updateIK = (targetX: number, targetY: number) => {
      const maxIterations = 4; 
      
      let currentX = basePosition.x;
      let currentY = basePosition.y;
      const joints: Point[] = [{ x: currentX, y: currentY }];
      
      for (let i = 0; i < segments.length; i++) {
        currentX += Math.cos(segments[i].angle) * segments[i].length;
        currentY += Math.sin(segments[i].angle) * segments[i].length;
        joints.push({ x: currentX, y: currentY });
      }

      for (let iter = 0; iter < maxIterations; iter++) {
        for (let i = segments.length - 1; i >= 0; i--) {
          const pivot = joints[i];
          const effector = joints[joints.length - 1];
          
          const vToEffector = { x: effector.x - pivot.x, y: effector.y - pivot.y };
          const vToTarget = { x: targetX - pivot.x, y: targetY - pivot.y };
          
          const angleToEffector = Math.atan2(vToEffector.y, vToEffector.x);
          const angleToTarget = Math.atan2(vToTarget.y, vToTarget.x);
          
          let angleDiff = angleToTarget - angleToEffector;
          
          while (angleDiff <= -Math.PI) angleDiff += 2 * Math.PI;
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          
          const stiffness = 0.04; // Heavy feel
          angleDiff *= stiffness;

          segments[i].angle += angleDiff;
          
          if (i === 0) {
             // Constrain base to not fall backwards too much
             // segments[i].angle = Math.max(-Math.PI, Math.min(-Math.PI/2 + 0.5, segments[i].angle));
          }

          let jx = pivot.x;
          let jy = pivot.y;
          for (let k = i; k < segments.length; k++) {
             jx += Math.cos(segments[k].angle) * segments[k].length;
             jy += Math.sin(segments[k].angle) * segments[k].length;
             joints[k+1] = { x: jx, y: jy };
          }
        }
      }
    };

    const render = () => {
      time += 0.01;
      const colors = getColors();
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 1. Calculate Target based on latest Client Mouse + Current Canvas Position
      // This fixes the "scroll disconnect" issue
      let targetX = 0;
      let targetY = 0;

      if (mouseRawRef.current.isActive) {
          const rect = canvas.getBoundingClientRect();
          targetX = mouseRawRef.current.clientX - rect.left;
          targetY = mouseRawRef.current.clientY - rect.top;
      } else {
          // Idle Animation Target
          targetX = width * 0.3 + Math.sin(time) * 60;
          targetY = height * 0.45 + Math.cos(time * 0.8) * 40;
      }

      // 2. Interpolate (Mass/Inertia)
      const ease = 0.05;
      currentRef.current.x += (targetX - currentRef.current.x) * ease;
      currentRef.current.y += (targetY - currentRef.current.y) * ease;

      // 3. Physics
      updateIK(currentRef.current.x, currentRef.current.y);

      // 4. Draw
      ctx.clearRect(0, 0, width, height);
      
      let currentX = basePosition.x;
      let currentY = basePosition.y;
      const joints: Point[] = [{ x: currentX, y: currentY }];
      
      for (let i = 0; i < segments.length; i++) {
        currentX += Math.cos(segments[i].angle) * segments[i].length;
        currentY += Math.sin(segments[i].angle) * segments[i].length;
        joints.push({ x: currentX, y: currentY });
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Layer 1: Glass Shell
      for (let i = 0; i < segments.length; i++) {
        const start = joints[i];
        const end = joints[i+1];
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = segments[i].width * 2.5; 
        ctx.strokeStyle = colors.fill; 
        ctx.stroke();
      }

      // Layer 2: Skeleton
      for (let i = 0; i < segments.length; i++) {
        const start = joints[i];
        const end = joints[i+1];

        // Main bone
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.skeleton;
        ctx.stroke();

        // Decorative rails
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dist = Math.hypot(dx, dy);
        const nx = -dy / dist;
        const ny = dx / dist;
        const offset = segments[i].width * 0.5;

        ctx.beginPath();
        ctx.moveTo(start.x + nx * offset, start.y + ny * offset);
        ctx.lineTo(end.x + nx * offset, end.y + ny * offset);
        ctx.strokeStyle = colors.skeleton;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(start.x - nx * offset, start.y - ny * offset);
        ctx.lineTo(end.x - nx * offset, end.y - ny * offset);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Layer 3: Joints
      joints.forEach((joint, idx) => {
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, segments[idx]?.width || 20, 0, Math.PI * 2);
        ctx.fillStyle = colors.jointOuter;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(joint.x, joint.y, (segments[idx]?.width || 20) * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = colors.skeleton;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(joint.x, joint.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors.jointInner;
        ctx.fill();
      });

      // Layer 4: Effector
      const end = joints[joints.length - 1];
      const lastAngle = segments[segments.length - 1].angle;
      
      ctx.save();
      ctx.translate(end.x, end.y);
      ctx.rotate(lastAngle);
      
      // Scanner Ring
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Core Light
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.shadowBlur = 20;
      ctx.shadowColor = colors.accent;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

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
    <div ref={containerRef} className="w-full h-full relative overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
