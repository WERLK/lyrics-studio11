# 🎵 歌词工坊

> 智能歌词生成与管理工具 - AI-Powered Lyrics Creation Platform

![Lyrics Studio Banner](https://img.shields.io/badge/Lyrics-Studio-purple?style=for-the-badge&logo=music&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ 功能特点

🎤 **智能歌词生成** - 基于 AI 的歌词创作助手，快速生成原创歌词  
✨ **歌词智能优化** - 自动优化歌词质量，提升押韵和流畅度  
🎨 **AI 封面生成** - 自动生成歌曲封面图片  
📱 **全平台支持** - 支持移动端、平板、电脑端访问  
💻 **桌面应用** - 提供 Windows、macOS、Linux 桌面版  
📱 **移动应用** - 支持 iOS 和 Android 原生应用  
🔐 **用户系统** - 支持 GitHub 登录，保护你的创作  
📤 **多平台发布** - 提供各大音乐平台发布指南  

---

## 🚀 快速开始

### 在线使用

访问我们的网站开始使用：**[歌词工坊](https://yourusername.github.io/lyrics-studio/)**

> ⚠️ 请将 `yourusername` 替换为你的 GitHub 用户名

### 本地开发

#### 1. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/lyrics-studio.git
cd lyrics-studio
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 启动开发服务器

```bash
npm run dev
```

#### 4. 访问网站

打开浏览器访问：**[http://localhost:5173](http://localhost:5173)**

---

## 📦 构建桌面应用

### Windows

```bash
npm run dist:win
```

### macOS

```bash
npm run dist:mac
```

### Linux

```bash
npm run dist:linux
```

构建产物将在 `release` 目录生成。

---

## 🌐 部署到 GitHub Pages

项目已配置自动部署到 GitHub Pages！详细部署指南请查看：[GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)

### 一键部署步骤

1. **创建 GitHub 仓库**
2. **推送代码到 main 分支**
3. **启用 GitHub Pages**
4. **自动部署完成！**

详细步骤请查看 [GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)

---

## 🎯 主要页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 🏠 首页 | `/` | 歌词工坊介绍 |
| ✍️ 创作页 | `/create` | 歌词生成与编辑 |
| 📥 下载页 | `/download` | 桌面应用和 App 下载 |
| 🔐 登录页 | `/login` | 用户登录 |
| 📝 注册页 | `/register` | 用户注册 |
| 📚 发布指南 | `/platform-guide` | 音乐平台发布指南 |

---

## 🛠️ 技术栈

### 前端

- ⚛️ **React 18** - 用户界面框架
- 📘 **TypeScript 5** - 类型安全
- ⚡ **Vite 6** - 极速构建工具
- 🎨 **Tailwind CSS 3** - 原子化 CSS
- 🗂️ **Zustand** - 状态管理
- 🚀 **React Router 7** - 路由管理

### 桌面应用

- 🖥️ **Electron** - 跨平台桌面应用框架
- 📦 **Electron Builder** - 应用打包工具

### 移动应用

- 📱 **Capacitor** - 跨平台移动应用框架
- 🍎 **iOS** - Apple 原生支持
- 🤖 **Android** - Android 原生支持

---

## 📂 项目结构

```
lyrics-studio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages 部署工作流
├── src/
│   ├── components/         # React 组件
│   │   ├── creator/        # 创作相关组件
│   │   ├── home/          # 首页组件
│   │   ├── layout/         # 布局组件
│   │   └── ui/             # UI 组件库
│   ├── pages/              # 页面组件
│   ├── services/           # 服务层
│   ├── store/              # 状态管理
│   └── types/              # TypeScript 类型定义
├── electron/               # Electron 桌面应用代码
├── miniapp/                # 微信小程序代码
├── public/                 # 静态资源
└── dist/                   # 构建产物
```

---

## 🎨 功能演示

### 首页
- 🎵 简洁美观的用户界面
- 🎯 功能特点展示
- 📥 下载引导

### 歌词创作
- 🎤 多种创作模式（自动生成、手动编辑、AI 优化）
- ✨ 实时预览
- 📝 导出功能

### 响应式设计
- 📱 完美适配手机、平板、电脑
- 🌙 支持亮色/暗色主题切换

---

## 📖 使用文档

- [快速入门指南](QUICK-START.md) - 快速开始使用
- [用户指南](USER-GUIDE.md) - 详细使用说明
- [构建指南](BUILD-GUIDE.md) - 构建桌面应用
- [GitHub 部署指南](GITHUB-DEPLOY.md) - 部署到 GitHub Pages
- [桌面版构建](README-DESKTOP.md) - 桌面应用详情

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [React](https://react.dev/) - 优秀的 UI 框架
- [Vite](https://vitejs.dev/) - 快速的构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 美观的样式框架
- [Lucide](https://lucide.dev/) - 精美的图标库

---

## 📞 联系我们

如果你有任何问题或建议，请通过以下方式联系我们：

- 📧 邮箱：contact@lyrics-studio.com
- 💬 GitHub Issues：[提交 Issue](https://github.com/YOUR_USERNAME/lyrics-studio/issues)
- 🌐 网站：https://yourusername.github.io/lyrics-studio/

---

<div align="center">

**使用歌词工坊，让创作更简单！** 🎵✨

*Made with ❤️ by 歌词工坊团队*

</div>
