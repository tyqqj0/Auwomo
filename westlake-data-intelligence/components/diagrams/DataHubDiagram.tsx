"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Car, ScanLine, Box, Globe, Cpu, Database, Network, Sparkles } from "lucide-react";

export function DataHubDiagram() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
    };

    const lineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
    };

    return (
        <div className="w-full h-full min-h-[500px] relative flex items-center justify-center font-mono text-sm select-none p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative w-full max-w-[800px] aspect-[4/3]"
            >
                {/* SVG Layer for Connections - Using 0-100 coordinate system */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="4"
                            markerHeight="4"
                            refX="3.5"
                            refY="2"
                            orient="auto"
                        >
                            <polygon points="0 0, 4 2, 0 4" fill="currentColor" className="text-muted-foreground/30" />
                        </marker>
                    </defs>

                    {/* Top Left to Center */}
                    <motion.path
                        d="M 20 25 V 45 H 33"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />
                    <motion.path
                        d="M 40 28 V 20 H 25"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />

                    {/* Top Right to Center */}
                    <motion.path
                        d="M 80 25 V 45 H 67"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />
                    <motion.path
                        d="M 60 28 V 20 H 75"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />

                    {/* Bottom Left to Center */}
                    <motion.path
                        d="M 20 75 V 55 H 33"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />
                    <motion.path
                        d="M 40 72 V 80 H 25"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />

                    {/* Bottom Right to Center */}
                    <motion.path
                        d="M 80 75 V 55 H 67"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />
                    <motion.path
                        d="M 60 72 V 80 H 75"
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-primary/40"
                        strokeDasharray="1 1"
                        strokeLinejoin="round"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        variants={lineVariants}
                    />
                </svg>

                {/* Central Hub */}
                <motion.div
                    variants={itemVariants}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-background border-2 border-primary/20 rounded-2xl shadow-2xl z-10 flex flex-col items-center justify-center p-6 gap-4 backdrop-blur-xl"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse" />
                    <h3 className="text-xl font-bold tracking-widest z-10">3D 数据中枢</h3>
                    <div className="grid grid-cols-2 gap-3 w-full z-10">
                        <HubItem icon={Network} label="AI 标注" />
                        <HubItem icon={ScanLine} label="自动标注" />
                        <HubItem icon={Box} label="3D 重建" />
                        <HubItem icon={Sparkles} label="生成式 AI" />
                    </div>
                </motion.div>

                {/* Top Left: Vehicle Edge Model */}
                <NodeCard
                    variants={itemVariants}
                    className="top-0 left-0"
                    icon={Car}
                    title="车端/边缘模型"
                    labels={["新数据", "模型训练"]}
                />

                {/* Top Right: Multimodal Auto-Labeling */}
                <NodeCard
                    variants={itemVariants}
                    className="top-0 right-0"
                    icon={ScanLine}
                    title="多模态自动标注"
                    labels={["模型训练", "数据验证"]}
                />

                {/* Bottom Left: Multimodal 3D Reconstruction */}
                <NodeCard
                    variants={itemVariants}
                    className="bottom-0 left-0"
                    icon={Box}
                    title="多模态 3D 重建"
                    labels={["场景生成", "重建"]}
                />

                {/* Bottom Right: Generative World Model */}
                <NodeCard
                    variants={itemVariants}
                    className="bottom-0 right-0"
                    icon={Globe}
                    title="生成式世界模型"
                    labels={["仿真模拟", "预测"]}
                />

                {/* Floating Labels on Paths (Simplified placement) */}
                <FloatingLabel className="top-[25%] left-[30%]" text="模型训练" />
                <FloatingLabel className="top-[25%] right-[30%]" text="数据闭环" />
                <FloatingLabel className="bottom-[25%] left-[30%]" text="场景生成" />
                <FloatingLabel className="bottom-[25%] right-[30%]" text="世界模型" />

            </motion.div>
        </div>
    );
}

function HubItem({ icon: Icon, label }: { icon: any; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50 border border-border/50">
            <Icon className="w-5 h-5 mb-1 text-primary/70" />
            <span className="text-[10px] text-center leading-tight text-muted-foreground">{label}</span>
        </div>
    );
}

function NodeCard({
    className,
    icon: Icon,
    title,
    labels,
    variants,
}: {
    className?: string;
    icon: any;
    title: string;
    labels: string[];
    variants: any;
}) {
    return (
        <motion.div
            variants={variants}
            className={cn(
                "absolute w-48 p-4 bg-card border border-border rounded-xl shadow-lg flex flex-col items-center gap-3 z-20",
                className
            )}
        >
            <div className="p-3 rounded-full bg-secondary/20 text-secondary-foreground ring-1 ring-border">
                <Icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-center text-sm">{title}</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {labels.map((l) => (
                    <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border/50 text-muted-foreground">
                        {l}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

function FloatingLabel({ className, text }: { className?: string; text: string }) {
    return (
        <div className={cn("absolute px-2 py-1 bg-background/80 backdrop-blur border border-border/30 rounded text-[10px] text-muted-foreground shadow-sm z-10", className)}>
            {text}
        </div>
    );
}

