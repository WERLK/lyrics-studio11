# 🎵 歌词工坊 - 快速入门指南

## ⚡ 5 分钟快速上手

### 你想要什么？

#### 🚀 **A. 快速构建 Windows 桌面应用**

**只需 3 步：**

1. **复制项目** - 将整个 `lyrics-studio` 文件夹复制到你的电脑
2. **双击构建** - 双击 `build-desktop.bat` 文件
3. **选择 1** - 选择"构建安装包"
4. **运行应用** - 在 `release/win-unpacked/` 找到 `歌词工坊-Setup.exe`

**或选择 2** - 想要免安装的便携版
- 双击 `build-desktop.bat`
- 选择"构建便携版"
- 在 `release/win-unpacked/` 找到 `歌词工坊.exe` 直接运行

---

#### 🌐 **B. 只想要 Web 版本**

在服务器上运行：
```bash
npm run dev
```
访问 http://localhost:5173

---

## 📦 构建产物位置

| 类型 | 文件 | 位置 |
|------|------|------|
| 安装包 | 歌词工坊-Setup.exe | release/win-unpacked/ |
| 便携版 | 歌词工坊.exe | release/win-unpacked/ |
| Web版 | dist/ | 项目根目录 |

## 🎯 最快的方式

### 如果你只是想试试：

1. 双击 `start-dev.bat`
2. 自动打开浏览器
3. 开始使用！

### 如果你想发布给朋友：

1. 双击 `build-desktop.bat`
2. 选择 `1` (构建安装包)
3. 等 5-10 分钟
4. 找到 `歌词工坊-Setup.exe`
5. 发送给朋友，他们双击安装即可使用！

### 如果你想要免安装版本：

1. 双击 `build-desktop.bat`
2. 选择 `2` (构建便携版)
3. 等 5-10 分钟
4. 整个 `release/win-unpacked/` 文件夹可以复制到任何地方
5. 直接运行 `歌词工坊.exe`

## 💡 常见问题

**Q: 构建需要多久？**
A: 首次构建需要 5-10 分钟（下载 Electron），之后约 1-2 分钟

**Q: 构建失败怎么办？**
A: 
1. 确保 Node.js 已安装（https://nodejs.org/）
2. 删除 `node_modules` 文件夹
3. 重新运行 `npm install`
4. 再次尝试构建

**Q: 可以分享给朋友吗？**
A: 当然！`歌词工坊-Setup.exe` 可以分发给任何人安装使用

**Q: 杀毒软件报警？**
A: 这是 Electron 应用的正常行为，将 exe 添加到信任列表即可

## 📚 相关文档

- [BUILD-GUIDE.md](BUILD-GUIDE.md) - 详细构建指南
- [README-DESKTOP.md](README-DESKTOP.md) - 桌面版使用说明
- [README.md](README.md) - 项目说明文档

## 🎉 开始使用

**Windows 用户**：双击 `build-desktop.bat`

**开发者**：运行 `npm run dev`

---

**有问题？** 查看 BUILD-GUIDE.md 或运行 `npm run dev` 测试 Web 版本

**享受音乐创作，从歌词工坊开始！** 🎵✨
