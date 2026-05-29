import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, Globe, Music2, Zap } from 'lucide-react';

export default function VersionSelect() {
  const navigate = useNavigate();

  const goToMobile = () => {
    navigate('/mobile');
  };

  const goToDesktop = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            歌词工坊
          </h1>
          <p className="text-xl text-purple-200/70">
            选择适合你的版本
          </p>
        </div>

        {/* Version Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mobile Version */}
          <div 
            className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer"
            onClick={goToMobile}
          >
            <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
              手机版
            </h2>
            <p className="text-purple-200/70 mb-6">
              专为手机优化的体验，随时随地创作和发布你的音乐
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                触摸友好的界面
              </li>
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                单手操作优化
              </li>
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                手机尺寸适配
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 text-purple-400 font-semibold">
              <Zap className="w-4 h-4" />
              立即进入手机版
            </div>
          </div>

          {/* Desktop Version */}
          <div 
            className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer"
            onClick={goToDesktop}
          >
            <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Monitor className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              电脑版
            </h2>
            <p className="text-purple-200/70 mb-6">
              完整的创作工作台，专业的音乐发布功能
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                大屏创作体验
              </li>
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                完整功能集合
              </li>
              <li className="flex items-center gap-2 text-sm text-purple-200/60">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                键盘快捷键支持
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 text-blue-400 font-semibold">
              <Globe className="w-4 h-4" />
              立即进入电脑版
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <p className="text-purple-200/50 text-sm mb-4">
            不确定选择哪个？
          </p>
          <p className="text-purple-200/70 text-sm">
            系统会根据你的设备自动推荐合适的版本
          </p>
        </div>
      </div>
    </div>
  );
}
