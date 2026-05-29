#!/bin/bash
set -e

echo "========================================"
echo "  歌词工坊 - 云服务器自动部署脚本"
echo "========================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    log_error "请使用 sudo 运行此脚本"
    echo "示例: sudo bash server-deploy.sh"
    exit 1
fi

# 获取服务器 IP
SERVER_IP=$(hostname -I | awk '{print $1}')

log_info "检测到服务器 IP: $SERVER_IP"
echo ""

# 步骤 1: 更新系统
log_info "[1/8] 更新系统软件包..."
apt update && apt upgrade -y
log_success "系统更新完成"
echo ""

# 步骤 2: 安装必要软件
log_info "[2/8] 安装 Nginx 和必要工具..."
apt install nginx curl wget git -y
log_success "软件安装完成"
echo ""

# 步骤 3: 创建网站目录
log_info "[3/8] 创建网站目录..."
mkdir -p /var/www/lyrics-studio
log_success "目录创建完成"
echo ""

# 步骤 4: 检测部署文件
log_info "[4/8] 检测部署文件..."
if [ -d "./dist" ]; then
    log_success "找到 dist 目录"
    log_info "正在复制网站文件..."
    cp -r ./dist/* /var/www/lyrics-studio/
    log_success "文件复制完成"
elif [ -f "./lyrics-studio-deploy.tar.gz" ]; then
    log_success "找到部署包"
    log_info "正在解压部署包..."
    tar -xzf lyrics-studio-deploy.tar.gz -C /tmp/
    if [ -d "/tmp/dist" ]; then
        cp -r /tmp/dist/* /var/www/lyrics-studio/
        log_success "文件复制完成"
    else
        log_error "部署包中未找到 dist 目录"
        exit 1
    fi
else
    log_warning "未找到部署文件"
    echo ""
    echo "请选择部署方式："
    echo "1) 从 GitHub 克隆（需要仓库地址）"
    echo "2) 手动上传文件后重新运行脚本"
    echo ""
    read -p "请选择 (1/2): " choice

    if [ "$choice" = "1" ]; then
        read -p "请输入 GitHub 仓库地址: " repo_url
        log_info "正在克隆仓库..."
        git clone "$repo_url" /tmp/lyrics-studio-repo
        cd /tmp/lyrics-studio-repo
        
        # 检查是否有 package.json
        if [ -f "package.json" ]; then
            log_info "正在安装 Node.js 和 npm..."
            curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
            apt install nodejs -y
            
            log_info "正在安装依赖..."
            npm install
            
            log_info "正在构建项目..."
            npm run build
            
            cp -r dist/* /var/www/lyrics-studio/
            log_success "构建并部署完成"
        else
            log_error "仓库中未找到 package.json"
            exit 1
        fi
    else
        log_info "请使用以下命令上传文件："
        echo ""
        echo "  scp -r dist/ root@$SERVER_IP:/var/www/lyrics-studio/"
        echo ""
        log_info "上传完成后重新运行此脚本"
        exit 0
    fi
fi
echo ""

# 步骤 5: 配置 Nginx
log_info "[5/8] 配置 Nginx..."

# 创建 Nginx 配置
cat > /etc/nginx/sites-available/lyrics-studio << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/lyrics-studio;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 隐藏敏感文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# 启用站点
ln -sf /etc/nginx/sites-available/lyrics-studio /etc/nginx/sites-enabled/

# 删除默认站点（如果存在）
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
fi

log_success "Nginx 配置完成"
echo ""

# 步骤 6: 设置文件权限
log_info "[6/8] 设置文件权限..."
chown -R www-data:www-data /var/www/lyrics-studio
chmod -R 755 /var/www/lyrics-studio
log_success "权限设置完成"
echo ""

# 步骤 7: 测试并重启 Nginx
log_info "[7/8] 测试 Nginx 配置..."
if nginx -t; then
    log_success "配置测试通过"
    log_info "正在重启 Nginx..."
    systemctl restart nginx
    systemctl enable nginx
    log_success "Nginx 重启完成"
else
    log_error "Nginx 配置错误，请检查"
    exit 1
fi
echo ""

# 步骤 8: 配置防火墙
log_info "[8/8] 配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    if ! ufw status | grep -q "Status: active"; then
        echo "y" | ufw enable
    fi
    log_success "防火墙配置完成"
else
    log_warning "未检测到 ufw，跳过防火墙配置"
fi
echo ""

# 完成！
log_success "========================================"
log_success "  ✅ 部署成功！"
log_success "========================================"
echo ""
echo "🎉 恭喜！歌词工坊已成功部署到您的云服务器！"
echo ""
echo "📍 访问地址："
echo "   本地: http://localhost/"
echo "   网络: http://$SERVER_IP/"
echo ""
echo "📁 网站目录：/var/www/lyrics-studio"
echo ""
echo "📋 下一步操作："
echo ""
echo "1. 配置域名（可选）"
echo "   • 在域名管理后台添加 A 记录，指向 $SERVER_IP"
echo "   • 修改 /etc/nginx/sites-available/lyrics-studio 中的 server_name"
echo ""
echo "2. 配置 HTTPS（推荐）"
echo "   • 运行以下命令安装 SSL 证书："
echo "     apt install certbot python3-certbot-nginx -y"
echo "     certbot --nginx"
echo ""
echo "3. 更新网站"
echo "   • 重新构建项目后上传文件到 /var/www/lyrics-studio/"
echo "   • 运行: systemctl reload nginx"
echo ""
echo "📖 详细文档请查看：云服务器部署指南.md"
echo ""
