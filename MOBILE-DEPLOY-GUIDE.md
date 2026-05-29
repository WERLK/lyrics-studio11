# 🚀 GitHub Pages 部署指南

> 让你的歌词工坊网站可以通过互联网访问

---

## 📋 部署前准备

### 1. 创建 GitHub 账号
如果没有 GitHub 账号，请访问 [https://github.com](https://github.com) 注册

### 2. 创建仓库
1. 登录 GitHub
2. 点击右上角的 **"+"** 按钮
3. 选择 **"New repository"**
4. 填写信息：
   - **Repository name**: `lyrics-studio`
   - **Description**: 歌词工坊 - 智能歌词生成工具
   - **Visibility**: Public（公开）
   - **不要勾选** "Add a README file"

---

## 🚀 部署步骤

### 方法一：使用 Git 命令行（推荐）

#### 1. 初始化 Git 仓库
在项目根目录执行：
```bash
git init
```

#### 2. 添加所有文件
```bash
git add .
```

#### 3. 提交文件
```bash
git commit -m "✨ 歌词工坊 - 支持100+音乐平台"
```

#### 4. 关联远程仓库
将下面的 `YOUR_USERNAME` 替换为你的 GitHub 用户名：
```bash
git remote add origin https://github.com/YOUR_USERNAME/lyrics-studio.git
```

#### 5. 推送代码
```bash
git branch -M main
git push -u origin main
```

#### 6. 启用 GitHub Pages
1. 进入你的仓库：https://github.com/YOUR_USERNAME/lyrics-studio
2. 点击 **"Settings"**（设置）
3. 在左侧菜单中找到 **"Pages"**
4. 设置：
   - **Source**: Deploy from a branch
   - **Branch**: main / (root)
   - 点击 **"Save"**

#### 7. 等待部署
- GitHub 会自动开始部署（约 1-3 分钟）
- 部署完成后，你会看到绿色提示："Your site is published at https://YOUR_USERNAME.github.io/lyrics-studio/"

#### 8. 访问网站
在浏览器中打开：`https://YOUR_USERNAME.github.io/lyrics-studio/`

---

### 方法二：使用 GitHub 网页上传

如果你不熟悉命令行，可以手动上传文件：

#### 1. 下载项目文件
下载打包好的 `mobile-website.tar.gz` 文件

#### 2. 创建新仓库
在 GitHub 上创建新仓库，命名为 `lyrics-studio`

#### 3. 上传文件
1. 进入仓库页面
2. 点击 **"Add file"** → **"Upload files"**
3. 将 `dist` 文件夹中的所有内容拖拽到上传区域
4. 填写提交信息
5. 点击 **"Commit changes"**

#### 4. 启用 GitHub Pages
按照方法一中的步骤 6-8 启用 Pages

---

## 🌐 访问网站

部署成功后，你可以通过以下地址访问：

```
https://YOUR_USERNAME.github.io/lyrics-studio/
```

**示例**：
如果你的 GitHub 用户名是 `john`，则访问地址为：
```
https://john.github.io/lyrics-studio/
```

---

## 📱 手机访问

现在你可以用手机浏览器直接访问上面的地址了！

### 在手机上打开浏览器，输入：
```
https://YOUR_USERNAME.github.io/lyrics-studio/
```

### 或者扫描二维码访问：
部署完成后，在 GitHub 仓库的 Pages 设置页面可以生成二维码

---

## ⚙️ 自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

### 1. 在 GitHub Pages 设置中
1. 进入仓库 **Settings** → **Pages**
2. 在 **Custom domain** 中输入你的域名
3. 点击 **Save**

### 2. 配置 DNS
在你的域名服务商处添加 DNS 记录：
- **CNAME 记录**:
  - 主机记录: `@` 或 `www`
  - 记录值: `YOUR_USERNAME.github.io`

### 3. 等待生效
DNS 更改可能需要几分钟到 48 小时生效

---

## 🔧 常用 Git 命令

### 更新网站内容
修改代码后，使用以下命令重新部署：

```bash
# 1. 添加更改
git add .

# 2. 提交更改
git commit -m "更新内容"

# 3. 推送到 GitHub
git push
```

GitHub Actions 会自动重新构建和部署！

---

## 🐛 常见问题

### 1. 部署后网站显示 404
**解决方法**：
- 检查 GitHub Pages 的 Source 设置是否正确
- 确保文件名是 `index.html`
- 等待 2-3 分钟让部署完成

### 2. CSS/JS 文件加载失败
**解决方法**：
- 确保仓库名是 `lyrics-studio`（小写，无空格）
- 检查 GitHub Pages 设置中的 Custom domain

### 3. 网站无法访问
**解决方法**：
- 检查仓库是否设置为 Public
- 确认 GitHub Pages 已启用
- 查看 Actions 页面检查部署日志

### 4. 更改不生效
**解决方法**：
- 清除浏览器缓存
- 强制刷新页面（Ctrl+Shift+R 或 Cmd+Shift+R）
- 等待 GitHub Actions 部署完成

---

## 📊 查看部署状态

### 查看 Actions 日志
1. 进入仓库
2. 点击 **"Actions"** 标签
3. 可以看到部署历史和状态

### 部署状态指示
- 🟡 **黄色** - 部署中
- 🟢 **绿色** - 部署成功
- 🔴 **红色** - 部署失败

---

## 🎉 恭喜！

完成以上步骤后，你的歌词工坊网站就可以通过互联网访问了！

### 分享你的网站
- 🎵 个人主页：`https://YOUR_USERNAME.github.io/lyrics-studio/`
- 📱 手机访问：同上
- 💬 分享链接：同上

---

## 📞 需要帮助？

如果在部署过程中遇到问题：
1. 查看 GitHub Actions 日志
2. 搜索 GitHub Pages 相关文档
3. 在 GitHub Issues 中提问

---

**祝你部署顺利！** 🚀✨
