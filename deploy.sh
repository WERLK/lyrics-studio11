#!/bin/bash

echo "========================================"
echo "  歌词工坊 - 网站部署脚本"
echo "========================================"
echo ""

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo "[错误] 请使用 sudo 运行此脚本"
    echo "示例: sudo bash deploy.sh"
    exit 1
fi

# 创建网站目录
echo "[1/4] 创建网站目录..."
mkdir -p /var/www/lyrics-studio

# 复制文件
echo "[2/4] 复制网站文件..."
cp -r /workspace/dist/* /var/www/lyrics-studio/

# 配置 Nginx
echo "[3/4] 配置 Nginx..."
if [ ! -f /etc/nginx/sites-available/lyrics-studio ]; then
    cp /workspace/nginx.conf /etc/nginx/sites-available/lyrics-studio
    ln -sf /etc/nginx/sites-available/lyrics-studio /etc/nginx/sites-enabled/
    echo "[✓] Nginx 配置完成"
else
    echo "[✓] Nginx 配置已存在，跳过"
fi

# 测试并重启 Nginx
echo "[4/4] 重启 Nginx 服务..."
nginx -t && systemctl restart nginx

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  ✅ 部署成功！"
    echo "========================================"
    echo ""
    echo "🎉 网站已成功部署！"
    echo ""
    echo "📍 访问地址："
    echo "   本地: http://localhost/"
    echo "   网络: http://$(hostname -I | awk '{print $1}')/"
    echo ""
    echo "📁 网站目录：/var/www/lyrics-studio"
    echo ""
    echo "💡 提示："
    echo "   • 如需域名访问，请配置 DNS 解析"
    echo "   • 桌面版下载请访问 /download 页面"
    echo "   • 小程序代码请查看 /workspace/miniapp 目录"
    echo ""
else
    echo ""
    echo "❌ 部署失败，请检查 Nginx 配置"
    exit 1
fi
