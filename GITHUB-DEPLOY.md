# 歌词工坊 - GitHub Pages 部署指南

## 🚀 方法一：使用 GitHub Actions 自动部署（推荐）

### 第 1 步：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 仓库名称：`lyrics-studio`
3. 仓库描述：智能歌词生成与管理工具
4. 选择「Public」或「Private」
5. ❌ 不要勾选「Add a README file」等初始化选项
6. 点击「Create repository」

### 第 2 步：推送代码到 GitHub

在项目目录执行：

```bash
# 添加 GitHub 远程仓库（替换为你的用户名）
git remote add github https://github.com/你的用户名/lyrics-studio.git

# 推送代码
git push -u github master
```

如果已添加过，更新地址：
```bash
git remote set-url github https://github.com/你的用户名/lyrics-studio.git
git push -u github master
```

### 第 3 步：在 GitHub 开启 Pages

1. 进入你的 GitHub 仓库页面
2. 点击「Settings」→「Pages」（左侧菜单）
3. 在「Build and deployment」部分：
   - Source: 选择「GitHub Actions」
4. 保存设置

### 第 4 步：触发部署

**方式 A：自动部署（推荐）**
- 以后每次 `git push github master`，GitHub Actions 会自动构建部署

**方式 B：手动触发**
1. 进入仓库「Actions」标签
2. 选择左侧「Deploy to GitHub Pages」工作流
3. 点击「Run workflow」→「Run workflow」

### 第 5 步：访问网站

部署成功后，访问地址：
```
https://你的用户名.github.io/lyrics-studio
```

---

## 📤 方法二：使用 gh-pages 分支手动部署

如果你不想配置 Actions，也可以手动部署：

```bash
# 1. 确保已构建项目
npm run build

# 2. 创建 gh-pages 分支
git checkout --orphan gh-pages

# 3. 复制构建文件
cp -r dist/* .

# 4. 提交并推送
git add .
git commit -m "Deploy to GitHub Pages"
git push -u github gh-pages --force

# 5. 切回 master
git checkout master
```

然后在仓库 Settings → Pages 中：
- Source: 选择「Deploy from a branch」
- Branch: 选择 `gh-pages` 分支和 `/ (root)`
- 点击「Save」

---

## ⚙️ 配置说明

### 自定义仓库名

如果你的仓库名不是 `lyrics-studio`，需要修改 `vite.config.ts`：

```typescript
export default defineConfig({
  base: '/你的仓库名/',  // 修改这里
  // ...
})
```

### 自定义域名

如果你有自己的域名：

1. 在项目根目录创建 `CNAME` 文件：
   ```
   your-domain.com
   ```

2. 在域名 DNS 配置中添加 CNAME 记录：
   - 主机记录：@ 或 www
   - 记录值：你的用户名.github.io

3. 在仓库 Settings → Pages 中填写你的域名

---

## 📋 完整部署清单

- [ ] GitHub 仓库已创建
- [ ] 本地代码已推送到 GitHub
- [ ] 仓库 Settings → Pages 已正确配置
- [ ] GitHub Actions 工作流已运行成功
- [ ] 可以访问 https://你的用户名.github.io/lyrics-studio

---

## 🔧 常见问题

### Q: 页面空白？
A: 检查 `vite.config.ts` 中的 `base` 路径是否正确，应为 `/仓库名/`

### Q: Actions 构建失败？
A: 检查：
1. package.json 中的 build 脚本正确
2. 所有依赖已提交到 package-lock.json
3. Node 版本配置正确（当前是 20）

### Q: 如何更新网站？
A: 只要推送到 master 分支，Actions 就会自动更新！
```bash
git add .
git commit -m "更新内容"
git push github master
```
