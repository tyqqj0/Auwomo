"use client";

import { motion } from "framer-motion";
import { Layers, Box, Cpu, Brain, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Generative Infrastructure for <br />
          <span className="text-primary">Autonomous Driving</span>
        </motion.h1>
        <p className="text-xl text-muted-foreground">
            We are redefining how autonomous systems learn by creating infinite, high-fidelity synthetic worlds and unified multimodal brains.
        </p>
      </section>

      {/* Core Technology Areas */}
      <section>
        <Tabs defaultValue="simulation" className="w-full">
            <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4 h-auto p-1">
                    <TabsTrigger value="simulation" className="py-3">Generative World</TabsTrigger>
                    <TabsTrigger value="multimodal" className="py-3">Multimodal Brain</TabsTrigger>
                    <TabsTrigger value="concept" className="py-3">Concept Learning</TabsTrigger>
                    <TabsTrigger value="safety" className="py-3">Safety & Risk</TabsTrigger>
                </TabsList>
            </div>

            {/* Tab 1: Simulation */}
            <TabsContent value="simulation" className="space-y-8">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-full max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Box className="w-4 h-4" />
                            Core Pillar I
                        </div>
                        <h2 className="text-3xl font-bold">Generative World Models</h2>
                        <p className="text-lg text-muted-foreground">
                            We use Generative AI to construct a data feedback loop framework. This creates large-scale simulation scenes including complex high-level rules (e.g. police gestures) and complete 3D ground truth.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Static World Construction (BEVControl)</li>
                            <li className="flex items-center gap-2">✓ Dynamic Video Synthesis (Unleashing)</li>
                            <li className="flex items-center gap-2">✓ Closed-loop Self-Correction</li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <div className="relative aspect-[4/1] rounded-xl overflow-hidden border border-border/50 w-full">
                            <Image 
                                src="/images/generative-world-sim.png" 
                                alt="Generative World Simulation"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </TabsContent>

            {/* Tab 2: Multimodal */}
            <TabsContent value="multimodal" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="order-2 md:order-1 relative aspect-[1.5/1] rounded-xl overflow-hidden border border-border/50">
                        <Image 
                             src="/images/multimodal-perception.png" 
                             alt="Multimodal Perception"
                             fill
                             className="object-cover"
                        />
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Brain className="w-4 h-4" />
                            Core Pillar II
                        </div>
                        <h2 className="text-3xl font-bold">Unified Multimodal Brain</h2>
                        <p className="text-lg text-muted-foreground">
                            Understanding and generation are two sides of the same coin. We construct unified Multi-modal Large Language Models (MLLM) that disentangle semantic understanding from pixel-level generation.
                        </p>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Unified Visual Tokenizer (DualToken)</li>
                            <li className="flex items-center gap-2">✓ Generation-Enhanced Understanding</li>
                            <li className="flex items-center gap-2">✓ Audio-Video-Text Integration</li>
                        </ul>
                    </div>
                </div>
            </TabsContent>

             {/* Tab 3: Concept Learning */}
             <TabsContent value="concept" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Cpu className="w-4 h-4" />
                            Core Pillar III
                        </div>
                        <h2 className="text-3xl font-bold">Concept Learning</h2>
                        <p className="text-lg text-muted-foreground">
                            Moving beyond brute-force data accumulation. We enable autonomous agents to develop high-level conceptual understanding from training, similar to human intuition, for extreme data efficiency.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Concept-Learning Module</li>
                            <li className="flex items-center gap-2">✓ Long-tail Scenario Generalization</li>
                            <li className="flex items-center gap-2">✓ Explainable Decision Making</li>
                        </ul>
                    </div>
                    <div className="relative aspect-[2.5/1] rounded-xl overflow-hidden border border-border/50">
                        <Image 
                             src="/images/concept-learning.png" 
                             alt="Concept Learning"
                             fill
                             className="object-cover"
                        />
                    </div>
                </div>
            </TabsContent>

             {/* Tab 4: Safety */}
             <TabsContent value="safety" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="order-2 md:order-1 relative aspect-[3.2/1] rounded-xl overflow-hidden border border-border/50">
                        <Image 
                             src="/images/safety-prediction.png" 
                             alt="Safety Prediction"
                             fill
                             className="object-cover"
                        />
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <ShieldAlert className="w-4 h-4" />
                            Core Pillar IV
                        </div>
                        <h2 className="text-3xl font-bold">Trajectory Risk Prediction</h2>
                        <p className="text-lg text-muted-foreground">
                            Enhancing Visual Language Models (VLM) with synthetic trajectory data to predict risks associated with planned paths, ensuring safety before action.
                        </p>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Risk Foreseeing</li>
                            <li className="flex items-center gap-2">✓ Safety-Critical Optimization</li>
                            <li className="flex items-center gap-2">✓ DriveMRP Framework</li>
                        </ul>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
      </section>

      {/* Featured Research Papers / Projects */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Selected Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group hover:border-accent/50 transition-colors">
                <CardHeader>
                    <CardTitle>BEVControl</CardTitle>
                    <CardDescription>ICCV 2023</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Accurate geometric generation of 3D scenes from bird's-eye view sketches, enabling controllable autonomous driving simulation.
                    </p>
                </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:border-accent/50 transition-colors">
                <CardHeader>
                    <CardTitle>OmniGen</CardTitle>
                    <CardDescription>Generative AI</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Unified generation of multimodal sensor data through shared BEV space, ensuring consistency across cameras and LiDARs.
                    </p>
                </CardContent>
            </Card>
             <Card className="overflow-hidden group hover:border-accent/50 transition-colors">
                <CardHeader>
                    <CardTitle>DriveMRP</CardTitle>
                    <CardDescription>Safety Prediction</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Predicting potential risks of planned trajectories using large language models enhanced by synthetic data.
                    </p>
                </CardContent>
            </Card>
             <Card className="overflow-hidden group hover:border-accent/50 transition-colors">
                <CardHeader>
                    <CardTitle>DualToken</CardTitle>
                    <CardDescription>Visual Tokenizer</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                         A unified visual tokenizer for both understanding and generation, achieving state-of-the-art performance in MLLM tasks.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
