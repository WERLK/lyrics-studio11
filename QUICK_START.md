# 歌词工坊 - 快速开始指南

## 🚀 快速下载安装

### 📥 已编译好的安装包

#### Windows 用户
1. 下载 `lyrics-studio-1.0.0-win-x64-setup.exe`
2. 双击运行安装程序
3. 安装完成后，双击桌面快捷方式启动

#### macOS 用户
1. 下载 `lyrics-studio-1.0.0-mac-universal.dmg`
2. 打开 DMG 文件
3. 拖拽应用到 Applications 文件夹
4. 从启动台启动应用

#### Linux 用户
1. 下载 `lyrics-studio-1.0.0-linux.AppImage`
2. 右键 > 属性 > 允许执行
3. 双击运行

#### Android 用户
1. 下载 `lyrics-studio-1.0.0-android.apk`
2. 打开手机设置 > 安全 > 开启"未知来源"
3. 点击 APK 文件安装

#### iOS 用户
1. 等待 App Store 审核通过
2. 或加入 TestFlight 测试版获取早期访问

---

## 🔧 自行构建 (高级用户)

### 环境要求

#### 通用
- Node.js 18+
- Git

#### Windows
- Windows 7+
- Node.js 18+

#### macOS
- macOS 10.13+
- Node.js 18+
- Xcode 15+ (iOS构建)

#### Linux
- Ubuntu 18.04+
- Node.js 18+
- JDK 17+ (Android构建)

### 构建步骤

#### 1️⃣ 克隆项目
```bash
git clone https://github.com/WERLK/lyrics-studio11.git
cd lyrics-studio11
```

#### 2️⃣ 安装依赖
```bash
npm install
```

#### 3️⃣ 选择平台构建

**Windows**
```bash
# 方式一: 使用脚本 (推荐)
chmod +x scripts/build-windows.sh
./scripts/build-windows.sh

# 方式二: 手动构建
npm run build
npm run dist:win
```

**macOS**
```bash
chmod +x scripts/build-ios.sh
./scripts/build-ios.sh
```

**Linux**
```bash
npm run build
npm run dist:linux
```

**Android**
```bash
chmod +x scripts/build-android.sh
./scripts/build-android.sh
```

**iOS** (仅 macOS)
```bash
chmod +x scripts/build-ios.sh
./scripts/build-ios.sh
```

---

## 📱 系统要求详情

### PC版

| 系统 | 最低版本 | 推荐版本 | 架构 |
|------|---------|---------|------|
| Windows | 7 SP1 | 10/11 | x64, 32位 |
| macOS | 10.13 | 11+ | x64, ARM64 |
| Linux | Ubuntu 18.04 | 22.04 | x64 |

### 移动版

| 系统 | 最低版本 | 推荐版本 | 存储空间 |
|------|---------|---------|---------|
| Android | 6.0 | 12/13/14 | ~50MB |
| iOS | 13.0 | 16/17 | ~80MB |

---

## ❓ 常见问题

### Q: 安装后无法启动？
**A**: 
- Windows: 安装 Visual C++ Redistributable
- macOS: 系统设置 > 安全性允许应用
- Linux: 确保已安装必要的库

### Q: Android 安装包无法安装？
**A**: 
- 检查系统版本是否 ≥ 6.0
- 开启"未知来源"安装权限
- 检查存储空间是否充足

### Q: iOS 找不到应用？
**A**: 
- 等待 App Store 审核 (通常 1-7 天)
- 加入 TestFlight 获取测试版

### Q: 应用崩溃怎么办？
**A**: 
- 更新到最新版本
- 清除应用缓存
- 重启设备后重试

---

## 📞 获取帮助

- **官方网站**: https://lyricsstudio.com
- **GitHub Issues**: https://github.com/WERLK/lyrics-studio11/issues
- **用户群**: 加入我们的 Discord/Telegram 社区

---

## ✅ 功能清单

- ✅ 歌词生成 (6种风格)
- ✅ MV视频生成
- ✅ 会员系统
- ✅ 广告积分
- ✅ 转盘抽奖
- ✅ 全球100+平台发布指南
- ✅ 登录注册
- ✅ 实名认证
- ✅ 新手引导

---

## 🎯 开始使用

1. 下载适合你系统的版本
2. 安装并启动应用
3. 注册账号或使用游客模式
4. 开始创作你的第一首歌词！
