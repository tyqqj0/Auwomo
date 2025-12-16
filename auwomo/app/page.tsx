"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Brain, ShieldAlert, Cpu, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InteractiveRoad from "@/components/interactive-road";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation transforms
  // 1. Image: Starts at 55% height, then fades/blurs
  // Adjusted opacity to stay visible a bit longer for smoother blend
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(12px)"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);

  // 2. Buttons: Move from below image (start) to below text (end)
  // Adjusted start position to be closer to image bottom
  // Mobile: Start closer to new 45vh image bottom
  // Desktop: Start closer to 55vh image bottom
  const buttonY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "10vh"]);

  // 3. Main Text: Reveals as we scroll
  // Adjusted to overlap more smoothly
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.45], [0.95, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.45], [30, 0]);

  // 4. Road Opacity: Fades out as text appears so the "World Model" section is clean
  const roadOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);

  return (
    <div className="flex flex-col w-full">

      {/* 
        SCROLLYTELLING HERO SECTION 
        Total height is 250vh to allow for a comfortable scroll "time" for the transition
      */}
      <div ref={containerRef} className="relative h-[250vh] w-full">

        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center bg-background">

          {/* Layer 1: Half-Screen Background Image */}
          <motion.div
            style={{ opacity: imageOpacity, filter: imageBlur, scale: imageScale }}
            className="absolute top-0 left-0 right-0 h-[27vh] md:h-[55vh] z-10 pointer-events-none"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-banner-womo.png"
                alt="Future of Autonomy"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Improved Gradient Overlay for smoother transition */}
              {/* Using a bottom-aligned gradient for better control over the fade height */}
              <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
          </motion.div>

          {/* Layer 0.5: Interactive Road Sim (Fills the bottom void) */}
          {/* Positioned explicitly under the main image area */}
          <motion.div
            style={{ opacity: roadOpacity }}
            className="absolute top-[27vh] md:top-[55vh] left-0 right-0 bottom-0 z-0"
          >
            <InteractiveRoad />
            {/* Gradient blend at the top to merge with image */}
            <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
          </motion.div>

          {/* Layer 2: The Reveal (Big Text) */}
          <motion.div
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
            className="absolute top-[40%] md:top-1/2 left-0 right-0 -translate-y-1/2 z-20 text-center px-4 max-w-5xl mx-auto mt-8 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary mb-6 backdrop-blur-sm mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              NEXT-GEN AUTONOMOUS DRIVING
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-foreground leading-[1.1]">
              Constructing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-yellow-300 font-extrabold">
                World Model
              </span>{" "}
              for Driving
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-light">
              Auwomo pioneers data-driven world models to solve the long-tail challenges of autonomous driving.
            </p>
          </motion.div>

          {/* Layer 3: Buttons (Floating) */}
          <motion.div
            style={{ y: buttonY }}
            className="absolute top-[60vh] md:top-[70vh] z-30 w-full flex flex-col items-center gap-6 px-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto">
              {/* Cleaner, more modern buttons */}
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/research">
                  Our Technology
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-full border-2 hover:bg-muted/50 transition-all bg-background/80 backdrop-blur-sm" asChild>
                <Link href="/about">
                  About Auwomo
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Feature Showcase (Four Pillars) */}
      <section className="w-full py-32 bg-background border-t border-border/50 relative z-30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Research Pillars</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We focus on bridging the gap between simulation and reality with core technologies.
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
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/gw-sim1.png"
                    alt="Generative World Model"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
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
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/data-loop1.png"
                    alt="Data Loop System"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
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
                <div className="relative h-64 w-full overflow-hidden border-b border-border/20">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <Image
                    src="/images/end-to-end1.png"
                    alt="End-to-End Autonomy"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 filter grayscale-[20%] contrast-125"
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
      <section className="w-full py-16 border-b border-border/50 bg-background relative z-30">
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
      <section className="w-full py-32 flex flex-col items-center text-center px-4 relative overflow-hidden bg-background z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10 space-y-8 max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight">Driving the Future</h2>
          <p className="text-lg text-muted-foreground">
            Led by Dr. Kaicheng Yu, Auwomo is pushing the boundaries of what's possible in autonomous vehicle technology.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/team">Meet The Team</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
