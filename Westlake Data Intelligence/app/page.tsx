"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InteractiveRobotArm from "@/components/interactive-robot-arm";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">

      {/* 
        HERO SECTION: Split Layout
        Left: Text / Right: Interactive Arm (Desktop Only)
      */}
      <section className="w-full h-[calc(100vh-4rem)] relative overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Column: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-20 bg-background/80 backdrop-blur-sm md:bg-transparent pt-12 md:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              NEXT-GEN EMBODIED AI
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
              构建具身智能的 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
                数据基座
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Westlake Data Intelligence (西湖数据智能) —— 致力于构建下一代具身智能与自动驾驶的生成式数据闭环基础设施，打通虚拟与现实的边界。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/20" asChild>
                <Link href="/research">
                  探索核心技术
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base hover:bg-muted/50" asChild>
                <Link href="/about">
                  关于我们
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Arm */}
        <div className="hidden md:block w-1/2 h-full relative bg-muted/20 border-l border-border/50">
           {/* Background Grid specific for the arm area */}
           <div className="absolute inset-0 grid-bg opacity-50" />
           <InteractiveRobotArm />
           
           {/* Overlay Gradient at bottom to blend */}
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Feature Showcase (Four Pillars) */}
      <section className="w-full py-24 bg-background border-t border-border relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">核心技术支柱</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              我们专注于通过核心技术弥合仿真与现实之间的鸿沟。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            {/* Card 1: Generative World Model */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md">
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/generative-world-sim.png"
                    alt="Generative World Model"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Layers size={20} />
                    </div>
                    <CardTitle>生成式世界模型</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    基于物理规律的高保真传感器仿真，重建复杂的现实世界场景，为智能体提供无限的训练环境。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Card 2: Data Loop System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md">
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/concept-learning.png"
                    alt="Data Loop System"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Cpu size={20} />
                    </div>
                    <CardTitle>数据闭环系统</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    高效的数据合成与自动标注流水线，将原始数据转化为高质量的训练信号，加速 AI 模型的迭代。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Card 3: End-to-End Autonomy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md">
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/multimodal-perception.png"
                    alt="End-to-End Autonomy"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Brain size={20} />
                    </div>
                    <CardTitle>端到端通用智能</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    面向自动驾驶与人形机器人的通用解决方案，实现从感知到控制的完全闭环，赋予机器真正的智能。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust/Stats Strip */}
      <section className="w-full py-16 border-b border-border/50 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-mono">Founded</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">2023</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-mono">Sim2Real</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Core Tech</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-mono">Top Tier</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Publications</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-mono">Global</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 flex flex-col items-center text-center px-4 relative overflow-hidden bg-background z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 space-y-8 max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight">驱动未来智能</h2>
          <p className="text-lg text-muted-foreground">
            由西湖大学智能无人系统实验室孵化，我们在探索通用人工智能的边界。
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/contact">联系合作</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/team">团队介绍</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
