"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Cpu, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/5 to-accent/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            BRIDGE SIMULATION & REALITY
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Generative Data Loop for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent/80">
              Autonomous Intelligence
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Westlake Intelligence (Auwomo) builds the generative infrastructure for next-gen autonomous driving and embodied AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="group" asChild>
              <Link href="/research">
                Explore Our Research
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                About The Lab
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Abstract Tape/Loop Visual */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 left-0 right-0 h-32 flex items-center justify-center opacity-20 pointer-events-none"
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

      {/* Core Technology Cards */}
      <section className="w-full py-24 bg-muted/20 border-y border-border/50 relative">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Core Technologies</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                      We solve long-tail problems in autonomous driving through high-fidelity simulation and generative world models.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="h-full bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Database size={24} />
                            </div>
                            <CardTitle>Generative World Model</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                High-fidelity sensor simulation that recreates complex real-world scenarios with physically accurate lighting and textures.
                            </CardDescription>
                        </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="h-full bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Disc size={24} />
                            </div>
                            <CardTitle>Data Loop System</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Efficient data synthesis and auto-labeling pipeline that turns raw data into actionable training signals for AI models.
                            </CardDescription>
                        </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="h-full bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Cpu size={24} />
                            </div>
                            <CardTitle>End-to-End Autonomy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Comprehensive solutions for autonomous driving and humanoid robots, closing the loop from perception to control.
                            </CardDescription>
                        </CardContent>
                    </Card>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* Trust/Stats Strip */}
      <section className="w-full py-16 border-b border-border/50">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2">
                      <h3 className="text-3xl font-bold font-mono">ECCV '24</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Challenge Winner</p>
                  </div>
                   <div className="space-y-2">
                      <h3 className="text-3xl font-bold font-mono">2500+</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Scholar Citations</p>
                  </div>
                   <div className="space-y-2">
                      <h3 className="text-3xl font-bold font-mono">Top Tier</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Industry Partners</p>
                  </div>
                   <div className="space-y-2">
                      <h3 className="text-3xl font-bold font-mono">Westlake</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">University Lab</p>
                  </div>
              </div>
          </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-32 flex flex-col items-center text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
          <div className="relative z-10 space-y-8 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight">Ready to shape the future of Autonomy?</h2>
            <p className="text-lg text-muted-foreground">
                Join our team of researchers and engineers or partner with us to accelerate your autonomous technology.
            </p>
            <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/team">Meet the Team</Link>
                </Button>
            </div>
          </div>
      </section>

    </div>
  );
}
