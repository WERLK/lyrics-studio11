#!/bin/bash
set -e

echo "========================================"
echo "  歌词工坊 - 打包部署文件"
echo "========================================"
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "错误：请在项目根目录运行此脚本"
    exit 1
fi

# 构建项目
echo "[1/3] 正在构建项目..."
npm run build
echo "构建完成！"
echo ""

# 创建临时目录
echo "[2/3] 正在准备部署文件..."
TEMP_DIR=$(mktemp -d)
DEPLOY_DIR="$TEMP_DIR/lyrics-studio-deploy"
mkdir -p "$DEPLOY_DIR"

# 复制文件
cp -r dist/ "$DEPLOY_DIR/"
cp server-deploy.sh "$DEPLOY_DIR/"
cp 云服务器部署指南.md "$DEPLOY_DIR/"
cp nginx.conf "$DEPLOY_DIR/"

# 赋予执行权限
chmod +x "$DEPLOY_DIR/server-deploy.sh"

# 创建版本信息
cat > "$DEPLOY_DIR/VERSION.txt" << EOF
歌词工坊部署包
版本: 1.0.0
创建时间: $(date '+%Y-%m-%d %H:%M:%S')
EOF

# 创建 README
cat > "$DEPLOY_DIR/README.txt" << EOF
歌词工坊 - 部署包
==================

快速开始：
1. 将此文件夹上传到云服务器
2. SSH 登录服务器
3. 进入文件夹：cd lyrics-studio-deploy
4. 运行部署脚本：sudo bash server-deploy.sh

详细说明请查看：云服务器部署指南.md

文件说明：
- dist/              网站构建文件
- server-deploy.sh  自动部署脚本
- nginx.conf        Nginx 配置文件
- 云服务器部署指南.md  详细部署文档

EOF

echo "文件准备完成！"
echo ""

# 打包
echo "[3/3] 正在创建部署包..."
OUTPUT_FILE="lyrics-studio-deploy-$(date '+%Y%m%d-%H%M%S').tar.gz"
cd "$TEMP_DIR"
tar -czf "$OUTPUT_FILE" lyrics-studio-deploy/
cd - > /dev/null

# 移动到当前目录
mv "$TEMP_DIR/$OUTPUT_FILE" .

# 清理临时目录
rm -rf "$TEMP_DIR"

# 获取文件大小
FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)

echo ""
echo "========================================"
echo "  ✅ 打包完成！"
echo "========================================"
echo ""
echo "📦 部署包：$OUTPUT_FILE"
echo "📊 文件大小：$FILE_SIZE"
echo ""
echo "🚀 上传到服务器的命令："
echo "   scp $OUTPUT_FILE root@your-server-ip:/root/"
echo ""
echo "📖 服务器上的操作："
echo "   cd /root"
echo "   tar -xzf $OUTPUT_FILE"
echo "   cd lyrics-studio-deploy"
echo "   sudo bash server-deploy.sh"
echo ""
