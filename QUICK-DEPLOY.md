# 歌词工坊 - 5种超简单部署方案（免认证）

## 📦 你已有的文件

- `lyrics-studio-site.tar.gz` - 打包好的网站文件
- `dist/` - 构建好的网站目录（直接用这个就行）

---

## 🚀 方案一：Netlify Drop（推荐⭐⭐⭐⭐⭐）

**最快！无需注册！**

1. 访问：https://app.netlify.com/drop
2. 解压 `lyrics-studio-site.tar.gz`，找到 `dist` 文件夹
3. 把 `dist` 文件夹**拖到网页里**
4. ✅ 完成！网站已上线！

网址类似：`https://amazing-lyrics-12345.netlify.app`

---

## 🌐 方案二：Cloudflare Pages（国内快）

1. 访问：https://pages.cloudflare.com
2. 免费注册（邮箱就行）
3. 点击「创建项目」→「上传资产」
4. 选择 `dist` 文件夹上传
5. 部署完成！

---

## 💻 方案三：Vercel 拖拽部署

1. 访问：https://vercel.com/new
2. 可以用邮箱注册
3. 点击「导入项目」或直接拖文件夹
4. 选择 `dist` 目录上传

---

## 📟 方案四：Surge 命令行（程序员专用）

如果你有 Node.js：

```bash
# 1. 安装
npm install -g surge

# 2. 进入目录
cd dist

# 3. 部署
surge
```

按提示输入邮箱和域名（可以选 `xxx.surge.sh`）

---

## 🖥️ 方案五：自己的服务器/虚拟主机

如果你有服务器：

1. 上传 `dist` 目录内容到网站根目录
2. 配置 Nginx/Apache，设置 `try_files` 到 index.html

**Nginx 配置示例：**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📱 本地预览（无需部署）

想先看看效果？

```bash
# 进入 dist 目录
cd dist

# 使用 Python 启动服务
python3 -m http.server 8080

# 或使用 Node
npx serve
```

然后访问：http://localhost:8080

---

## ⚡ 总结

| 方案 | 难度 | 速度 | 推荐 |
|------|------|------|------|
| Netlify Drop | ⭐ | ⭐⭐⭐⭐⭐ | 首选！ |
| Cloudflare Pages | ⭐⭐ | ⭐⭐⭐⭐ | 国内快 |
| Surge | ⭐⭐ | ⭐⭐⭐⭐ | 命令行控 |
| 自己服务器 | ⭐⭐⭐ | ⭐⭐⭐ | 完全可控 |

---

## 🎉 开始吧！

建议直接用 **Netlify Drop** - 打开 https://app.netlify.com/drop 拖 `dist` 文件夹就行！
