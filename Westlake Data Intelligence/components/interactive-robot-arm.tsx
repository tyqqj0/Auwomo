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
  const mouseRawRef = useRef({ clientX: 0, clientY: 0, isActive: false, isPressed: false });

  // Current interpolated position of the end effector (in Canvas Space)
  const currentRef = useRef({ x: 0, y: 0 });

  // Gripper State (0 = Open, 1 = Closed)
  const gripperStateRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Arm Configuration - EVEN LARGER
    const segments: ArmSegment[] = [
      { length: 420, angle: -Math.PI / 2, width: 80 }, // Massive Upper Arm
      { length: 340, angle: 0.5, width: 60 },          // Heavy Forearm
      { length: 180, angle: -0.5, width: 40 },         // Hand/Wrist Base
    ];

    const basePosition: Point = { x: 0, y: 0 };

    const getColors = () => {
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches);
      return {
        fill: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(37, 99, 235, 0.02)",
        skeleton: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(37, 99, 235, 0.18)",
        jointOuter: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(37, 99, 235, 0.08)",
        jointInner: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(37, 99, 235, 0.8)",
        accent: isDark ? "rgba(34, 211, 238, 0.9)" : "rgba(8, 145, 178, 0.9)",
        claw: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(37, 99, 235, 0.1)", // Claw body
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Position base
      if (width > 768) {
        basePosition.x = width * 0.85;
        basePosition.y = height + 80;
      } else {
        basePosition.x = width * 0.5;
        basePosition.y = height + 80;
      }

      if (!mouseRawRef.current.isActive) {
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

    const handleMouseDown = () => {
      mouseRawRef.current.isPressed = true;
    };

    const handleMouseUp = () => {
      mouseRawRef.current.isPressed = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

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

          const stiffness = 0.04;
          angleDiff *= stiffness;

          segments[i].angle += angleDiff;

          let jx = pivot.x;
          let jy = pivot.y;
          for (let k = i; k < segments.length; k++) {
            jx += Math.cos(segments[k].angle) * segments[k].length;
            jy += Math.sin(segments[k].angle) * segments[k].length;
            joints[k + 1] = { x: jx, y: jy };
          }
        }
      }
    };

    // --- Drawing Helpers ---

    const drawClaw = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, colors: any, scale: number = 1.0, gripAmount: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Claw Base (Symmetric Hub)
      ctx.beginPath();
      // Draw a techy rectangle/box base
      ctx.roundRect(-20, -30, 40, 60, 5);
      ctx.fillStyle = colors.claw;
      ctx.fill();
      ctx.strokeStyle = colors.skeleton;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw 2 SYMMETRIC Fingers (Top and Bottom)
      // gripAmount: 0 = Open, 1 = Closed

      // Top Finger (rotates down to close)
      // Open angle: -0.6 rad, Closed angle: -0.1 rad
      const topAngle = -0.6 + (0.5 * gripAmount);
      drawFinger(ctx, topAngle, 1, colors);

      // Bottom Finger (rotates up to close)
      // Open angle: 0.6 rad, Closed angle: 0.1 rad
      const bottomAngle = 0.6 - (0.5 * gripAmount);
      drawFinger(ctx, bottomAngle, -1, colors);

      // Center Laser/Sensor Eye
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.fill();
      ctx.shadowBlur = 15 + (gripAmount * 20); // Glows brighter when gripping
      ctx.shadowColor = colors.accent;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Energy Field between fingers when gripping
      if (gripAmount > 0.5) {
        ctx.beginPath();
        ctx.moveTo(30, -10);
        ctx.lineTo(30, 10);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = gripAmount * 2;
        ctx.globalAlpha = gripAmount * 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
    };

    const drawFinger = (ctx: CanvasRenderingContext2D, rotation: number, mirror: number, colors: any) => {
      ctx.save();
      // Mirror: 1 for Top, -1 for Bottom (but actually just handling Y flip via rotation is easier if symmetric)
      // Actually we just rotate. 
      // Pivot point is at (0, 15*mirror) roughly, let's say (10, 20) and (10, -20)

      const pivotY = 20 * (rotation < 0 ? -1 : 1);
      // Or simply:
      // Translate to pivot point on the hub
      const py = rotation < 0 ? -25 : 25;
      ctx.translate(0, py);
      ctx.rotate(rotation);

      // Finger Segment 1 (Base)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(60, 0);
      ctx.lineTo(50, 15 * (rotation < 0 ? 1 : -1)); // Taper inward
      ctx.lineTo(10, 15 * (rotation < 0 ? 1 : -1));
      ctx.closePath();
      ctx.fillStyle = colors.claw;
      ctx.fill();
      ctx.strokeStyle = colors.skeleton;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Finger Segment 2 (Tip) - Hinged at end of Segment 1
      ctx.translate(60, 0);
      // Angle tip inwards slightly always
      ctx.rotate(rotation < 0 ? 0.5 : -0.5);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(50, 0); // Sharp tip
      ctx.lineTo(40, 10 * (rotation < 0 ? 1 : -1));
      ctx.lineTo(0, 10 * (rotation < 0 ? 1 : -1));
      ctx.closePath();
      ctx.fillStyle = colors.claw;
      ctx.fill();
      ctx.strokeStyle = colors.skeleton;
      ctx.stroke();

      // Glowing Pad
      ctx.beginPath();
      ctx.arc(45, 3 * (rotation < 0 ? 1 : -1), 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      time += 0.01;
      const colors = getColors();
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update Gripper State
      const targetGrip = mouseRawRef.current.isPressed ? 1.0 : 0.0;
      // Smooth transition
      gripperStateRef.current += (targetGrip - gripperStateRef.current) * 0.2;

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

      // Interpolate (Mass/Inertia)
      const ease = 0.05;
      currentRef.current.x += (targetX - currentRef.current.x) * ease;
      currentRef.current.y += (targetY - currentRef.current.y) * ease;

      // Physics
      updateIK(currentRef.current.x, currentRef.current.y);

      // Draw
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
        const end = joints[i + 1];

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
        const end = joints[i + 1];

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

      // Layer 4: THE CLAW (End Effector)
      const end = joints[joints.length - 1];
      const lastAngle = segments[segments.length - 1].angle;

      // Draw the SYMMETRIC claw
      drawClaw(ctx, end.x, end.y, lastAngle, colors, 1.3, gripperStateRef.current);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
