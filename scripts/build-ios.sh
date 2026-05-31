#!/bin/bash
set -e

echo "========================================="
echo "  歌词工坊 - iOS 构建脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 检查环境
check_env() {
    echo -e "${YELLOW}[1/5] 检查构建环境...${NC}"
    
    if [[ "$OSTYPE" != "darwin"* ]]; then
        echo -e "${RED}❌ 错误: iOS 构建只能在 macOS 上进行${NC}"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ 错误: 未安装 Node.js${NC}"
        exit 1
    fi
    
    if [ ! -d "/Applications/Xcode.app" ]; then
        echo -e "${RED}❌ 错误: 未安装 Xcode${NC}"
        echo "请从 App Store 安装 Xcode"
        exit 1
    fi
    
    echo -e "${GREEN}✓ macOS + Xcode 环境检查通过${NC}"
}

# 安装依赖
install_deps() {
    echo -e "${YELLOW}[2/5] 安装项目依赖...${NC}"
    
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
}

# 构建 Web 应用
build_web() {
    echo -e "${YELLOW}[3/5] 构建 Web 应用...${NC}"
    
    npm run build
    
    if [ ! -d "dist" ]; then
        echo -e "${RED}❌ 错误: Web 构建失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Web 应用构建完成${NC}"
}

# 添加 iOS 平台
add_ios() {
    echo -e "${YELLOW}[4/5] 配置 iOS 项目...${NC}"
    
    if [ ! -d "ios" ]; then
        npx cap add ios
        echo -e "${GREEN}✓ iOS 平台添加完成${NC}"
    else
        echo "iOS 平台已存在"
    fi
    
    npx cap copy ios
    npx cap sync ios
    echo -e "${GREEN}✓ 项目同步完成${NC}"
}

# 构建 iOS 项目
build_ios() {
    echo -e "${YELLOW}[5/5] 构建 iOS 项目...${NC}"
    
    cd ios
    
    # 列出可用模拟器
    echo "可用模拟器:"
    xcrun simctl list devices available | grep -E "iPhone|iPad" | head -5
    
    # 获取项目名称
    PROJECT_NAME=$(ls -d *.xcodeproj 2>/dev/null | sed 's/.xcodeproj//' || ls -d *.xcworkspace 2>/dev/null | sed 's/.xcworkspace//' | sed 's/App\///')
    
    if [ -z "$PROJECT_NAME" ]; then
        PROJECT_NAME="App"
    fi
    
    echo "项目名称: $PROJECT_NAME"
    
    # 构建 (使用模拟器)
    xcodebuild -workspace "$PROJECT_NAME.xcworkspace" -scheme "$PROJECT_NAME" -configuration Release -destination 'generic/platform=iOS Simulator' build CODE_SIGNING_ALLOWED=NO
    
    cd ..
    
    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  ✅ iOS 构建完成！${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo "📦 构建产物位置: ios/build/"
    echo ""
    echo "🍎 运行应用:"
    echo "1. 打开 Xcode: open ios/App.xcworkspace"
    echo "2. 选择目标设备 (模拟器或真机)"
    echo "3. 点击 Run (⌘+R) 运行"
    echo ""
    echo "📱 发布到真机:"
    echo "1. 配置 Apple Developer 账号"
    echo "2. 设置 Bundle Identifier"
    echo "3. Product > Archive"
    echo "4. 使用 Transporter 上传 App Store"
}

# 主函数
main() {
    echo "歌词工坊 iOS 构建工具"
    echo ""
    
    check_env
    install_deps
    build_web
    add_ios
    build_ios
    
    echo ""
    echo -e "${YELLOW}下一步:${NC}"
    echo "1. 打开 Xcode"
    echo "2. 选择设备并运行"
    echo "3. 或使用 Transporter 发布到 App Store"
    echo ""
}

main "$@"
