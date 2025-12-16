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
        HERO SECTION: Immersive Stacked Layout
        Background: Interactive Arm (Canvas)
        Foreground: Text Content
      */}
      <section className="relative w-full h-[100vh] overflow-hidden flex items-center">
        
        {/* BACKGROUND LAYER: The Giant Machine */}
        {/* We allow pointer events on the background wrapper so mouse tracking works, 
            but the arm component itself sets pointer-events-none on the container 
            if we want clicks to pass through.
            Here, we actually WANT mouse events to reach the window/canvas listener, 
            so we make this layer interactive but behind text. */}
        <div className="absolute inset-0 z-0">
           {/* Subtle Grid for depth */}
           <div className="absolute inset-0 grid-bg opacity-[0.15] pointer-events-none" />
           <InteractiveRobotArm />
           
           {/* Gradients to fade edges */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>

        {/* FOREGROUND LAYER: Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
          {/* Content Wrapper - Pointer events auto for buttons/links */}
          <div className="pointer-events-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8 md:space-y-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-background/50 backdrop-blur-md text-xs font-mono text-primary w-fit shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                NEXT-GEN EMBODIED AI
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1] drop-shadow-sm">
                构建具身智能的 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">
                  数据基座
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-2xl leading-relaxed font-light">
                Westlake Data Intelligence (西湖数据智能) <br className="hidden md:block"/>
                构建下一代具身智能的生成式数据闭环，<br className="hidden md:block"/>
                在数字孪生中孕育通用智能。
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button size="lg" className="rounded-full px-10 py-7 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300" asChild>
                  <Link href="/research">
                    探索核心技术
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg bg-background/40 backdrop-blur-md border-primary/20 hover:bg-background/60 hover:scale-105 transition-all duration-300" asChild>
                  <Link href="/about">
                    关于我们
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase (Four Pillars) */}
      <section className="w-full py-32 bg-background border-t border-border relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">核心技术支柱</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light">
              弥合仿真与现实的鸿沟，打造通用的物理世界智能。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            {/* Card 1: Generative World Model */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-72 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/generative-world-sim.png"
                    alt="Generative World Model"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Layers size={24} />
                    </div>
                    <CardTitle className="text-xl">生成式世界模型</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    基于物理规律的高保真传感器仿真，重建复杂的现实世界场景，为智能体提供无限的训练环境。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Card 2: Data Loop System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-72 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/concept-learning.png"
                    alt="Data Loop System"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Cpu size={24} />
                    </div>
                    <CardTitle className="text-xl">数据闭环系统</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    高效的数据合成与自动标注流水线，将原始数据转化为高质量的训练信号，加速 AI 模型的迭代。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Card 3: End-to-End Autonomy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-72 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/multimodal-perception.png"
                    alt="End-to-End Autonomy"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Brain size={24} />
                    </div>
                    <CardTitle className="text-xl">端到端通用智能</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    面向自动驾驶与人形机器人的通用解决方案，实现从感知到控制的完全闭环，赋予机器真正的智能。
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust/Stats Strip */}
      <section className="w-full py-20 border-b border-border/50 bg-muted/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold font-mono">Founded</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">2023</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold font-mono">Sim2Real</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Core Tech</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold font-mono">Top Tier</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Publications</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold font-mono">Global</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-40 flex flex-col items-center text-center px-4 relative overflow-hidden bg-background z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 space-y-10 max-w-4xl">
          <h2 className="text-5xl font-bold tracking-tight">驱动未来智能</h2>
          <p className="text-xl text-muted-foreground font-light">
            由西湖大学智能无人系统实验室孵化，我们在探索通用人工智能的边界。
          </p>
          <div className="flex gap-6 justify-center">
            <Button size="lg" className="rounded-full px-12 py-6 text-lg" asChild>
              <Link href="/contact">联系合作</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 py-6 text-lg" asChild>
              <Link href="/team">团队介绍</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
