"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { DataHubDiagram } from "@/components/diagrams/DataHubDiagram";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            引领生成式 <br />
            <span className="text-primary/80">具身智能未来</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Westlake Data Intelligence 是源自西湖大学智能无人系统实验室的商业化衍生项目。我们致力于构建驱动下一代具身智能的核心生成式基础设施。
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">我们的使命</h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
          <p className="text-lg text-muted-foreground">
            构建物理世界的通用智能（General Scale AI）。我们坚信，通往 L5 级完全自动驾驶和通用机器人的关键，不仅在于更优的算法，更在于更优质的数据——特别是通过世界模型生成的高保真、符合物理规律的合成数据。
          </p>
          <p className="text-lg text-muted-foreground">
            通过弥合仿真与现实的鸿沟，我们使 AI 系统能够从无限的场景中学习，包括那些在现实世界中难以大规模捕捉的关键“长尾”边缘案例。
          </p>
        </motion.div>

        <div className="w-full flex justify-center lg:justify-end min-h-[500px]">
          <DataHubDiagram />
        </div>
      </section>

      {/* Lab Background */}
      <section className="bg-secondary/5 rounded-2xl p-8 md:p-16 border border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Quote className="w-12 h-12 text-primary/20 mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold">植根于学术卓越</h2>
          <p className="text-lg text-muted-foreground">
            我们团队创立于西湖大学工学院，结合了严谨的学术研究与快速的工业应用。我们的核心技术源于在计算机视觉、神经渲染和自主系统领域的多年顶级研究积累。
          </p>
        </div>
      </section>

    </div>
  );
}
