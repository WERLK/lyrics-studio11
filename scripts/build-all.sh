#!/bin/bash
set -e

echo "========================================="
echo "  歌词工坊 - 全平台构建打包脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PLATFORM=$1

if [ -z "$PLATFORM" ]; then
    echo "使用方法: $0 <platform>"
    echo ""
    echo "支持的平台:"
    echo "  all        - 构建所有平台"
    echo "  windows    - 仅构建 Windows"
    echo "  macos      - 仅构建 macOS"
    echo "  linux      - 仅构建 Linux"
    echo "  android    - 仅构建 Android"
    echo "  ios        - 仅构建 iOS (仅 macOS)"
    echo ""
    echo "示例:"
    echo "  $0 all       # 构建所有平台"
    echo "  $0 android   # 仅构建 Android"
    exit 1
fi

echo "选择的平台: $PLATFORM"
echo ""

case $PLATFORM in
    all)
        echo -e "${YELLOW}开始构建所有平台...${NC}"
        ;;
    windows)
        echo -e "${YELLOW}开始构建 Windows...${NC}"
        ;;
    macos)
        echo -e "${YELLOW}开始构建 macOS...${NC}"
        ;;
    linux)
        echo -e "${YELLOW}开始构建 Linux...${NC}"
        ;;
    android)
        echo -e "${YELLOW}开始构建 Android...${NC}"
        ;;
    ios)
        echo -e "${YELLOW}开始构建 iOS...${NC}"
        ;;
    *)
        echo -e "${RED}错误: 不支持的平台: $PLATFORM${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ 平台选择完成${NC}"
echo ""
echo "下一步:"
echo "1. 运行对应的构建脚本:"
case $PLATFORM in
    all)
        echo "   - ./scripts/build-windows.sh"
        echo "   - ./scripts/build-android.sh"
        echo "   - (macOS) ./scripts/build-ios.sh"
        ;;
    windows)
        echo "   - ./scripts/build-windows.sh"
        ;;
    android)
        echo "   - ./scripts/build-android.sh"
        ;;
    ios)
        echo "   - ./scripts/build-ios.sh"
        ;;
    *)
        echo "   - npm run dist:$PLATFORM"
        ;;
esac
echo ""
echo "2. 查看 release/ 目录获取构建产物"
echo "3. 查看 README 文件了解部署详情"
echo ""
