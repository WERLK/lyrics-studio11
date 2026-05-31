#!/bin/bash
set -e

echo "========================================"
echo "  歌词工坊 - 自动更新服务安装脚本"
echo "========================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
    echo "示例: sudo bash install-auto-update.sh"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 步骤 1: 安装依赖
log_info "[1/5] 检查并安装依赖..."
apt update
apt install git nodejs npm -y
log_success "依赖安装完成"
echo ""

# 步骤 2: 创建配置目录
log_info "[2/5] 创建配置目录..."
mkdir -p /etc/lyrics-studio
mkdir -p /opt/lyrics-studio
mkdir -p /var/www/lyrics-studio

# 复制配置文件（如果不存在）
if [ ! -f /etc/lyrics-studio/auto-update.conf ]; then
    cp "$SCRIPT_DIR/auto-update.conf.example" /etc/lyrics-studio/auto-update.conf
    log_success "配置文件已创建: /etc/lyrics-studio/auto-update.conf"
else
    log_warning "配置文件已存在，跳过"
fi
echo ""

# 步骤 3: 复制自动更新脚本
log_info "[3/5] 安装自动更新脚本..."
cp "$SCRIPT_DIR/auto-update.sh" /opt/lyrics-studio/
chmod +x /opt/lyrics-studio/auto-update.sh
log_success "脚本已安装: /opt/lyrics-studio/auto-update.sh"
echo ""

# 步骤 4: 安装 systemd 服务
log_info "[4/5] 安装 systemd 服务..."
cp "$SCRIPT_DIR/lyrics-studio-auto-update.service" /etc/systemd/system/
systemctl daemon-reload
log_success "systemd 服务已安装"
echo ""

# 步骤 5: 初始化仓库
log_info "[5/5] 初始化 Git 仓库..."
if [ ! -d "/opt/lyrics-studio/.git" ]; then
    cd /opt/lyrics-studio
    git clone "https://github.com/WERLK/lyrics-studio11.git" .
    git checkout master
    
    # 初始构建和部署
    if [ -f "package.json" ]; then
        npm install
        npm run build
        if [ -d "dist" ]; then
            cp -r dist/* /var/www/lyrics-studio/
            chown -R www-data:www-data /var/www/lyrics-studio
            chmod -R 755 /var/www/lyrics-studio
        fi
    fi
    log_success "仓库初始化完成"
else
    log_warning "仓库已存在，跳过"
fi
echo ""

# 完成
log_success "========================================"
log_success "  ✅ 安装成功！"
log_success "========================================"
echo ""
echo "📋 服务管理命令："
echo ""
echo "  启动服务:    sudo systemctl start lyrics-studio-auto-update"
echo "  停止服务:    sudo systemctl stop lyrics-studio-auto-update"
echo "  重启服务:    sudo systemctl restart lyrics-studio-auto-update"
echo "  查看状态:    sudo systemctl status lyrics-studio-auto-update"
echo "  查看日志:    sudo journalctl -u lyrics-studio-auto-update -f"
echo "  开机自启:    sudo systemctl enable lyrics-studio-auto-update"
echo ""
echo "📝 配置文件:   /etc/lyrics-studio/auto-update.conf"
echo "📁 日志文件:   /var/log/lyrics-studio-auto-update.log"
echo ""
echo "🚀 现在可以启动服务了！"
echo ""
