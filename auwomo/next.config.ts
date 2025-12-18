import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 部署推荐：构建出可独立运行的最小 Node 产物（.next/standalone）
  output: "standalone",
};

export default nextConfig;
