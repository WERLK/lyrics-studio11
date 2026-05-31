#!/bin/bash
set -e

echo "========================================"
echo "  歌词工坊 - 自动更新服务"
echo "========================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S') INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S') SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S') WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S') ERROR]${NC} $1"
}

# 配置文件路径
CONFIG_FILE="/etc/lyrics-studio/auto-update.conf"

# 默认配置
REPO_URL="https://github.com/WERLK/lyrics-studio11.git"
REPO_BRANCH="master"
CHECK_INTERVAL=60
WORK_DIR="/opt/lyrics-studio"
WEB_DIR="/var/www/lyrics-studio"
LOG_FILE="/var/log/lyrics-studio-auto-update.log"

# 加载配置文件
load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        log_info "加载配置文件: $CONFIG_FILE"
        source "$CONFIG_FILE"
    else
        log_warning "配置文件不存在，使用默认配置"
    fi
}

# 初始化工作目录
init_work_dir() {
    log_info "初始化工作目录..."
    mkdir -p "$WORK_DIR"
    mkdir -p "$(dirname "$LOG_FILE")"
    mkdir -p "$WEB_DIR"
    
    # 如果工作目录不是Git仓库，克隆仓库
    if [ ! -d "$WORK_DIR/.git" ]; then
        log_info "克隆仓库: $REPO_URL"
        git clone "$REPO_URL" "$WORK_DIR"
        cd "$WORK_DIR"
        git checkout "$REPO_BRANCH"
    else
        cd "$WORK_DIR"
    fi
}

# 检查并更新
check_and_update() {
    cd "$WORK_DIR"
    
    log_info "检查远程更新..."
    
    # 获取最新的远程信息
    git fetch origin "$REPO_BRANCH" > /dev/null 2>&1
    
    # 比较本地和远程
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse "origin/$REPO_BRANCH")
    
    if [ "$LOCAL" = "$REMOTE" ]; then
        log_info "没有新的更新"
        return 0
    fi
    
    log_success "发现新的更新！"
    log_info "正在拉取最新代码..."
    
    # 拉取最新代码
    git pull origin "$REPO_BRANCH"
    
    log_info "正在构建项目..."
    
    # 检查是否有 package.json
    if [ -f "package.json" ]; then
        # 安装依赖
        if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
            npm install
        fi
        
        # 构建
        npm run build
        
        # 部署
        if [ -d "dist" ]; then
            log_info "正在部署到 $WEB_DIR"
            rm -rf "$WEB_DIR"/*
            cp -r dist/* "$WEB_DIR/"
            
            # 设置权限
            chown -R www-data:www-data "$WEB_DIR"
            chmod -R 755 "$WEB_DIR"
            
            # 重启 Nginx
            if systemctl is-active --quiet nginx; then
                log_info "重新加载 Nginx..."
                systemctl reload nginx
            fi
            
            log_success "✅ 更新成功！"
        else
            log_error "构建失败，未找到 dist 目录"
        fi
    else
        log_warning "未找到 package.json，跳过构建"
    fi
}

# 主循环
main_loop() {
    log_info "自动更新服务已启动"
    log_info "检查间隔: ${CHECK_INTERVAL}秒"
    log_info "仓库: $REPO_URL (分支: $REPO_BRANCH)"
    log_info "按 Ctrl+C 停止服务"
    echo ""
    
    while true; do
        check_and_update || log_error "更新检查失败"
        sleep "$CHECK_INTERVAL"
    done
}

# 单次检查模式
single_check() {
    log_info "执行单次更新检查..."
    check_and_update
}

# 显示帮助
show_help() {
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -s, --single    执行单次更新检查"
    echo "  -d, --daemon    作为守护进程运行（持续检查）"
    echo "  -h, --help      显示此帮助信息"
    echo ""
    echo "配置文件: $CONFIG_FILE"
    echo "日志文件: $LOG_FILE"
    echo ""
}

# 主函数
main() {
    load_config
    init_work_dir
    
    case "${1:-daemon}" in
        -s|--single)
            single_check
            ;;
        -d|--daemon)
            main_loop
            ;;
        -h|--help)
            show_help
            ;;
        *)
            show_help
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"
