"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const recipient = "autolab.hr@westlake.edu.cn";
        const subject = encodeURIComponent(`[合作咨询] ${formData.subject}`);
        const body = encodeURIComponent(
            `姓名: ${formData.name}\n邮箱: ${formData.email}\n\n留言内容:\n${formData.message}`
        );

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="container mx-auto px-4 py-24 space-y-24">
            {/* Header */}
            <section className="text-center space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight"
                >
                    与我们合作
                </motion.h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    无论您是学术研究人员、自动驾驶/机器人行业的合作伙伴，还是投资人，我们都期待听到您的声音。
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
                        <h2 className="text-2xl font-bold">联系方式</h2>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">来访地址</h3>
                                <p className="text-muted-foreground">
                                    浙江省杭州市西湖区墩余路600号<br />
                                    西湖大学工学院<br />
                                    (Sandun Town, Xihu District)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">电子邮件</h3>
                                <p className="text-muted-foreground">
                                    autolab.hr@westlake.edu.cn
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">行业合作</h3>
                                <p className="text-muted-foreground text-sm">
                                    我们与领先的电动汽车制造商和具身智能公司紧密合作。欢迎联系我们探讨试点项目和数据生成服务。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-secondary/5 border border-border">
                        <h3 className="font-bold mb-2">加入我们的团队</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            我们正在积极招聘具有生成式模型、3D 视觉和神经渲染背景的研究科学家和工程师。
                        </p>
                        <Button variant="outline" className="gap-2">
                            查看开放职位 <ArrowRight className="w-4 h-4" />
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">姓名</label>
                                <Input
                                    id="name"
                                    placeholder="您的姓名"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">电子邮箱</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">咨询主题</label>
                            <Input
                                id="subject"
                                placeholder="例如：技术合作咨询"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">留言内容</label>
                            <Textarea
                                id="message"
                                placeholder="请详细描述您的需求..."
                                className="min-h-[150px]"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            发送消息
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
