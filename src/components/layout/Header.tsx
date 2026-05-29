import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music2, BookOpen, Download, User, LogOut, Menu, X } from 'lucide-react';
import { useStore } from '../../store';

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isMobilePage = location.pathname.startsWith('/mobile');

  if (isAuthPage || isMobilePage) {
    return null;
  }

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/create', label: '开始创作' },
    { path: '/guide', label: '平台指南', icon: BookOpen },
    { path: '/download', label: '下载', icon: Download, isButton: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              歌词工坊
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              if (link.isButton) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                      isActive
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'text-purple-400'
                      : 'text-purple-200/60 hover:text-purple-300'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{user?.username || '用户'}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-purple-200/60 hover:text-purple-300 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
                >
                  注册
                </Link>
              </div>
            )}
          </nav>

          <button
            className="lg:hidden p-2 text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-slide-in-right">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                if (link.isButton) {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-medium px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                        isActive
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-purple-200/70 hover:text-purple-300 hover:bg-white/5'
                    }`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-white/10 mt-2 pt-4">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user?.username || '用户'}</p>
                        <p className="text-xs text-purple-200/60">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2 text-purple-400 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-xl text-purple-200/70 hover:text-purple-300 hover:bg-white/5 transition-colors text-center"
                    >
                      登录
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity text-center"
                    >
                      注册
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
