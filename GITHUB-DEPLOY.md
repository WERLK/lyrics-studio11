# GitHub Pages 部署指南

## 🎉 恭喜！项目已配置完成

歌词工坊已成功配置为自动部署到 GitHub Pages！

---

## 📋 部署状态

✅ **GitHub Actions 工作流** - 已创建  
✅ **构建配置** - 已更新  
✅ **部署脚本** - 已准备就绪  

---

## 🚀 快速部署步骤

### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 **"+"** 按钮
3. 选择 **"New repository"**
4. 填写仓库信息：
   - **Repository name**: `lyrics-studio`
   - **Description**: 智能歌词生成与管理工具
   - **选择 Public** (公开仓库才能使用 GitHub Pages)
   - **不要勾选** "Initialize this repository with a README"
5. 点击 **"Create repository"**

### 第二步：上传代码到仓库

#### 方法 1：使用命令行

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit - 歌词工坊"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/lyrics-studio.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 方法 2：使用 GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 点击 **"File" > "Add Local Repository"**
3. 选择项目文件夹
4. 点击 **"Publish repository"**
5. 填写仓库名称和描述
6. 点击 **"Publish"**

### 第三步：启用 GitHub Pages

1. 进入你的仓库页面
2. 点击 **"Settings"** (设置)
3. 在左侧菜单中找到 **"Pages"**
4. 在 **"Source"** 下拉菜单中：
   - 选择 **"GitHub Actions"**
5. 点击 **"Save"**

### 第四步：等待自动部署

1. 推送代码后，GitHub Actions 会自动运行
2. 查看部署状态：
   - 点击仓库顶部的 **"Actions"** 标签
   - 你会看到 "Deploy to GitHub Pages" 工作流正在运行
3. 等待 1-3 分钟（首次部署可能需要更长时间）
4. 部署成功后，你会看到绿色的 ✓ 标记

### 第五步：访问你的网站

部署成功后，你的网站将可以通过以下地址访问：

```
https://YOUR_USERNAME.github.io/lyrics-studio/
```

> ⚠️ 替换 `YOUR_USERNAME` 为你的 GitHub 用户名

---

## 🔧 自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

### 配置步骤

1. 在 **Settings > Pages** 页面
2. 找到 **"Custom domain"** 输入框
3. 输入你的域名（例如：`lyrics.example.com`）
4. 点击 **"Save"**
5. 在你的域名提供商处添加 DNS 记录：
   - **A 记录**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME 记录**: `YOUR_USERNAME.github.io`

### 修改 Vite 配置

如果使用子目录部署，请确保 [vite.config.ts](file:///workspace/vite.config.ts#L8-L10) 中的 base 配置正确：

```typescript
base: process.env.NODE_ENV === 'production' 
  ? '/your-repo-name/'  // 替换为你的仓库名
  : '/',
```

---

## 📊 工作流说明

### 自动部署流程

1. **触发**: 代码推送到 `main` 分支
2. **安装**: 安装 Node.js 20 和项目依赖
3. **构建**: 使用 Vite 构建生产版本
4. **部署**: 将构建产物部署到 GitHub Pages

### 查看部署日志

1. 进入仓库的 **Actions** 页面
2. 点击最新的工作流运行
3. 点击左侧的 **"Deploy to GitHub Pages"**
4. 查看实时日志

### 手动触发部署

如果需要手动部署：

1. 进入仓库的 **Actions** 页面
2. 选择 **"Deploy to GitHub Pages"** 工作流
3. 点击右侧的 **"Run workflow"**
4. 选择 `main` 分支
5. 点击 **"Run workflow"**

---

## ⚠️ 常见问题

### Q: 部署失败怎么办？

**A:** 检查以下几点：

1. **查看错误日志**
   - 进入 Actions 页面查看具体错误信息
   - 常见错误包括：
     - 依赖安装失败
     - 构建脚本错误
     - 权限问题

2. **检查分支名称**
   - 确保代码推送到 `main` 分支
   - 如果使用其他分支名，修改 [deploy.yml](file:///workspace/.github/workflows/deploy.yml#L4) 中的分支配置

3. **检查仓库设置**
   - 确保仓库是 **Public** (公开的)
   - 确保 GitHub Pages 已启用

### Q: 网站样式丢失？

**A:** 检查 Vite 配置中的 `base` 路径：

```typescript
// vite.config.ts
base: '/your-repo-name/'  // 必须是仓库名称，以斜杠结尾
```

### Q: 页面 404？

**A:** 这通常是因为 base 路径配置不正确。请确保：

1. `base` 路径与仓库名称完全一致
2. 路径以斜杠结尾：`/lyrics-studio/`
3. 推送代码后重新部署

### Q: 如何部署到子目录？

如果你的仓库名称不是 `lyrics-studio`，需要修改配置：

1. 编辑 [vite.config.ts](file:///workspace/vite.config.ts#L8-L10)：
   ```typescript
   base: process.env.NODE_ENV === 'production' 
     ? '/你的仓库名/' 
     : '/',
   ```

2. 推送代码后，网站将可以通过以下地址访问：
   ```
   https://YOUR_USERNAME.github.io/你的仓库名/
   ```

---

## 🔄 后续更新

### 自动更新

每次你推送代码到 `main` 分支时，GitHub Actions 会自动：

1. 拉取最新代码
2. 安装依赖
3. 构建项目
4. 部署到 GitHub Pages

### 手动部署

如果需要立即部署而不等待推送：

```bash
# 在本地构建
npm run build

# 或者使用 GitHub CLI
gh workflow run deploy.yml
```

---

## 📝 项目仓库结构

```
lyrics-studio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # 部署工作流配置
├── src/                    # React 源代码
├── dist/                   # 构建产物（自动生成）
├── vite.config.ts         # Vite 配置
├── package.json            # 项目配置
└── README.md               # 项目文档
```

---

## 🎯 功能演示

部署成功后，你可以测试以下功能：

- ✅ 首页 - 歌词工坊介绍
- ✅ 歌词生成 - AI 智能歌词生成
- ✅ 歌词优化 - 提升歌词质量
- ✅ 封面生成 - AI 生成歌曲封面
- ✅ 用户登录 - GitHub 社交登录
- ✅ 下载页面 - 桌面版和 App 下载
- ✅ 发布指南 - 音乐平台发布指南

---

## 🆘 获取帮助

如果在部署过程中遇到问题：

1. **查看 GitHub Actions 日志**
   - 进入仓库 > Actions > 点击失败的workflow
   - 查看详细错误信息

2. **检查官方文档**
   - [GitHub Pages 文档](https://docs.github.com/cn/pages)
   - [GitHub Actions 文档](https://docs.github.com/cn/actions)

3. **搜索引擎搜索**
   - 搜索错误信息中的关键词
   - 常见问题大多可以在 Stack Overflow 找到答案

4. **创建 Issue**
   - 在仓库中创建 Issue
   - 描述你的问题和环境

---

## 📄 许可证

本项目遵循相关开源许可证。

---

## 🎉 恭喜完成！

按照以上步骤，你的歌词工坊网站现在已经部署到 GitHub Pages 了！

**访问地址**: `https://YOUR_USERNAME.github.io/lyrics-studio/`

**分享给你的朋友们吧！** 🚀
