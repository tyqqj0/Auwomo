# Project Redesign Plan: Westlake Data Intelligence

## 1. Project Overview
**Goal**: Transform the existing "Auwomo" (Autonomous Driving) website into "Westlake Data Intelligence" (Embodied AI / Data Intelligence).
**Language**: English -> Chinese (Simplified).
**Core Identity**: From "Sim2Real for Cars" to "General Purpose Embodied Intelligence & Data Loops".

## 2. UI/UX Strategy

### 2.1 Layout Redesign (Homepage)
The current "Scrollytelling Road" layout will be replaced with a modern **Split-Screen (Left/Right) Layout**.

*   **Left Column (Content)**:
    *   Branding: "Westlake Data Intelligence" (西湖数据智能).
    *   Headline: "具身智能的数据基座" (Data Foundation for Embodied AI).
    *   Sub-headline: Explanation of the mission (Data Loop, World Models, Sim2Real).
    *   CTA Buttons: "探索研究" (Research), "关于我们" (About).
    *   **Style**: Clean typography, high readability, academic yet modern.

*   **Right Column (Interactive)**:
    *   **Content**: A stylized 2D Robotic Arm simulation.
    *   **Behavior**: The arm follows the mouse cursor (Inverse Kinematics).
    *   **Device**: **Desktop Only**. On mobile, this column disappears or is replaced by a static hero image.

### 2.2 Color & Style
We will utilize the existing "Lab/Science" theme found in `globals.css`, which is excellent for this purpose.

*   **Primary**: Science Blue (`hsl(221 83% 53%)`) - Trust & Intelligence.
*   **Background**: Ice White (`hsl(210 40% 98%)`) / Deep Ocean Blue (Dark Mode).
*   **Accent**: Lab Cyan (`hsl(189 94% 43%)`) - Innovation.
*   **Visual Elements**: Grid backgrounds (`grid-bg`), clean lines, "Glassmorphism" cards (`glass-panel`).

## 3. Core Component: Interactive Robot Arm
**File**: `components/interactive-robot-arm.tsx` (New)
**Technology**: HTML5 Canvas (2D Context).

**Features**:
1.  **Inverse Kinematics (IK)**: A multi-jointed arm (Base, Shoulder, Elbow, Wrist) that calculates joint angles to point the end-effector at the mouse position.
2.  **Visual Style**:
    *   Minimalist geometric shapes (circles for joints, rounded rectangles for links).
    *   Colors match the theme (Primary Blue / Accent Cyan).
    *   "Data Stream" effects: Subtle particles or lines connecting the arm to the environment, symbolizing "Data Intelligence".
3.  **Responsiveness**:
    *   Listens to mouse events.
    *   Smooth animation loop (`requestAnimationFrame`).

## 4. Content Migration & Localization

### 4.1 Global Config
*   **`app/layout.tsx`**:
    *   Update `<title>` to "Westlake Data Intelligence | 具身智能数据基座".
    *   Update metadata description.
*   **`components/layout/Navbar.tsx`**:
    *   Logo text -> "Westlake Data Intelligence".
    *   Menu items -> 首页, 研究, 团队, 关于, 联系我们.
*   **`components/layout/Footer.tsx`**:
    *   Address -> Westlake University, Hangzhou (CN).
    *   Copyright -> Westlake Data Intelligence.

### 4.2 Pages
*   **Home (`app/page.tsx`)**:
    *   Implement Split Layout.
    *   Replace `InteractiveRoad` with `InteractiveRobotArm`.
    *   Rewrite "Research Pillars" section to "Embodied AI Pillars" (e.g., World Models, Manipulation Data, Sim2Real).
*   **Research (`app/research/page.tsx`)**:
    *   Translate terms.
    *   BEV/Driving terms -> Embodied Perception / General World Models.
*   **Team (`app/team/page.tsx`)**:
    *   Translate bios.
*   **About (`app/about/page.tsx`)**:
    *   Mission statement update -> "Building the General Brain for Robots".

## 5. Implementation Roadmap

1.  **Setup**: Clean up `page.tsx` and remove the old "Road" scroll logic.
2.  **Component**: Build `InteractiveRobotArm.tsx`.
3.  **Layout**: Implement the Left/Right Hero section in `page.tsx`.
4.  **Localization**: Update Navbar, Footer, and Metadata.
5.  **Content**: Go through inner pages (Research/Team/About) and translate/update text.
6.  **Polish**: Check responsiveness and dark mode.

