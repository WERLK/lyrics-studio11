#!/bin/bash

# 歌词工坊 - 项目打包脚本
# Lyrics Studio - Project Packaging Script

echo "🎵 歌词工坊 - 开始打包项目..."
echo ""

# 项目名称
PROJECT_NAME="lyrics-studio"
DATE=$(date +%Y%m%d)
PACKAGE_NAME="${PROJECT_NAME}-package-${DATE}"
TAR_NAME="${PACKAGE_NAME}.tar.gz"

# 需要打包的目录和文件
PACKAGE_DIRS=(
  "src"
  "public"
  "dist"
  "dist-electron"
  "electron"
  "android"
  "ios"
  "miniapp"
  ".github"
  ".trae"
)

PACKAGE_FILES=(
  "package.json"
  "package-lock.json"
  "vite.config.ts"
  "tsconfig.json"
  "tsconfig.electron.json"
  "tailwind.config.js"
  "postcss.config.js"
  "eslint.config.js"
  "index.html"
  "capacitor.config.ts"
  "ionic.config.json"
  "nginx.conf"
  "README.md"
  "PROJECT-PACKAGE.md"
  "PACKING-LIST.md"
  "QUICK-START.md"
  "USER-GUIDE.md"
  "BUILD-GUIDE.md"
  "BUILD-APP-GUIDE.md"
  "MOBILE-BUILD-GUIDE.md"
  "GITHUB-DEPLOY.md"
  "DEPLOY-CHECKLIST.md"
  "README-DESKTOP.md"
  "PROJECT-SUMMARY.md"
  "SCRIPTS.md"
  "build-desktop.sh"
  "build-desktop.bat"
  "build-mobile.sh"
  "build-mobile.bat"
  "deploy.sh"
  "start-dev.bat"
  "package-project.sh"
)

# 创建临时打包目录
echo "📁 创建打包目录..."
mkdir -p /tmp/${PACKAGE_NAME}
cd /tmp/${PACKAGE_NAME}

# 复制源代码目录
echo "📦 复制源代码..."
for dir in "${PACKAGE_DIRS[@]}"; do
  if [ -d "/workspace/${dir}" ]; then
    echo "  ✓ 复制 ${dir}/"
    cp -r "/workspace/${dir}" "/tmp/${PACKAGE_NAME}/"
  fi
done

# 复制文件
echo "📄 复制配置文件..."
for file in "${PACKAGE_FILES[@]}"; do
  if [ -f "/workspace/${file}" ]; then
    echo "  ✓ 复制 ${file}"
    cp "/workspace/${file}" "/tmp/${PACKAGE_NAME}/"
  fi
done

# 复制 .gitignore
if [ -f "/workspace/.gitignore" ]; then
  cp "/workspace/.gitignore" "/tmp/${PACKAGE_NAME}/"
fi

# 创建打包信息
cat > /tmp/${PACKAGE_NAME}/PACKAGE-INFO.txt << 'EOF'
================================
歌词工坊 - 项目打包信息
Lyrics Studio - Package Information
================================

项目名称: 歌词工坊 (Lyrics Studio)
版本: 1.0.0
打包日期: $(date +%Y-%m-%d)

包含内容:
- ✅ 完整的 React Web 应用源码
- ✅ 构建好的网站（dist/ 目录，可直接部署）
- ✅ Electron 桌面应用编译产物（dist-electron/）
- ✅ Electron 桌面应用配置
- ✅ Capacitor 移动应用配置
- ✅ Android 应用项目
- ✅ iOS 应用项目
- ✅ 微信小程序
- ✅ 完整文档和指南
- ✅ GitHub 部署配置
- ✅ 打包脚本

快速开始:
1. 解压: tar -xzf lyrics-studio-package.tar.gz
2. 进入: cd lyrics-studio-package
3. 查看网站: 用浏览器打开 dist/index.html
4. 开发: npm install && npm run dev

详细文档:
- README.md - 项目总览
- QUICK-START.md - 快速开始
- USER-GUIDE.md - 用户指南
- BUILD-GUIDE.md - 构建指南
- GITHUB-DEPLOY.md - GitHub 部署

技术支持:
- 邮箱: contact@lyrics-studio.com
- GitHub: https://github.com/yourusername/lyrics-studio

================================
祝你使用愉快！🎵✨
================================
EOF

# 创建打包
echo ""
echo "📦 开始创建压缩包..."
cd /tmp
tar -czf "${TAR_NAME}" "${PACKAGE_NAME}"

# 移动到工作目录
mv "/tmp/${TAR_NAME}" "/workspace/${TAR_NAME}"

# 显示结果
echo ""
echo "✅ 打包完成！"
echo "📦 压缩包: /workspace/${TAR_NAME}"
echo "📊 大小: $(du -h /workspace/${TAR_NAME} | cut -f1)"
echo ""

# 列出压缩包内容
echo "📋 压缩包内容预览:"
tar -tzf "/workspace/${TAR_NAME}" | head -30
echo "  ... (共 $(tar -tzf /workspace/${TAR_NAME} | wc -l) 个文件)"
echo ""

# 创建解压脚本
cat > "/workspace/unpack-${DATE}.sh" << 'EOF'
#!/bin/bash
# 歌词工坊 - 解压脚本
echo "📦 解压歌词工坊项目..."
tar -xzf lyrics-studio-package-*.tar.gz
cd lyrics-studio-package-*
echo "✅ 解压完成！"
echo "📄 请查看 README.md 了解如何开始使用"
EOF

chmod +x "/workspace/unpack-${DATE}.sh"

echo "📜 解压脚本: /workspace/unpack-${DATE}.sh"
echo ""
echo "🎉 项目打包完成！"
echo ""
echo "使用方法:"
echo "1. 下载 ${TAR_NAME} 文件"
echo "2. 运行 unzip-${DATE}.sh 或手动解压"
echo "3. 按照 README.md 的指引开始使用"
echo ""
