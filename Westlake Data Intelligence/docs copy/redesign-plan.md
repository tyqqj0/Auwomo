# Westlake Data Intelligence - 网站重构与设计规划

## 1. 项目愿景 (Vision)
将原有的自动驾驶 (Autonomous Driving) 垂直领域网站，转型为 **具身智能 (Embodied Intelligence)** 与 **数据智能 (Data Intelligence)** 的综合展示平台。
核心理念从 "Drive" (驾驶) 扩展至 "Act & Interact" (行动与交互)。

**新名称**: Westlake Data Intelligence (西湖数据智能)
**核心slogan**: 构建物理世界的通用智能基础设施 (Building General Infrastructure for the Physical World)

## 2. 视觉与设计风格 (Visual Identity)

### 2.1 配色方案 (Color Palette)
摒弃原有过于强调“暗夜/霓虹/车灯”的赛博朋克风格，转向**更严谨、明亮、科技感**的实验室风格。

*   **主色 (Primary)**: `Deep Ocean Blue` (#0F172A) - 代表深邃的数据与智能。
*   **强调色 (Accent)**: `Lab Cyan` (#06B6D4) - 代表连接、清洁能源与未来。
*   **背景色 (Background)**:
    *   **Light Mode**: 纯净白 (#FFFFFF) 搭配 极淡的冷灰 (#F8FAFC)。
    *   **Dark Mode**: 深岩灰 (#0B1121) 搭配 荧光蓝微光。
*   **辅助色**:
    *   `Alert/Safety`: 暖橙色 (不再使用过于激烈的红色)。
    *   `Success/Verification`: 翡翠绿。

### 2.2 字体 (Typography)
*   **中文**: 系统默认无衬线字体 (PingFang SC, Microsoft YaHei) + Noto Sans SC (如果需要引入)。
*   **英文**: Inter 或 Geist Sans (保持现有)，标题可使用更加工业风的字体 (如 JetBrains Mono 用于代码/数据展示)。

---

## 3. 首页重构规划 (Homepage Redesign)

### 3.1 布局结构：左右分屏 (Split-Screen Layout)
针对首屏 (Hero Section) 采用经典的 **50/50 分屏设计**，仅在 Desktop 端生效；Mobile 端改为上下堆叠。

*   **左侧区域 (信息核心)**:
    *   **品牌标识**: 左上角清晰的 Logo。
    *   **核心文案**:
        *   H1: "具身智能的数据引擎" (Embodied Data Engine)
        *   Sub-H1: "连接虚拟仿真与物理现实" (Bridging Simulation and Reality)
    *   **行动点 (CTA)**: "探索技术" (Primary) + "联系我们" (Outline)。
    *   **动态数据**: 简单的滚动数字（如：仿真时长、模型参数量），增加科技信服力。

*   **右侧区域 (视觉核心 - 仅桌面端)**:
    *   **组件**: **Interactive Robotic Arm (交互式机械臂)**。
    *   **交互逻辑**:
        *   一个 2D/3D 风格化的机械臂。
        *   **Inverse Kinematics (IK)**: 机械臂的末端执行器 (End Effector) 会跟随用户的鼠标移动。
        *   **隐喻**: 象征着 "智能体对物理世界的感知与操控"。
        *   **背景**: 极简的网格或数据流粒子，不再是具象的“道路”。

### 3.2 内容板块 (Content Sections)
1.  **Hero (首屏)**: 上述左右布局。
2.  **核心支柱 (Core Pillars)**:
    *   从 "World Model for Driving" 改为 "通用世界模型 (General World Model)"。
    *   从 "End-to-End Autonomy" 改为 "端到端具身操控 (End-to-End Embodied Control)"。
    *   从 "Data Loop" 改为 "虚实闭环数据系统 (Sim-Real Data Loop)"。
3.  **技术展示 (Tech Showcase)**:
    *   使用 Bento Grid (便当盒布局) 展示具体技术点（如：触觉感知、灵巧手操作、大模型推理）。
4.  **信任背书 (Trust)**:
    *   合作伙伴 Logos (替换原有的文字统计)。

---

## 4. 交互组件规划 (Component Strategy)

### 4.1 新增组件
*   `components/hero/RoboticArm.tsx`:
    *   技术栈: HTML5 Canvas + TypeScript。
    *   功能: 简单的 3段式 IK 机械臂，鼠标悬停时激活跟随，点击时可能有抓取动作。
*   `components/hero/SplitHero.tsx`:
    *   封装左右布局逻辑，处理响应式切换。

### 4.2 废弃/替换组件
*   `components/interactive-road.tsx`: **移除**。该组件与“具身智能”主题不符。

---

## 5. 执行路线图 (Roadmap)

1.  **Phase 1: 基础设施 (Infrastructure)**
    *   [ ] 配置 `globals.css` 中的新色卡 (CSS Variables)。
    *   [ ] 更新 `layout.tsx` (Metadata, Title)。
    *   [ ] 更新 `Navbar.tsx` 和 `Footer.tsx` 的文案为中文。

2.  **Phase 2: 组件开发 (Component Dev)**
    *   [ ] 开发 `RoboticArm` Canvas 组件。
    *   [ ] 开发 `SplitHero` 布局框架。

3.  **Phase 3: 页面组装 (Page Assembly)**
    *   [ ] 重写 `app/page.tsx`，应用新布局。
    *   [ ] 迁移并翻译 `Research`, `About`, `Team` 等页面内容。

4.  **Phase 4: 润色 (Polishing)**
    *   [ ] 调整动画曲线 (Framer Motion)。
    *   [ ] 移动端适配测试。

