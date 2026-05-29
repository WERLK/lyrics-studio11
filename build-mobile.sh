#!/bin/bash

# 歌词工坊 - 移动应用构建脚本

# 设置颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "========================================"
echo "  歌词工坊 - 移动应用构建"
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
echo "[1/6] 正在安装依赖..."
npm install
if [ $? -ne 0 ]; then
    echo "${RED}✗ 依赖安装失败${NC}"
    exit 1
fi
echo "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 步骤 2: 构建 Web 应用
echo "[2/6] 正在构建 Web 应用..."
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}✗ Web 应用构建失败${NC}"
    exit 1
fi
echo "${GREEN}✓ Web 应用构建完成${NC}"
echo ""

# 步骤 3: 同步到移动平台
echo "[3/6] 正在同步到移动平台..."
npm run cap:sync
if [ $? -ne 0 ]; then
    echo "${RED}✗ 同步失败${NC}"
    exit 1
fi
echo "${GREEN}✓ 同步完成${NC}"
echo ""

# 步骤 4: 选择平台
echo "[4/6] 请选择要构建的平台："
echo ""
echo "  1. Android APK（推荐，直接安装到手机）"
echo "  2. iOS App（仅 macOS，需要 Xcode）"
echo "  3. 两个都构建"
echo ""

read -p "请输入选择 (1-3): " choice

# 步骤 5: 构建
echo "[5/6] 正在构建应用..."
echo ""

case $choice in
    1)
        echo "${YELLOW}正在构建 Android 应用...${NC}"
        if [ -d "android" ]; then
            cd android
            ./gradlew assembleDebug
            if [ $? -ne 0 ]; then
                echo "${RED}✗ Android 构建失败${NC}"
                exit 1
            fi
            cd ..
            echo ""
            echo "${GREEN}✓ Android APK 构建成功！${NC}"
            echo ""
            echo "APK 文件位置："
            find android -name "*.apk" -type f 2>/dev/null
        else
            echo "${RED}✗ Android 平台未添加${NC}"
            echo "请先运行: npm run cap:add:android"
            exit 1
        fi
        ;;
    2)
        if [[ "$PLATFORM" == "macOS" ]]; then
            echo "${YELLOW}正在构建 iOS 应用...${NC}"
            if [ -d "ios" ]; then
                cd ios
                xcodebuild -workspace App/App.xcworkspace -scheme App -configuration Release -sdk iphoneos -arch arm64 build CODE_SIGNING_ALLOWED=NO
                if [ $? -ne 0 ]; then
                    echo "${RED}✗ iOS 构建失败${NC}"
                    exit 1
                fi
                cd ..
                echo ""
                echo "${GREEN}✓ iOS App 构建成功！${NC}"
                echo ""
                echo "构建产物位置：ios/App/App/build/"
            else
                echo "${RED}✗ iOS 平台未添加${NC}"
                echo "请先运行: npm run cap:add:ios"
                exit 1
            fi
        else
            echo "${RED}✗ iOS 构建仅在 macOS 系统上可用${NC}"
            exit 1
        fi
        ;;
    3)
        echo "${YELLOW}正在构建两个平台的应用...${NC}"
        
        # Android
        if [ -d "android" ]; then
            echo ""
            echo "--- 构建 Android ---"
            cd android
            ./gradlew assembleDebug
            if [ $? -ne 0 ]; then
                echo "${RED}✗ Android 构建失败${NC}"
                exit 1
            fi
            cd ..
            echo "${GREEN}✓ Android APK 构建成功${NC}"
        else
            echo "${RED}⚠ Android 平台未添加，跳过${NC}"
        fi
        
        # iOS (仅 macOS)
        if [[ "$PLATFORM" == "macOS" ]]; then
            if [ -d "ios" ]; then
                echo ""
                echo "--- 构建 iOS ---"
                cd ios
                xcodebuild -workspace App/App.xcworkspace -scheme App -configuration Release -sdk iphoneos -arch arm64 build CODE_SIGNING_ALLOWED=NO
                if [ $? -ne 0 ]; then
                    echo "${RED}✗ iOS 构建失败${NC}"
                    exit 1
                fi
                cd ..
                echo "${GREEN}✓ iOS App 构建成功${NC}"
            else
                echo "${RED}⚠ iOS 平台未添加，跳过${NC}"
            fi
        else
            echo "${YELLOW}⚠ iOS 构建需要 macOS 系统，当前跳过${NC}"
        fi
        ;;
    *)
        echo "${RED}无效的选择${NC}"
        exit 1
        ;;
esac

# 步骤 6: 完成
echo ""
echo "[6/6] 构建完成！"
echo ""
echo "========================================"
echo "  歌词工坊 - 构建产物"
echo "========================================"
echo ""

# 列出构建产物
if [ -d "android" ]; then
    echo "📱 Android APK:"
    find android -name "*.apk" -type f 2>/dev/null | while read file; do
        echo "   $file"
        ls -lh "$file" 2>/dev/null | awk '{print "   大小: " $5}'
    done
    echo ""
fi

if [ -d "ios" ] && [[ "$PLATFORM" == "macOS" ]]; then
    echo "🍎 iOS App:"
    echo "   ios/App/App/build/"
    echo ""
fi

echo "下一步："
if [ "$choice" == "1" ] || [ "$choice" == "3" ]; then
    echo "1. 将 APK 文件传输到手机"
    echo "2. 在手机上安装 APK（可能需要允许未知来源）"
    echo "3. 打开歌词工坊 App 开始使用"
fi

if [ "$choice" == "2" ] || [ "$choice" == "3" ]; then
    if [[ "$PLATFORM" == "macOS" ]]; then
        echo ""
        echo "iOS 安装方法："
        echo "1. 在 Xcode 中打开 ios/App/App.xcworkspace"
        echo "2. 连接 iPhone 或 iPad"
        echo "3. 点击 Run 运行应用"
        echo "或使用 Xcode 导出为 IPA 文件安装"
    fi
fi

echo ""
echo "${GREEN}🎉 恭喜！移动应用构建成功！${NC}"
echo ""
