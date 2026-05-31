# 歌词工坊 - 三端互通完整指南

## 📱 概览

歌词工坊已支持 **桌面端 (Windows/macOS/Linux)**、**移动端 (iOS/Android)**、**网页端 (Web)** 三大平台数据互通！

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.0 或更高版本
- **npm**: 9.0 或更高版本
- **Git**: 2.0 或更高版本

### 安装依赖

```bash
npm install
```

### 构建Web应用

```bash
npm run build
```

## 🖥️ 桌面端 (Electron)

### 功能特性

- 本地数据持久化存储
- 文件系统访问
- 系统通知
- 窗口管理
- 快捷键支持

### 支持平台

| 平台 | 最低版本 | 推荐版本 | 架构支持 |
|------|----------|----------|----------|
| Windows | 7 SP1 | 10/11 | x64, ia32 |
| macOS | 10.13 | 11+ | x64, arm64, universal |
| Linux | Ubuntu 18.04 | 22.04 | x64 |

### 构建桌面应用

```bash
# 构建所有平台
npm run dist

# 只构建 Windows
npm run dist:win

# 只构建 macOS
npm run dist:mac

# 只构建 Linux
npm run dist:linux
```

### 输出文件

构建完成后，安装包位于 `release/` 目录：

- **Windows**: `.exe` (NSIS 安装程序)、`.exe` (Portable)
- **macOS**: `.dmg`、`.zip`
- **Linux**: `.AppImage`、`.deb`、`.rpm`、`.snap`

### 桌面端数据存储

- 数据自动保存到用户数据目录
- 支持导出/导入 JSON 数据文件
- 与 Web/移动端数据格式兼容

## 📱 移动端 (Capacitor)

### 功能特性

- 原生应用体验
- 本地数据持久化
- 推送通知支持
- 相机/相册访问
- 文件系统访问
- 手势操作优化

### 支持平台

| 平台 | 最低版本 | 推荐版本 | 架构支持 |
|------|----------|----------|----------|
| Android | 6.0 (API 23) | 12/13/14 | arm64, x86 |
| iOS | 13.0 | 16/17 | arm64 |

### 构建移动端应用

#### 前置要求

**Android**:
- Android Studio (最新版)
- Android SDK 34+
- JDK 17+

**iOS** (仅 macOS):
- Xcode 15+
- Apple Developer 账号 (发布需要)

#### 构建步骤

```bash
# 1. 先构建 Web 应用
npm run build

# 2. 添加平台 (首次需要)
npm run cap:add:android
npm run cap:add:ios

# 3. 同步资源
npm run cap:copy
npm run cap:sync

# 4. 打开 IDE 构建
npm run cap:open:android
npm run cap:open:ios
```

#### Android APK 构建

```bash
cd android
./gradlew assembleRelease  # 发布版本
./gradlew assembleDebug   # 调试版本
```

APK 输出位置: `android/app/build/outputs/apk/`

#### iOS 应用构建

1. 打开 Xcode
2. 选择签名团队
3. Product -> Archive
4. Organizer -> Distribute App

### 移动端数据存储

- 使用 Capacitor Preferences API
- 数据加密存储 (可选)
- 支持导入/导出备份
- 与 Web/桌面端数据格式兼容

## 🌐 网页端 (Web)

### 功能特性

- PWA 支持 (可安装到桌面/手机)
- 离线可用
- 响应式设计
- 跨浏览器兼容
- 本地存储持久化

### 支持浏览器

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 部署选项

#### 1. GitHub Pages (免费)

```bash
# 已经配置好 GitHub Actions
# 直接推送代码到 master 分支即可自动部署
```

#### 2. Netlify (免费/付费)

```bash
# 通过 Netlify 网站连接 GitHub 仓库
# 或使用 Netlify CLI
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

#### 3. VPS (Nginx)

```bash
# 上传 dist 目录内容到服务器
# 配置 Nginx:
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 网页端数据存储

- LocalStorage (默认)
- IndexedDB (可选，大数据量)
- 支持导入/导出 JSON 文件
- 与桌面/移动端数据格式兼容

## 🔄 三端数据互通

### 数据格式

所有平台使用统一的 JSON 数据格式：

```json
{
  "version": "1.0.0",
  "timestamp": 1234567890,
  "deviceId": "device_abc123",
  "data": {
    "lyrics": [...],
    "mvs": [...],
    "user": { ... },
    "settings": { ... },
    "membership": { ... }
  }
}
```

### 同步方案

#### 方案一: 文件同步 (推荐，免费)

1. **导出**: 在任意平台导出数据文件
2. **传输**: 通过邮箱、云盘、微信等方式传输
3. **导入**: 在另一平台导入数据文件

优点:
- 完全免费
- 数据 100% 私密
- 无需服务器

缺点:
- 需要手动操作
- 不是实时同步

#### 方案二: 云同步 (需要服务器)

配置后端 API 实现自动同步:

```typescript
// src/services/syncService.ts 已提供基础框架
// 需要实现服务器 API
class CloudSyncService {
  async syncToCloud(data: SyncData) { /* 实现 */ }
  async syncFromCloud(): Promise<SyncData> { /* 实现 */ }
  async autoSync() { /* 实现 */ }
}
```

### 同步页面使用

访问 `/sync` 页面进行数据同步：

1. **导出数据**: 点击「导出数据」按钮，保存 JSON 文件
2. **导入数据**: 点击「导入数据」按钮，选择数据文件
3. **自动同步**: 配置云同步后可自动同步

## 📦 构建配置详解

### package.json 脚本

```json
{
  "dev": "vite",                    // 开发服务器
  "build": "vite build",            // Web 构建
  "build:electron": "...",          // Electron 构建
  "dist": "electron-builder",       // 桌面应用打包
  "cap:add:android": "...",         // 添加 Android 平台
  "cap:copy": "...",                // 同步资源
  "cap:open:android": "..."         // 打开 Android Studio
}
```

### Electron 配置 (electron-builder)

配置位置: `package.json -> build`

```json
{
  "appId": "com.lyricsstudio.app",
  "productName": "歌词工坊",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "dist-electron/**/*"
  ]
  // ... 更多配置
}
```

### Capacitor 配置

配置位置: `capacitor.config.ts`

```typescript
const config: CapacitorConfig = {
  appId: 'com.lyricstudio.app',
  appName: '歌词工坊',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
  // ... 更多配置
};
```

## 🔧 开发调试

### 桌面端调试

```bash
# 启动开发服务器
npm run dev

# 构建并运行 Electron (另一终端)
npm run build:electron
# 然后在 IDE 中运行 electron 入口
```

### 移动端调试

```bash
# 启动开发服务器
npm run dev

# 同步到移动端
npm run cap:copy
npm run cap:sync

# 在 Android Studio 或 Xcode 中运行
npm run cap:open:android
npm run cap:open:ios
```

### 网页端调试

```bash
npm run dev
# 访问 http://localhost:5173
```

## 📋 常见问题

### 桌面端

**Q: Windows 安装失败?**
A: 检查杀毒软件，右键选择「以管理员身份运行」

**Q: macOS 应用无法打开?**
A: 系统设置 -> 安全性与隐私 -> 允许「任何来源」

### 移动端

**Q: Android 安装失败?**
A: 开启「允许安装未知来源应用」

**Q: iOS TestFlight 邀请码?**
A: 加入我们的测试计划获取

### 数据同步

**Q: 数据文件损坏?**
A: 检查 JSON 格式是否正确，可以使用编辑器修复

**Q: 同步时出现冲突?**
A: 系统会保留最新的数据，旧数据不会丢失

## 🌟 最佳实践

1. **定期备份**: 建议每周导出一次数据备份
2. **测试同步**: 在小范围内先测试同步流程
3. **版本兼容**: 保持所有平台应用版本一致
4. **网络安全**: 使用云同步时确保使用 HTTPS

## 📞 技术支持

- GitHub Issues: https://github.com/WERLK/lyrics-studio11/issues
- 文档: 查看本仓库的 `.md` 文件

## 📄 许可证

MIT License
