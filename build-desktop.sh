#!/bin/bash

# 歌词工坊 - 桌面版构建脚本

# 设置颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "========================================"
echo "  歌词工坊 - 桌面版构建脚本"
echo "========================================"
echo ""

# 检查操作系统
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="Linux"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    PLATFORM="Windows"
else
    PLATFORM="Unknown"
fi

echo "${YELLOW}检测到系统: $PLATFORM${NC}"
echo ""

# 步骤 1: 安装依赖
echo "[1/4] 正在安装依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "${RED}✗ 依赖安装失败${NC}"
    exit 1
fi
echo "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 步骤 2: 构建 Web 应用和 Electron
echo "[2/4] 正在构建 Web 应用和 Electron..."
npm run build:electron
if [ $? -ne 0 ]; then
    echo "${RED}✗ 构建失败${NC}"
    exit 1
fi
echo "${GREEN}✓ Web 应用和 Electron 构建完成${NC}"
echo ""

# 步骤 3: 打包桌面应用
echo "[3/4] 正在选择构建平台..."
echo ""
echo "请选择要构建的平台："
echo "  1. Windows (推荐)"
echo "  2. macOS"
echo "  3. Linux"
echo "  4. 所有平台"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "[3/4] 正在构建 Windows 安装包..."
        npm run dist:win
        ;;
    2)
        echo ""
        echo "[3/4] 正在构建 macOS 安装包..."
        npm run dist:mac
        ;;
    3)
        echo ""
        echo "[3/4] 正在构建 Linux 安装包..."
        npm run dist:linux
        ;;
    4)
        echo ""
        echo "[3/4] 正在构建所有平台安装包..."
        npm run dist
        ;;
    *)
        echo "${RED}无效的选择${NC}"
        exit 1
        ;;
esac

if [ $? -ne 0 ]; then
    echo "${RED}✗ 构建失败${NC}"
    exit 1
fi

# 步骤 4: 完成
echo ""
echo "[4/4] 构建完成！"
echo ""
echo "========================================"
echo "  构建产物位于 release 目录"
echo "========================================"
echo ""
echo "生成的文件："
ls -lh release/ 2>/dev/null | grep -E '\.(exe|dmg|AppImage|deb|rpm)$' || echo "  无常见格式文件"
echo ""
echo "下一步："
echo "1. 打开 release 目录查看构建产物"
echo "2. 双击安装包进行安装"
echo "3. 或运行便携版（无需安装）"
echo ""
