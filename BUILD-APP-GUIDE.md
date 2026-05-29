# 歌词工坊 - App 构建指南

## 概述

本项目支持构建 iOS 和 Android 原生应用，使用 Capacitor 框架将 React 应用封装为原生 App。

## 前置条件

### iOS 构建（macOS）
- macOS 12.0+
- Xcode 14.0+
- CocoaPods
- Homebrew

### Android 构建
- Android Studio Hedgehog (2023.1.1) 或更高版本
- JDK 17+
- Android SDK

## 构建步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 构建 Web 应用

```bash
npm run build
```

### 3. 添加原生平台

#### iOS

```bash
npm run cap:add:ios
```

#### Android

```bash
npm run cap:add:android
```

### 4. 同步项目

```bash
npm run cap:sync
```

### 5. 打开原生项目

#### iOS

```bash
npm run cap:open:ios
```

#### Android

```bash
npm run cap:open:android
```

## 在原生 IDE 中构建

### iOS (Xcode)

1. 打开 `ios/App/App.xcworkspace`
2. 选择目标设备或模拟器
3. 点击 "Run" 按钮

### Android (Android Studio)

1. 打开 `android/` 目录
2. 等待 Gradle 同步完成
3. 选择目标设备或模拟器
4. 点击 "Run" 按钮

## 构建发布版本

### iOS

```bash
# 在 Xcode 中
# 1. 选择 "Generic iOS Device" 或具体设备
# 2. 菜单栏: Product > Archive
# 3. 在 Organizer 中选择归档并导出
```

### Android

```bash
# 在 Android Studio 中
# 1. 菜单栏: Build > Generate Signed Bundle / APK
# 2. 选择 "Android App Bundle" 或 "APK"
# 3. 配置签名密钥
```

## 常见问题

### 问题 1: Capacitor CLI 找不到模块

```bash
# 尝试重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 问题 2: Android Gradle 同步失败

确保 Android Studio 安装了正确版本的 Build Tools 和 SDK。

### 问题 3: iOS 构建失败

确保已安装 CocoaPods 并运行：

```bash
cd ios/App
pod install
```

## 目录结构

```
├── android/              # Android 原生项目
├── ios/                  # iOS 原生项目
├── src/                  # React 源代码
├── dist/                 # 构建产物（Web）
├── capacitor.config.ts   # Capacitor 配置
└── ionic.config.json     # Ionic 配置
```

## 注意事项

1. 每次更新 Web 代码后，需要运行 `npm run cap:copy` 或 `npm run cap:sync`
2. 原生资源（图标、启动页）需要在原生项目中单独配置
3. 某些 Capacitor API 需要在原生项目中进行额外配置
