import { Link } from 'react-router-dom';
import { Sparkles, Layers, Edit3, Smartphone, Monitor, Download, Globe, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              歌词工坊
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200/80 mb-8 sm:mb-12 max-w-lg sm:max-w-xl mx-auto">
            让每一句歌词都成为你的故事
          </p>

          <Link to="/create">
            <Button size="lg" className="shadow-2xl shadow-purple-500/30 px-8 sm:px-12">
              开始创作
            </Button>
          </Link>
        </div>

        {/* 平台支持展示 */}
        <div className="mt-12 sm:mt-16 mb-8 sm:mb-12">
          <p className="text-sm sm:text-base text-purple-200/60 mb-4">支持多平台使用</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <span className="text-xs sm:text-sm text-purple-200/80">网页版</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-xs sm:text-sm text-purple-200/80">桌面版</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="text-xs sm:text-sm text-purple-200/80">iOS/Android</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 px-4">
          <FeatureCard
            icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="智能生成"
            description="输入主题和风格，AI为你创作独特歌词"
            delay={0}
          />
          <FeatureCard
            icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="多风格支持"
            description="流行、摇滚，民谣、说唱等多种音乐风格"
            delay={100}
          />
          <FeatureCard
            icon={<Edit3 className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="即时编辑"
            description="在线编辑调整，保存你的创作灵感"
            delay={200}
          />
          <FeatureCard
            icon={<Download className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="多端同步"
            description="网页、桌面、手机随时随地创作"
            delay={300}
          />
        </div>

        {/* 快速链接 */}
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            to="/download"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all text-purple-200 text-sm sm:text-base"
          >
            📥 下载应用
          </Link>
          <Link
            to="/guide"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all text-purple-200 text-sm sm:text-base"
          >
            📚 发布指南
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="group p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3 sm:mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-purple-200/60">{description}</p>
    </div>
  );
}
