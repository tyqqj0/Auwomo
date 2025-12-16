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
}

export default function InteractiveRobotArm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Arm Configuration
    // Base is at fixed position
    // Arm consists of 3 segments
    const segments: ArmSegment[] = [
      { length: 140, angle: -Math.PI / 2 }, // Upper Arm
      { length: 120, angle: 0 },            // Forearm
      { length: 60, angle: 0 },             // Hand/Gripper
    ];

    const basePosition: Point = { x: 0, y: 0 }; // Will be set on resize

    // Theme Colors
    const getColors = () => {
      const isDark = theme === "dark" || (theme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches);
      return {
        background: "transparent",
        primary: isDark ? "#60a5fa" : "#2563eb", // blue-400 / blue-600
        accent: isDark ? "#22d3ee" : "#0891b2", // cyan-400 / cyan-600
        joint: isDark ? "#ffffff" : "#ffffff",
        link: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)",
        linkBorder: isDark ? "#60a5fa" : "#2563eb",
        target: isDark ? "rgba(34, 211, 238, 0.5)" : "rgba(8, 145, 178, 0.5)",
      };
    };

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Position base at bottom center
      basePosition.x = canvas.width / 2;
      basePosition.y = canvas.height * 0.85;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isActive = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Inverse Kinematics (CCD - Cyclic Coordinate Descent)
    const updateIK = (targetX: number, targetY: number) => {
      const tolerance = 1;
      const maxIterations = 5; // Fast enough for real-time
      
      // Calculate current end effector position
      // We need to store joint positions to rotate around them
      // But CCD works backwards from end-effector
      
      for (let iter = 0; iter < maxIterations; iter++) {
        // We simulate the forward kinematics to find joint positions
        // Then iterate backwards from last segment to first
        
        // 1. Calculate all joint positions based on current angles
        let currentX = basePosition.x;
        let currentY = basePosition.y;
        const joints: Point[] = [{ x: currentX, y: currentY }];
        
        for (let i = 0; i < segments.length; i++) {
          currentX += Math.cos(segments[i].angle) * segments[i].length;
          currentY += Math.sin(segments[i].angle) * segments[i].length;
          joints.push({ x: currentX, y: currentY });
        }
        
        const endEffector = joints[joints.length - 1];
        const distToTarget = Math.hypot(targetX - endEffector.x, targetY - endEffector.y);
        if (distToTarget < tolerance) break;
        
        // 2. Iterate backwards
        // Index of the segment we are rotating (last to first)
        for (let i = segments.length - 1; i >= 0; i--) {
          const jointIdx = i; // The pivot point for this segment is joints[i]
          const pivot = joints[jointIdx];
          const effectorIdx = joints.length - 1;
          const effector = joints[effectorIdx];
          
          // Vector from pivot to effector
          const vToEffector = { x: effector.x - pivot.x, y: effector.y - pivot.y };
          // Vector from pivot to target
          const vToTarget = { x: targetX - pivot.x, y: targetY - pivot.y };
          
          const angleToEffector = Math.atan2(vToEffector.y, vToEffector.x);
          const angleToTarget = Math.atan2(vToTarget.y, vToTarget.x);
          
          // Rotate the segment by the difference
          let angleDiff = angleToTarget - angleToEffector;
          
          // Normalize angle
          while (angleDiff <= -Math.PI) angleDiff += 2 * Math.PI;
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          
          // Apply rotation with limit (damping) for smoothness
          const maxRotation = 0.15; // Speed limit
          angleDiff = Math.max(-maxRotation, Math.min(maxRotation, angleDiff));
          
          segments[i].angle += angleDiff;
          
          // Constraint checking (Optional: limit joint angles)
          // For base joint (i=0), limit to upper hemisphere (-PI to 0) roughly
          if (i === 0) {
             // Keep it roughly pointing up
             // segments[i].angle = Math.max(-Math.PI + 0.2, Math.min(-0.2, segments[i].angle));
          }
          
          // Recalculate end effector for next iteration step (optional but better for CCD)
          // For simplicity in simple JS, we just update the angle and let next frame/iteration handle full recalculation
          // Or we can quickly update just the 'joints' array if we want 100% correct single-pass CCD
          
          // Quick update of downstream joints for the next loop iteration (crucial for CCD)
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
      const colors = getColors();
      
      // Target
      let targetX = mouseRef.current.isActive ? mouseRef.current.x : canvas.width / 2;
      let targetY = mouseRef.current.isActive ? mouseRef.current.y : canvas.height / 3;
      
      // Smoothly interpolate target for less jitter
      // (Simplified: just using mouse pos directly in updateIK for responsiveness)
      
      updateIK(targetX, targetY);

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate final joint positions
      let currentX = basePosition.x;
      let currentY = basePosition.y;
      const joints: Point[] = [{ x: currentX, y: currentY }];
      
      for (let i = 0; i < segments.length; i++) {
        currentX += Math.cos(segments[i].angle) * segments[i].length;
        currentY += Math.sin(segments[i].angle) * segments[i].length;
        joints.push({ x: currentX, y: currentY });
      }

      // Draw Base
      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(basePosition.x, basePosition.y + 10, 20, Math.PI, 0); // Semicircle base
      ctx.fill();

      // Draw Segments
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < segments.length; i++) {
        const start = joints[i];
        const end = joints[i+1];
        
        // Link Body
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = colors.linkBorder;
        ctx.lineWidth = 14 - i * 2; // Tapering width
        ctx.stroke();
        
        // Inner Glow/Fill
        ctx.strokeStyle = colors.link;
        ctx.lineWidth = 10 - i * 2;
        ctx.stroke();
      }

      // Draw Joints
      joints.forEach((joint, idx) => {
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, 6 - idx, 0, Math.PI * 2);
        ctx.fillStyle = colors.joint;
        ctx.fill();
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw End Effector (Gripper)
      const end = joints[joints.length - 1];
      const lastAngle = segments[segments.length - 1].angle;
      
      ctx.save();
      ctx.translate(end.x, end.y);
      ctx.rotate(lastAngle);
      
      // Gripper claws
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 3;
      
      // Claw 1
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(15, -10);
      ctx.lineTo(25, -5);
      ctx.stroke();
      
      // Claw 2
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(15, 10);
      ctx.lineTo(25, 5);
      ctx.stroke();
      
      // Data Particles (Visual Flair)
      // Draw a line from gripper to mouse if close
      ctx.restore();
      
      // Target Reticle
      if (mouseRef.current.isActive) {
        ctx.beginPath();
        ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
        ctx.strokeStyle = colors.target;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(targetX, targetY, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.fill();
        
        // Dashed line from effector to target
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = colors.target;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
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
    <div ref={containerRef} className="w-full h-full relative overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

