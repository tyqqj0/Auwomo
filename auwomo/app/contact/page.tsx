"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Partner with Auwomo
        </motion.h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Whether you are an academic researcher, an industry partner in AD/Robotics, or an investor, we'd love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
        >
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">
                            Westlake University, School of Engineering<br />
                            600 Dunyu Road, Sandun Town<br />
                            Xihu District, Hangzhou, Zhejiang, China
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground">
                            For collaborations: contact@auwomo.ai<br />
                            For careers: careers@auwomo.ai
                        </p>
                    </div>
                </div>

                 <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Industry Partnerships</h3>
                        <p className="text-muted-foreground text-sm">
                            We are proud to collaborate with leading EV manufacturers and Embodied AI companies. Reach out to discuss pilot programs and data generation services.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-xl bg-secondary/5 border border-border">
                <h3 className="font-bold mb-2">Join Our Team</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    We are actively recruiting Research Scientists and Engineers with backgrounds in Generative Models, 3D Vision, and Rendering.
                </p>
                <Button variant="outline" className="gap-2">
                    View Openings <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-card border rounded-2xl p-8 shadow-sm"
        >
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                     <Input id="subject" placeholder="Collaboration Inquiry" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        className="min-h-[150px]"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Send Message
                </Button>
            </form>
        </motion.div>
      </div>
    </div>
  );
}

