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
                    具身智能的 <br />
                    <span className="text-primary">生成式基础设施</span>
                </motion.h1>
                <p className="text-xl text-muted-foreground">
                    我们通过构建无限的高保真合成世界和统一的多模态大脑，重新定义自主智能系统的学习方式。
                </p>
            </section>

            {/* Core Technology Areas */}
            <section>
                <Tabs defaultValue="simulation" className="w-full">
                    <div className="flex justify-center mb-12">
                        <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4 h-auto p-1">
                            <TabsTrigger value="simulation" className="py-3">生成式世界</TabsTrigger>
                            <TabsTrigger value="multimodal" className="py-3">多模态大脑</TabsTrigger>
                            <TabsTrigger value="concept" className="py-3">概念学习</TabsTrigger>
                            <TabsTrigger value="safety" className="py-3">安全与风险</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab 1: Simulation */}
                    <TabsContent value="simulation" className="space-y-8">
                        <div className="flex flex-col items-center gap-8">
                            <div className="w-full max-w-2xl space-y-6">
                                <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                                    <Box className="w-4 h-4" />
                                    核心支柱 I
                                </div>
                                <h2 className="text-3xl font-bold">生成式世界模型</h2>
                                <p className="text-lg text-muted-foreground">
                                    利用生成式 AI 构建数据反馈闭环框架。这创造了大规模的仿真场景，包含复杂的高层规则（如物理交互、因果逻辑）和完整的 3D Ground Truth。
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">✓ 静态世界构建 (BEVControl)</li>
                                    <li className="flex items-center gap-2">✓ 动态视频合成 (Unleashing)</li>
                                    <li className="flex items-center gap-2">✓ 闭环自校正机制</li>
                                </ul>
                            </div>

                            {/* Wide Diagram Display */}
                            <div className="w-full">
                                <div className="relative rounded-xl overflow-hidden border border-border bg-card/50 shadow-sm group">
                                    <div className="overflow-x-auto scrollbar-hide">
                                        <div className="relative min-w-[800px] md:min-w-full">
                                            <Image
                                                src="/images/generative-world-sim.png"
                                                alt="Generative World Simulation"
                                                width={1920}
                                                height={600}
                                                className="w-full h-auto object-contain"
                                                priority
                                            />
                                        </div>
                                    </div>
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
                                    核心支柱 II
                                </div>
                                <h2 className="text-3xl font-bold">统一多模态大脑</h2>
                                <p className="text-lg text-muted-foreground">
                                    理解与生成是硬币的两面。我们构建统一的多模态大语言模型 (MLLM)，解耦语义理解与像素级生成，赋予机器人真正的认知能力。
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">✓ 统一视觉 Tokenizer (DualToken)</li>
                                    <li className="flex items-center gap-2">✓ 生成增强的理解能力</li>
                                    <li className="flex items-center gap-2">✓ 音视频-文本与动作的融合</li>
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
                                    核心支柱 III
                                </div>
                                <h2 className="text-3xl font-bold">概念学习</h2>
                                <p className="text-lg text-muted-foreground">
                                    超越单纯的数据堆砌。我们使智能体能够从训练中发展出类似于人类直觉的高级概念理解，实现极致的数据效率和泛化能力。
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">✓ 概念学习模块</li>
                                    <li className="flex items-center gap-2">✓ 长尾场景泛化 (Long-tail Generalization)</li>
                                    <li className="flex items-center gap-2">✓ 可解释的决策过程</li>
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
                                    核心支柱 IV
                                </div>
                                <h2 className="text-3xl font-bold">轨迹风险预测</h2>
                                <p className="text-lg text-muted-foreground">
                                    利用合成轨迹数据增强视觉语言模型 (VLM)，预测规划路径的潜在风险，确保行动前的安全性，尤其是在复杂交互场景中。
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">✓ 风险预见能力</li>
                                    <li className="flex items-center gap-2">✓ 安全关键优化</li>
                                    <li className="flex items-center gap-2">✓ DriveMRP 框架</li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Featured Research Papers / Projects */}
            <section className="space-y-12">
                <h2 className="text-3xl font-bold text-center">精选研究成果</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="overflow-hidden group hover:border-accent/50 transition-colors">
                        <CardHeader>
                            <CardTitle>BEVControl</CardTitle>
                            <CardDescription>ICCV 2023</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                从鸟瞰图草图精确生成 3D 场景几何，实现可控的自动驾驶与机器人仿真环境构建。
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
                                通过共享的 BEV 空间统一生成多模态传感器数据，确保跨相机和 LiDAR 的时空一致性。
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
                                利用合成数据增强的大语言模型，预测规划轨迹的潜在风险，提升具身智能的安全性。
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
                                用于理解和生成的统一视觉 Tokenizer，在 MLLM 任务中实现了最先进的性能。
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
