#!/bin/bash
set -e

echo "========================================="
echo "  歌词工坊 - Windows 安装包构建脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 检查环境
check_env() {
    echo -e "${YELLOW}[1/4] 检查构建环境...${NC}"
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ 错误: 未安装 Node.js${NC}"
        echo "请先安装 Node.js 18+: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ 错误: Node.js 版本过低${NC}"
        echo "需要 Node.js 18+，当前版本: $(node -v)"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Node.js 版本正确: $(node -v)${NC}"
}

# 安装依赖
install_deps() {
    echo -e "${YELLOW}[2/4] 安装项目依赖...${NC}"
    
    if [ ! -d "node_modules" ]; then
        npm install
    else
        echo "依赖已存在，跳过安装"
    fi
    
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
}

# 构建 Web 应用
build_web() {
    echo -e "${YELLOW}[3/4] 构建 Web 应用...${NC}"
    
    npm run build
    
    if [ ! -d "dist" ]; then
        echo -e "${RED}❌ 错误: 构建失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Web 应用构建完成${NC}"
}

# 构建 Windows 安装包
build_windows() {
    echo -e "${YELLOW}[4/4] 构建 Windows 安装包...${NC}"
    
    npm run dist:win
    
    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  ✅ Windows 构建完成！${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo "📦 安装包位置: release/"
    echo ""
    ls -lh release/*.exe 2>/dev/null || echo "查看 release 目录获取安装包"
}

# 主函数
main() {
    echo "歌词工坊 Windows 安装包构建工具"
    echo ""
    
    check_env
    install_deps
    build_web
    build_windows
    
    echo ""
    echo -e "${YELLOW}使用说明:${NC}"
    echo "1. 双击 .exe 文件开始安装"
    echo "2. 安装完成后，双击桌面快捷方式启动"
    echo "3. 享受歌词创作的乐趣！"
    echo ""
}

main "$@"
