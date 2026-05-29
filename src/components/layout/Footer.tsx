import { Link, useLocation } from 'react-router-dom';
import { Music2, Github, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  
  const isMobilePage = location.pathname.startsWith('/mobile');
  
  if (isMobilePage) {
    return null;
  }

  return (
    <footer className="bg-black/30 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                歌词工坊
              </span>
            </Link>
            <p className="text-sm text-purple-200/60 mb-4">
              让每一句歌词都成为你的故事。智能歌词生成与管理工具。
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200/60 hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@lyrics-studio.com"
                className="text-purple-200/60 hover:text-purple-400 transition-colors"
                aria-label="邮箱"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors">
                  开始创作
                </Link>
              </li>
              <li>
                <Link to="/download" className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors">
                  下载应用
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors">
                  平台指南
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">资源</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/workspace/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors"
                >
                  文档
                </a>
              </li>
              <li>
                <a
                  href="/workspace/BUILD-GUIDE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors"
                >
                  构建指南
                </a>
              </li>
              <li>
                <a
                  href="/workspace/GITHUB-DEPLOY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-200/60 hover:text-purple-400 transition-colors"
                >
                  部署指南
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">支持平台</h3>
            <ul className="space-y-2">
              <li className="text-sm text-purple-200/60">网页版</li>
              <li className="text-sm text-purple-200/60">Windows</li>
              <li className="text-sm text-purple-200/60">macOS</li>
              <li className="text-sm text-purple-200/60">iOS & Android</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-purple-200/60">
              © 2024 歌词工坊. 保留所有权利.
            </p>
            <p className="text-xs text-purple-200/60 flex items-center gap-1">
              用 <Heart className="w-3 h-3 text-red-400" /> 打造
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
