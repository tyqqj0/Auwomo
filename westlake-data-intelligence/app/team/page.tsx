"use client";

import { motion } from "framer-motion";
import { User, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const advisors = [
  {
    name: "Prof. Luc Van Gool",
    role: "科学顾问",
    desc: "苏黎世联邦理工学院 (ETH Zurich) / 鲁汶大学 (KU Leuven) 视觉实验室负责人。计算机视觉领域的先驱。",
  },
  {
    name: "Prof. Felix Heide",
    role: "科学顾问",
    desc: "普林斯顿大学 (Princeton University)。NSF 杰出青年奖获得者。计算成像与光学专家。",
  },
  {
    name: "须成忠教授",
    role: "战略顾问",
    desc: "澳门大学 (University of Macau) 讲座教授。IEEE Fellow。云计算与边缘计算领域的顶级专家。",
  },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      {/* Header */}
      <section className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          世界级团队
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          由西湖大学的顶尖研究人员和工程师领衔，架起学术创新与工业应用之间的桥梁。
        </motion.p>
      </section>

      {/* PI Section */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-secondary/5 border border-border rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 items-center">
            <div className="aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/images/yukaicheng.png"
                alt="Kaicheng Yu"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">于开丞 (Kaicheng Yu)</h2>
                <p className="text-primary font-medium">首席科学家 / 创始人</p>
              </div>
              <p className="text-muted-foreground">
                西湖大学工学院助理教授、博士生导师。他的研究方向集中在鲁棒神经架构搜索 (NAS)、多模态传感器融合以及自动驾驶的生成式世界模型。
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="bg-background px-3 py-1 rounded-full border">Google Scholar 引用: 2500+</span>
                <span className="bg-background px-3 py-1 rounded-full border">CVPR / ICCV / NeurIPS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Advisors Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">科学顾问委员会</h2>
          <div className="h-1 w-12 bg-primary/50 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{advisor.name}</CardTitle>
                  <p className="text-sm text-primary/80 font-medium">{advisor.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{advisor.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className="bg-accent/5 rounded-2xl p-12 border border-accent/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <Users className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-muted-foreground">核心研究人员</p>
            <p className="text-xs text-muted-foreground/60">博士生 & 科研助理</p>
          </div>
          <div className="space-y-2">
            <Award className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">Top Tier</h3>
            <p className="text-muted-foreground">顶级会议发表</p>
            <p className="text-xs text-muted-foreground/60">CVPR, ECCV, ICCV, NeurIPS</p>
          </div>
          <div className="space-y-2">
            <User className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">Industry</h3>
            <p className="text-muted-foreground">行业认可</p>
            <p className="text-xs text-muted-foreground/60">图灵奖得主推荐</p>
          </div>
        </div>
      </section>
    </div>
  );
}
