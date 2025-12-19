"use client";

import { motion } from "framer-motion";
import { User, Award, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cofounders = [
  {
    code: "TZ",
    name: "Tong Zhang",
    role: "COFOUNDER & CHIEF SCIENTIST",
    desc:
      "Assistant Professor, University of Chinese Academy of Sciences. Postdoc at EPFL; Ph.D. at Australian National University. National High-Level Youth Talent & CAS Hundred Talents selectee. Microsoft Star Scholar. Area Chair (ICLR/NeurIPS/ICML). Recipient of BMVC 2025 Best Poster Award and CVPR 2020 Paper Award Nomination. Expertise: representation learning, 3D vision, and artificial life.",
  },
  {
    code: "YD",
    name: "Yao Di",
    role: "COFOUNDER & COO",
    desc:
      "ing. manag. techn. entrepr. dipl. EPF; ing. méc. dipl. EPF; PMP; PSM II. Senior Verification Manager at Ypsomed (core team for first digital health 510(k)). Former Operations Strategy Analyst at Merck (network-based Monte Carlo risk modeling) and Project Leader at Philip Morris (industrial robotics & vision deployments). Expertise: industrial robotics & vision, program management, regulatory compliance, and operations strategy.",
  },
] as const;

const advisors = [
  {
    name: "Prof. Luc Van Gool",
    role: "Scientific Advisor",
    desc: "CVLab Leader, ETH Zurich / KU Leuven. Pioneer in Computer Vision.",
  },
  {
    name: "Prof. Felix Heide",
    role: "Scientific Advisor",
    desc: "Princeton University. NSF Young Investigator Awardee. Computational Imaging Expert.",
  },
  {
    name: "Prof. Chengzhong Xu",
    role: "Strategic Advisor",
    desc: "University of Macau. IEEE Fellow. Expert in Cloud & Edge Computing.",
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
          World-Class Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Led by top-tier researchers and engineers from Westlake University, bridging the gap between academic innovation and industrial application.
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
                <h2 className="text-2xl font-bold">Kaicheng Yu</h2>
                <p className="text-primary font-medium">CEO / Founder</p>
              </div>
              <p className="text-muted-foreground">
                Assistant Professor at Westlake University. His research focuses on robust neural architecture search, multi-modal sensor fusion, and generative world models for autonomous driving.
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="bg-background px-3 py-1 rounded-full border">Google Scholar Citations: 2500+</span>
                <span className="bg-background px-3 py-1 rounded-full border">CVPR / ICCV / NeurIPS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Co-Founders */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Co-Founders</h2>
          <div className="h-1 w-12 bg-primary/50 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cofounders.map((p, index) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="h-full bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl border border-border/60 bg-primary/5 text-primary flex items-center justify-center shrink-0">
                      <span className="font-mono text-sm">{p.code}</span>
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-lg truncate">{p.name}</CardTitle>
                      <p className="text-xs text-primary/80 font-semibold tracking-wide">{p.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisors Section */}
      {/* <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Scientific Advisors</h2>
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
      </section> */}

      {/* Team Stats */}
      <section className="bg-accent/5 rounded-2xl p-12 border border-accent/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <Users className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-muted-foreground">Core Researchers</p>
            <p className="text-xs text-muted-foreground/60">PhDs & Research Assistants</p>
          </div>
          <div className="space-y-2">
            <Award className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">Top Tier</h3>
            <p className="text-muted-foreground">Publications</p>
            <p className="text-xs text-muted-foreground/60">CVPR, ECCV, ICCV, NeurIPS</p>
          </div>
          <div className="space-y-2">
            <User className="w-8 h-8 mx-auto text-primary" />
            <h3 className="text-3xl font-bold">Industry</h3>
            <p className="text-muted-foreground">Recognitions</p>
            <p className="text-xs text-muted-foreground/60">Endorsed by Turing Award Winners</p>
          </div>
        </div>
      </section>
    </div>
  );
}

