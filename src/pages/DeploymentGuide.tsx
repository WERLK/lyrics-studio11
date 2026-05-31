import { useState } from 'react';
import { Rocket, CheckCircle, ChevronRight, Copy, Github, Cloud, Server, Globe } from 'lucide-react';
import { deploymentGuides } from '../data/musicPlatforms';

export default function DeploymentGuide() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const codeExamples = {
    'github-pages': `# 部署到 GitHub Pages

1. 创建仓库
2. 设置 Actions

name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`,

    'vps': `# VPS 部署教程

## 1. 服务器准备

# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装基础软件
sudo apt install nginx git nodejs npm -y

# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

## 2. 项目部署

# 克隆项目
cd /var/www
git clone https://github.com/your-username/lyrics-studio.git
cd lyrics-studio

# 安装依赖
npm install

# 构建项目
npm run build

## 3. 配置 Nginx

sudo nano /etc/nginx/sites-available/lyrics-studio

server {
    listen 80;
    server_name your-domain.com;
    root /var/www/lyrics-studio/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 启用配置
sudo ln -sf /etc/nginx/sites-available/lyrics-studio /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx

## 4. SSL 证书

sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com

## 5. 启动后端服务

# 安装 PM2
npm install -g pm2

# 启动服务
cd /var/www/lyrics-studio
pm2 start server/index.js --name lyrics-api

# 设置开机自启
pm2 startup
pm2 save`
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-gray-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">部署方案指南</h1>
          <p className="text-purple-200/70 text-lg">从简单的静态页面到完整的服务器部署</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {deploymentGuides.map(guide => (
            <div
              key={guide.id}
              className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                activeGuide === guide.id ? 'ring-2 ring-purple-500' : 'hover:border-purple-500/50'
              }`}
              onClick={() => setActiveGuide(activeGuide === guide.id ? null : guide.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      guide.difficulty === '简单' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      难度：{guide.difficulty}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-purple-200/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-purple-400 text-sm">点击查看详细教程</span>
                  <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${activeGuide === guide.id ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {activeGuide === guide.id && codeExamples[guide.id] && (
                <div className="border-t border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">详细配置</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(codeExamples[guide.id], guide.id);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-purple-200 hover:bg-white/20 transition-all text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copied === guide.id ? '已复制' : '复制代码'}
                    </button>
                  </div>
                  <pre className="bg-black/30 rounded-xl p-4 overflow-x-auto text-sm">
                    <code className="text-purple-200/90">{codeExamples[guide.id]}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Github className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">GitHub Pages</h3>
            <p className="text-purple-200/60 text-sm">免费静态托管</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Cloud className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Netlify</h3>
            <p className="text-purple-200/60 text-sm">一键部署平台</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Server className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">VPS 服务器</h3>
            <p className="text-purple-200/60 text-sm">完全掌控的部署</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center">
            <Globe className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Cloudflare</h3>
            <p className="text-purple-200/60 text-sm">全球 CDN 加速</p>
          </div>
        </div>
      </div>
    </div>
  );
}
