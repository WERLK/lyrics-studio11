#!/bin/bash
# 歌词工坊 - Gitee Pages 自动部署脚本

echo "========================================"
echo "  歌词工坊 - Gitee Pages 部署"
echo "========================================"
echo ""

# 检查当前分支
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: $current_branch"
echo ""

# 构建项目
echo "[1/5] 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi
echo "✅ 构建成功"
echo ""

# 保存当前工作区
echo "[2/5] 保存当前工作区状态..."
git add -u
git stash push -m "temp stash for deployment"
echo ""

# 创建/切换到 gh-pages 分支
echo "[3/5] 准备部署分支..."
if git rev-parse --verify gh-pages > /dev/null 2>&1; then
    # 分支已存在，切换并重置
    echo "切换到 gh-pages 分支..."
    git checkout gh-pages
    git reset --hard master
else
    # 分支不存在，创建
    echo "创建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
fi
echo ""

# 复制构建文件
echo "[4/5] 复制构建文件..."
cp -r dist/* .
echo ""

# 添加 .nojekyll 文件以避免 GitHub Pages 特殊处理
touch .nojekyll
echo ""

# 提交
echo "[5/5] 提交并推送..."
git add .
git commit -m "Deploy to Gitee Pages: $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "========================================"
echo "  📤 准备完成！现在请执行以下命令："
echo "========================================"
echo ""
echo "1. 推送到 Gitee:"
echo "   git push -u gitee gh-pages --force"
echo ""
echo "2. 切回 master 分支（可选）:"
echo "   git checkout master"
echo "   git stash pop"
echo ""
echo "3. 在 Gitee 仓库页面启用 Pages 服务"
echo ""
