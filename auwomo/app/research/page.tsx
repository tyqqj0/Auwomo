"use client";

import { motion } from "framer-motion";
import { Layers, Box, Film, Cpu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
          <span className="text-primary">Embodied Intelligence</span>
        </motion.h1>
        <p className="text-xl text-muted-foreground">
            We are redefining how autonomous systems learn by creating infinite, high-fidelity synthetic worlds.
        </p>
      </section>

      {/* Core Technology Areas */}
      <section>
        <Tabs defaultValue="simulation" className="w-full">
            <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-2xl grid-cols-3 h-auto p-1">
                    <TabsTrigger value="simulation" className="py-3">3D Simulation</TabsTrigger>
                    <TabsTrigger value="fusion" className="py-3">Sensor Fusion</TabsTrigger>
                    <TabsTrigger value="nas" className="py-3">Neural Arch</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="simulation" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Box className="w-4 h-4" />
                            Core Tech I
                        </div>
                        <h2 className="text-3xl font-bold">High-Fidelity 3D Simulation</h2>
                        <p className="text-lg text-muted-foreground">
                            Leveraging Implicit Neural Fields (NeRF/Gaussian Splatting) to reconstruct and generate photorealistic 3D environments. We won the ECCV 2024 Challenge for Extreme Case Generation.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Physics-compliant rendering</li>
                            <li className="flex items-center gap-2">✓ Editable road sketches</li>
                            <li className="flex items-center gap-2">✓ Dynamic object insertion</li>
                        </ul>
                    </div>
                    <div className="aspect-video bg-muted rounded-xl border flex items-center justify-center">
                         <span className="text-muted-foreground">Simulation Visualization Placeholder</span>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="fusion" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="order-2 md:order-1 aspect-video bg-muted rounded-xl border flex items-center justify-center">
                         <span className="text-muted-foreground">Fusion Tech Visualization</span>
                    </div>
                    <div className="space-y-6 order-1 md:order-2">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Layers className="w-4 h-4" />
                            Core Tech II
                        </div>
                        <h2 className="text-3xl font-bold">Multi-Modal Sensor Fusion</h2>
                        <p className="text-lg text-muted-foreground">
                            Pioneering BEVFusion technology (NeurIPS/CVPR) that seamlessly integrates LiDAR, Camera, and Radar data into a unified Bird's Eye View representation for robust perception.
                        </p>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">✓ Unified BEV Representation</li>
                            <li className="flex items-center gap-2">✓ Robust against sensor failure</li>
                            <li className="flex items-center gap-2">✓ Real-time inference capability</li>
                        </ul>
                    </div>
                </div>
            </TabsContent>

             <TabsContent value="nas" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Cpu className="w-4 h-4" />
                            Core Tech III
                        </div>
                        <h2 className="text-3xl font-bold">Robust Neural Architecture Search</h2>
                        <p className="text-lg text-muted-foreground">
                            Automating the design of neural networks to ensure stability and efficiency across varying hardware platforms and deployment scenarios.
                        </p>
                    </div>
                    <div className="aspect-video bg-muted rounded-xl border flex items-center justify-center">
                         <span className="text-muted-foreground">Architecture Search Visualization</span>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
      </section>

      {/* Featured Products/Projects */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Featured Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group">
                <div className="h-48 bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Film className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>Drive-SORA</CardTitle>
                    <CardDescription>Generative World Model</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Long-sequence, multi-view video generation specifically designed for driving scenarios. Capable of dreaming up consistent future frames based on control inputs.
                    </p>
                </CardContent>
            </Card>

            <Card className="overflow-hidden group">
                <div className="h-48 bg-muted relative">
                     <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Box className="w-12 h-12 text-muted-foreground/50" />
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>BEVControl</CardTitle>
                    <CardDescription>Controllable Scene Generation</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        A 3D detection generator that allows users to edit road sketches and layout, creating bespoke training data for specific edge cases.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}

