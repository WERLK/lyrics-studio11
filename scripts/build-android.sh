#!/bin/bash
set -e

echo "========================================="
echo "  歌词工坊 - Android APK 构建脚本"
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
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ 错误: 未安装 Node.js${NC}"
        exit 1
    fi
    
    if ! command -v java &> /dev/null; then
        echo -e "${RED}❌ 错误: 未安装 JDK${NC}"
        echo "请安装 JDK 17+: https://adoptium.net/"
        exit 1
    fi
    
    if [ ! -d "$ANDROID_HOME" ] && [ ! -d "$ANDROID_SDK_ROOT" ]; then
        echo -e "${RED}❌ 错误: 未配置 Android SDK${NC}"
        echo "请安装 Android Studio 或配置 ANDROID_HOME"
        exit 1
    fi
    
    echo -e "${GREEN}✓ 环境检查通过${NC}"
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

# 添加 Android 平台
add_android() {
    echo -e "${YELLOW}[4/5] 配置 Android 项目...${NC}"
    
    if [ ! -d "android" ]; then
        npx cap add android
        echo -e "${GREEN}✓ Android 平台添加完成${NC}"
    else
        echo "Android 平台已存在"
    fi
    
    npx cap copy android
    npx cap sync android
    echo -e "${GREEN}✓ 项目同步完成${NC}"
}

# 构建 APK
build_apk() {
    echo -e "${YELLOW}[5/5] 构建 APK 安装包...${NC}"
    
    cd android
    ./gradlew assembleRelease
    
    if [ ! -f "app/build/outputs/apk/release/app-release.apk" ]; then
        echo -e "${RED}❌ 错误: APK 构建失败${NC}"
        exit 1
    fi
    
    # 复制到 release 目录
    mkdir -p ../release
    cp app/build/outputs/apk/release/app-release.apk ../release/lyrics-studio-release.apk
    
    # 也生成调试版
    ./gradlew assembleDebug
    cp app/build/outputs/apk/debug/app-debug.apk ../release/lyrics-studio-debug.apk
    
    cd ..
    
    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  ✅ Android APK 构建完成！${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo "📦 APK 文件位置: release/"
    echo ""
    echo "📱 安装方式:"
    echo "1. 将 APK 文件传输到手机"
    echo "2. 打开手机设置 > 安全 > 开启'未知来源'"
    echo "3. 点击 APK 文件开始安装"
    echo ""
    echo "🔍 调试版: release/lyrics-studio-debug.apk"
    echo "📦 发布版: release/lyrics-studio-release.apk"
}

# 主函数
main() {
    echo "歌词工坊 Android APK 构建工具"
    echo ""
    
    check_env
    install_deps
    build_web
    add_android
    build_apk
    
    echo ""
    echo -e "${YELLOW}下一步:${NC}"
    echo "1. 将 APK 文件复制到手机"
    echo "2. 安装并启动应用"
    echo "3. 开启音乐创作之旅！"
    echo ""
}

main "$@"
