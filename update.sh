#!/bin/bash

# 遇到错误立即停止
set -e

# 进入项目根目录
cd "$(dirname "$0")"

# echo "🔄 开始更新流程..."

# # 1. 拉取最新代码 (如果这是一个 git 仓库)
# if [ -d ".git" ]; then
#     echo "📥 拉取最新 Git 代码..."
#     git pull
# else
#     echo "⚠️  当前不是 Git 仓库，跳过 git pull (假设你通过其他方式上传了新代码)"
# fi

# 2. 重新构建并启动容器
# 如果有参数 (例如 ./update.sh auwomo)，则只更新该服务
if [ -n "$1" ]; then
    echo "🏗️  正在构建并更新服务: $1 ..."
    sudo docker compose build "$1"
    sudo docker compose up -d "$1"
else
    echo "🏗️  正在构建并更新所有服务..."
    sudo docker compose build
    sudo docker compose up -d
fi

# 3. 清理未使用的旧镜像 (释放磁盘空间)
echo "🧹 清理旧镜像..."
sudo docker image prune -f

echo "✅ 更新完成！"

