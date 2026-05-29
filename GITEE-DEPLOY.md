# 歌词工坊 - Gitee Pages 部署指南

## 一、创建 Gitee 仓库

1. 访问 https://gitee.com/ 登录或注册账号
2. 点击右上角的「+」→「新建仓库」
3. 填写仓库信息：
   - 仓库名称：`lyrics-studio` （或你喜欢的名字）
   - 仓库介绍：智能歌词生成与管理工具
   - 是否开源：公开
   - 初始化仓库：不勾选（我们本地已有代码）
4. 点击「创建」完成仓库创建

## 二、推送代码到 Gitee

在项目目录执行以下命令（替换为你的用户名）：

```bash
# 添加远程仓库
git remote add gitee https://gitee.com/你的用户名/lyrics-studio.git

# 推送代码
git push -u gitee master
```

如果之前已经添加过远程仓库，先移除：
```bash
git remote remove gitee
git remote add gitee https://gitee.com/你的用户名/lyrics-studio.git
git push -u gitee master
```

## 三、启用 Gitee Pages

### 3.1 使用自动部署（推荐）

创建 `.gitee/workflows/deploy.yml` 文件，内容如下：

```yaml
name: 自动部署到 Gitee Pages

on:
  # 监听推送到 master 分支
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v3
        
      - name: 安装 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
          
      - name: 安装依赖
        run: npm ci
        
      - name: 构建项目
        run: npm run build
        
      - name: 部署到 Gitee Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3.2 手动部署（简单快速）

如果你不想配置自动部署，可以手动构建上传：

```bash
# 1. 构建项目
npm run build

# 2. 创建 gh-pages 分支（第一次）
git checkout --orphan gh-pages

# 3. 复制构建文件
cp -r dist/* .

# 4. 提交并推送
git add .
git commit -m "Deploy to Gitee Pages"
git push gitee gh-pages

# 5. 切回 master 分支
git checkout master
```

## 四、在 Gitee 上启用 Pages

1. 进入你的 Gitee 仓库页面
2. 点击顶部菜单栏「服务」→「Gitee Pages」
3. 选择分支：`gh-pages`
4. 启动目录：留空（或填 `/`）
5. 勾选「强制使用 HTTPS」
6. 点击「启动」或「更新」
7. 等待 1-2 分钟，部署完成后会显示访问地址

## 五、访问你的网站

部署成功后，访问地址为：
```
https://你的用户名.gitee.io/lyrics-studio
```

## 六、日常更新流程

修改代码后，推送到 Gitee：

```bash
# 1. 提交代码
git add .
git commit -m "你的提交说明"

# 2. 推送代码
git push gitee master

# 3. 如果使用自动部署，等待 Actions 自动构建
#    如果手动部署，执行上述 3.2 步骤
```

## 七、自定义域名（可选）

如果你有域名，并且已设置域名解析到 Gitee Pages，可以这样配置：

1. 在 Gitee Pages 设置页面填写你的域名
2. 在你的域名 DNS 添加 CNAME 记录：
   - 主机记录：@
   - 记录值：你的用户名.gitee.io
3. 等待 DNS 生效（最多 24 小时）

## 八、常见问题

### Q: 构建后页面空白？
A: 检查 `vite.config.ts` 中的 `base` 配置：

```typescript
export default defineConfig({
  base: '/lyrics-studio/',  // 改为你的仓库名
  // ...
})
```

### Q: 推送时需要输入密码？
A: 建议配置 Gitee  SSH 密钥，或使用个人访问令牌：
1. 在 Gitee 设置 → 私人令牌中生成
2. 推送时用户名填令牌名，密码填令牌

### Q: Pages 服务失败？
A: 检查是否有敏感内容，或尝试切换分支重新部署。
