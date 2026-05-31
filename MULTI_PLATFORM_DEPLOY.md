# 歌词工坊 - 多平台部署指南

## 📦 支持的平台和系统版本

### 🖥️ PC桌面版

#### Windows
- **最低版本**: Windows 7 (SP1) / Windows 8.1
- **推荐版本**: Windows 10 (1903+) / Windows 11
- **架构支持**: x64 (64-bit), ia32 (32-bit)
- **安装包格式**: 
  - `.exe` (NSIS 安装程序) - 推荐
  - `.exe` (Portable 便携版) - 无需安装

#### macOS
- **最低版本**: macOS 10.13 (High Sierra)
- **推荐版本**: macOS 11 (Big Sur)+
- **架构支持**: 
  - x64 (Intel)
  - arm64 (Apple Silicon/M1-M3)
  - universal (通用二进制)
- **安装包格式**:
  - `.dmg` (磁盘镜像) - 推荐
  - `.zip` (压缩包)

#### Linux
- **最低版本**: Ubuntu 18.04 / Debian 10 / Fedora 28+
- **推荐版本**: Ubuntu 22.04 LTS / Debian 12 / Fedora 38+
- **架构支持**: x64
- **安装包格式**:
  - `.AppImage` - 推荐（通用格式）
  - `.deb` (Debian/Ubuntu)
  - `.rpm` (Fedora/RHEL)
  - `.snap` (Snap Store)

### 📱 Android移动版

#### 支持版本
- **最低版本**: Android 6.0 (API 23) Marshmallow
- **推荐版本**: Android 10 (API 29)+
- **目标版本**: Android 14 (API 34)
- **编译SDK**: Android SDK 34

#### 设备支持
- 手机 (Phones)
- 平板 (Tablets)
- 折叠屏设备 (Foldables)
- Android TV

#### 安装包格式
- `.apk` (Android Package) - 直接安装
- `.aab` (Android App Bundle) - Google Play发布用

#### 权限需求
- 网络访问 (互联网)
- 存储访问 (下载歌词/MV)
- 相机 (可选 - 实名认证)

### 🍎 iOS移动版

#### 支持版本
- **最低版本**: iOS 13.0
- **推荐版本**: iOS 16.0+
- **目标版本**: iOS 17.0

#### 设备支持
- iPhone (所有型号)
- iPad (所有型号)
- iPod Touch

#### 安装包格式
- `.ipa` (iOS App Store Package)
- `.xcarchive` (Xcode归档)

#### 发布方式
- App Store (全球发布)
- TestFlight (测试版)
- Ad Hoc (企业内部分发)
- Enterprise (企业签名)

---

## 🚀 快速开始

### 前置要求

#### 通用工具
```bash
# Node.js 18+ (推荐 Node.js 20 LTS)
node --version  # v20.x.x

# Git
git --version   # 2.x.x

# npm 或 yarn
npm --version   # 9.x.x 或更高
```

#### 移动端额外要求
```bash
# Android
Android Studio (最新版)
Android SDK 34
JDK 17

# iOS (仅 macOS)
Xcode 15+
Apple Developer 账号
```

---

## 📥 下载地址

### 已编译的安装包

#### Windows
```url
# NSIS 安装程序
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-win-x64-setup.exe
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-win-ia32-setup.exe

# Portable 便携版
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-win-x64-portable.exe
```

#### macOS
```url
# DMG 安装包
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-mac-x64.dmg
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-mac-arm64.dmg
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-mac-universal.dmg

# ZIP 压缩包
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-mac.zip
```

#### Linux
```url
# AppImage (通用)
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-linux.AppImage

# DEB
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-linux-amd64.deb

# RPM
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-linux-x86_64.rpm
```

#### Android
```url
# APK 直接下载
https://github.com/WERLK/lyrics-studio11/releases/latest/download/lyrics-studio-1.0.0-android.apk

# Google Play
https://play.google.com/store/apps/details?id=com.lyricsstudio.app
```

#### iOS
```url
# TestFlight 测试版 (需要邀请码)
https://testflight.apple.com/join/XXXXXXXX

# App Store
https://apps.apple.com/app/idXXXXXXXXX
```

---

## 🔧 自行构建

### 1️⃣ 克隆项目
```bash
git clone https://github.com/WERLK/lyrics-studio11.git
cd lyrics-studio11
npm install
```

### 2️⃣ 构建Web应用
```bash
npm run build
```

### 3️⃣ 构建各平台应用

#### 🖥️ PC桌面版

```bash
# 构建 Windows
npm run dist:win

# 构建 macOS
npm run dist:mac

# 构建 Linux
npm run dist:linux

# 构建所有平台
npm run dist
```

构建产物位于: `release/`

#### 📱 Android

```bash
# 添加 Android 平台
npx cap add android

# 复制 Web 资源
npx cap copy android

# 同步到 Android 项目
npx cap sync android

# 打开 Android Studio
npx cap open android

# 或直接构建 APK
cd android
./gradlew assembleRelease  # 发布版
./gradlew assembleDebug   # 调试版

# APK 位置: android/app/build/outputs/apk/
```

**签名 APK**
```bash
# 生成签名密钥
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 使用签名构建
cd android
./gradlew assembleRelease -signed
```

#### 🍎 iOS

```bash
# 添加 iOS 平台
npx cap add ios

# 复制 Web 资源
npx cap copy ios

# 同步到 iOS 项目
npx cap sync ios

# 打开 Xcode
npx cap open ios

# 在 Xcode 中:
# 1. 选择签名团队
# 2. 设置 Bundle Identifier
# 3. Product > Archive
# 4. 导出 .ipa
```

**发布到 App Store**
```bash
# 使用 Xcode 或 Transporter 上传
# 1. 登录 App Store Connect
# 2. 创建 App 记录
# 3. 上传 .ipa 或 .xcarchive
```

---

## 📋 系统要求汇总表

| 平台 | 最低版本 | 推荐版本 | 架构 | 包格式 |
|------|---------|---------|------|-------|
| Windows | 7 SP1 | 10/11 | x64, ia32 | .exe (NSIS/PORTABLE) |
| macOS | 10.13 | 11+ | x64, arm64, universal | .dmg, .zip |
| Linux | Ubuntu 18.04 | Ubuntu 22.04 | x64 | AppImage, .deb, .rpm |
| Android | 6.0 (API 23) | 14 (API 34) | arm64, x86 | .apk, .aab |
| iOS | 13.0 | 17.0 | arm64 | .ipa |

---

## ⚙️ 功能对比

| 功能 | PC版 | Android版 | iOS版 |
|------|------|----------|-------|
| 歌词生成 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| MV生成 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 全球平台 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 会员系统 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 登录注册 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 实名认证 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 新手引导 | ✅ 完整 | ✅ 完整 | ✅ 完整 |
| 离线使用 | ✅ 支持 | ⚠️ 部分 | ⚠️ 部分 |
| 系统通知 | ❌ 不支持 | ✅ 支持 | ✅ 支持 |
| 快捷键 | ✅ 支持 | ❌ 不支持 | ❌ 不支持 |

---

## 🐛 常见问题

### Q1: Windows 安装失败？
**A**: 
- 检查杀毒软件是否拦截
- 右键安装包 > 属性 > 解除锁定
- 安装 Visual C++ Redistributable

### Q2: macOS 无法打开？
**A**: 
- 系统偏好设置 > 安全性与隐私 > 允许"任何来源"
- 或右键 > 打开 > 仍要打开

### Q3: Android APK 无法安装？
**A**: 
- 检查是否开启"未知来源"
- 检查存储空间是否充足
- 确认系统版本 ≥ 6.0

### Q4: iOS TestFlight 闪退？
**A**: 
- 更新到最新 iOS 版本
- 重新下载 TestFlight
- 检查网络连接

### Q5: 桌面版无法启动？
**A**: 
- 检查 Node.js 版本是否 ≥ 18
- 删除缓存: `rm -rf node_modules/.cache`
- 重新安装: `rm -rf node_modules && npm install`

---

## 📞 获取帮助

- **GitHub Issues**: https://github.com/WERLK/lyrics-studio11/issues
- **邮箱**: support@lyricsstudio.com
- **官方网站**: https://lyricsstudio.com

---

## 📄 许可证

MIT License - 可免费商用，但请保留版权声明
