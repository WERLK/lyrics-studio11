# 🚀 GitHub 部署快速检查清单

## ✅ 部署前准备

- [x] 项目代码已准备就绪
- [x] GitHub Actions 工作流已配置
- [x] Vite 配置已更新
- [x] README 文档已创建
- [ ] GitHub 仓库待创建

---

## 📋 部署步骤

### ☐ 第一步：创建 GitHub 仓库

1. 访问 https://github.com
2. 点击 **"New repository"**
3. 填写信息：
   - **Repository name**: `lyrics-studio`
   - **Description**: 智能歌词生成与管理工具
   - **Visibility**: Public ✓
   - ❌ 不要勾选 "Initialize this repository with a README"
4. 点击 **"Create repository"**

### ☐ 第二步：初始化 Git 并推送代码

在项目根目录执行以下命令：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 配置用户信息（替换为你的信息）
git config user.name "你的用户名"
git config user.email "你的邮箱"

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "✨ Initial commit - 歌词工坊完整版"

# 5. 添加远程仓库（重要：替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/lyrics-studio.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main
```

> ⚠️ **重要**：确保 `YOUR_USERNAME` 是你的 GitHub 用户名

### ☐ 第三步：启用 GitHub Pages

1. 在 GitHub 仓库页面点击 **"Settings"**
2. 在左侧菜单找到 **"Pages"**
3. 在 **"Source"** 部分：
   - 选择 **"Deploy from a branch"**
   - 选择 **"main"** 分支
   - 选择 **"/ (root)"** 文件夹
4. 点击 **"Save"**

### ☐ 第四步：等待部署

1. 进入仓库的 **"Actions"** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待状态变为 ✅ 绿色（通常 1-3 分钟）
4. 如果失败，点击查看错误日志

### ☐ 第五步：访问网站

部署成功后，访问你的网站：

```
https://YOUR_USERNAME.github.io/lyrics-studio/
```

> 🎉 **恭喜！网站已成功部署！**

---

## 🔍 验证清单

部署完成后，验证以下功能：

- [ ] 首页正常显示
- [ ] 导航链接正常工作
- [ ] 歌词创作页面可访问
- [ ] 下载页面可访问
- [ ] 登录/注册页面可访问
- [ ] 移动端显示正常
- [ ] 页面样式完整加载

---

## 🆘 故障排除

### 问题 1：Actions 没有自动运行

**解决**：
1. 检查仓库是否设置为 Public
2. 进入 Settings > Actions > General
3. 确保 "Actions permissions" 设为 "Allow all actions"
4. 点击 "Run workflow" 手动触发一次

### 问题 2：部署失败

**解决**：
1. 点击失败的 workflow 查看日志
2. 常见错误：
   - 依赖安装失败 → 运行 `npm install` 本地测试
   - 构建失败 → 检查代码是否有语法错误
   - 权限不足 → 检查 GitHub Pages 设置

### 问题 3：网站 404

**解决**：
1. 确认 Vite 配置的 `base` 路径正确
2. 检查 GitHub Pages Source 设置
3. 等待几分钟让部署完成
4. 清除浏览器缓存

### 问题 4：样式丢失

**解决**：
1. 检查浏览器控制台是否有资源加载错误
2. 确认 `base` 路径配置正确
3. 检查是否使用了正确的 URL 格式

---

## 📝 后续维护

### 自动部署

每次推送到 `main` 分支时：
- ✅ 自动触发构建
- ✅ 自动部署到 GitHub Pages
- ✅ 无需手动操作

### 手动部署

如需手动部署：
1. 进入仓库 Actions 页面
2. 选择 "Deploy to GitHub Pages"
3. 点击 "Run workflow"
4. 选择 main 分支
5. 等待部署完成

### 更新代码

```bash
# 编辑代码后，推送到 GitHub
git add .
git commit -m "你的更新说明"
git push
```

---

## 🎯 常用命令参考

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/lyrics-studio.git

# 本地开发
npm install
npm run dev

# 构建生产版本
npm run build

# 推送更新
git add .
git commit -m "Update"
git push
```

---

## 📞 需要帮助？

- 查看完整文档：[GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)
- GitHub Issues：https://github.com/YOUR_USERNAME/lyrics-studio/issues

---

## ✅ 完成！

按照以上步骤，你的歌词工坊应该已经成功部署到 GitHub Pages 了！

**分享链接**: `https://YOUR_USERNAME.github.io/lyrics-studio/`

**祝使用愉快！** 🎵✨
