"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, ShieldAlert, Cpu, Layers, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 grid-bg opacity-30"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl space-y-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary mb-4 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            NEXT-GEN AUTONOMOUS DRIVING
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Constructing the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-yellow-300 font-extrabold">
              World Model
            </span>{" "}
            for Driving
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Auwomo pioneers data-driven world models to solve the long-tail challenges of autonomous driving, enhancing rule understanding and safety through generative AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="group btn-retro" asChild>
              <Link href="/research">
                Our Technology
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-retro bg-transparent" asChild>
              <Link href="/about">
                About Auwomo
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Abstract Tape/Loop Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center opacity-20 pointer-events-none"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent relative">
            <motion.div
              animate={{ x: [-500, 500], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] bg-accent blur-[2px]"
            />
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase (Four Pillars) */}
      <section className="w-full py-24 bg-muted/30 border-y border-border/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Research Pillars</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We focus on bridging the gap between simulation and reality with four core technologies.
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
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
                <div className="relative h-48 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/generative-world-sim.png"
                    alt="Generative World Model"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Layers size={20} />
                    </div>
                    <CardTitle>Generative World Model</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    High-fidelity sensor simulation that recreates complex real-world scenarios with physically accurate lighting and textures.
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
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
                <div className="relative h-48 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/concept-learning.png"
                    alt="Data Loop System"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Cpu size={20} />
                    </div>
                    <CardTitle>Data Loop System</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Efficient data synthesis and auto-labeling pipeline that turns raw data into actionable training signals for AI models.
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
              <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
                <div className="relative h-48 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/multimodal-perception.png"
                    alt="End-to-End Autonomy"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-primary/10 text-primary">
                      <Brain size={20} />
                    </div>
                    <CardTitle>End-to-End Autonomy</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Comprehensive solutions for autonomous driving and humanoid robots, closing the loop from perception to control.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust/Stats Strip */}
      <section className="w-full py-16 border-b border-border/50 bg-background">
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
      <section className="w-full py-32 flex flex-col items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 space-y-8 max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight">Driving the Future</h2>
          <p className="text-lg text-muted-foreground">
            Led by Dr. Kaicheng Yu, Auwomo is pushing the boundaries of what's possible in autonomous vehicle technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="btn-retro" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-retro" asChild>
              <Link href="/team">Meet The Team</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
