# 歌词工坊 - 桌面版快速入门

## 🎉 项目已准备就绪

歌词工坊桌面版已配置完成！Web 应用构建成功，可以开始生成桌面应用。

## 📦 构建状态

✅ **Web 应用** - 已构建完成  
⏳ **Electron 桌面应用** - 等待在本地环境构建  

## 🚀 如何构建桌面应用

### 方法一：一键构建脚本（推荐）

#### Windows 用户
1. 双击运行 `build-desktop.bat`
2. 按照提示选择要构建的平台
3. 等待构建完成

#### macOS / Linux 用户
```bash
# 添加执行权限
chmod +x build-desktop.sh

# 运行构建脚本
./build-desktop.sh
```

### 方法二：手动构建命令

#### 安装依赖
```bash
npm install
```

#### 构建 Windows 桌面应用
```bash
npm run dist:win
```

#### 构建 macOS 桌面应用
```bash
npm run dist:mac
```

#### 构建 Linux 桌面应用
```bash
npm run dist:linux
```

## 📁 构建产物

构建完成后，在 `release` 目录中会生成以下文件：

### Windows
- `歌词工坊-Setup.exe` - 安装包
- `歌词工坊.exe` - 便携版（可选）

### macOS
- `歌词工坊.dmg` - 安装包

### Linux
- `歌词工坊.AppImage` - 便携包
- `歌词工坊.deb` - Debian 包

## ⚙️ 环境要求

- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本
- **操作系统**: Windows 10/11, macOS 10.13+, 或 Linux

## 🎯 功能特点

✅ 全平台支持 (Windows/macOS/Linux)  
✅ 响应式设计 (移动端/桌面端适配)  
✅ GitHub 登录对接  
✅ 歌词智能生成  
✅ AI 歌词优化  
✅ 封面生成  
✅ 历史记录管理  
✅ 多平台发布支持  

## 📚 更多文档

- [完整构建指南](./BUILD-GUIDE.md) - 详细的构建步骤和故障排除
- [用户指南](./USER-GUIDE.md) - 如何使用歌词工坊
- [快速入门](./QUICK-START.md) - 快速开始使用

## 🔧 常见问题

### Q: 构建失败怎么办？

**A:** 查看 [BUILD-GUIDE.md](./BUILD-GUIDE.md) 中的故障排除部分。

### Q: 下载 Electron 太慢？

**A:** 使用国内镜像加速：

```bash
# Windows
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm run dist:win

# macOS / Linux
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm run dist:mac
```

### Q: 如何只构建便携版？

```bash
npm run dist:win -- --win portable
```

## 📞 获取帮助

如果在构建或使用过程中遇到问题：

1. 查看 BUILD-GUIDE.md 中的常见问题
2. 检查错误信息并搜索解决方案
3. 参考官方文档：
   - [Electron Builder](https://www.electron.build/)
   - [Electron](https://www.electronjs.org/)

## 🎉 下一步

1. ✅ 运行构建脚本生成桌面应用
2. 📦 安装或运行生成的桌面应用
3. 🎨 开始创作歌词！

---

**祝您使用愉快！** 🎵
