import { Link } from 'react-router-dom';
import { Sparkles, Layers, Edit3, Download, Globe, Monitor, Smartphone, Zap, Shield, Star, ArrowRight, Phone } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                歌词工坊
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200/80 mb-8 sm:mb-12 max-w-2xl mx-auto">
              让每一句歌词都成为你的故事。AI 智能歌词生成，随时随地创作。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
              <Link to="/create">
                <Button size="lg" className="shadow-2xl shadow-purple-500/30 px-8 sm:px-12 w-full sm:w-auto">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  开始创作
                </Button>
              </Link>
              <Link to="/download">
                <Button variant="secondary" size="lg" className="px-8 sm:px-12 w-full sm:w-auto">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  下载应用
                </Button>
              </Link>
            </div>
          </div>

          {/* Platform Support */}
          <div className="mb-8 sm:mb-12">
            <p className="text-sm sm:text-base text-purple-200/60 mb-4">多平台支持，随时随地创作</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
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
            {/* Version Switch */}
            <div className="flex justify-center">
              <Link
                to="/mobile"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 hover:bg-green-500/30 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">切换到手机版</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            <FeatureCard
              icon={<Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="智能生成"
              description="输入主题和风格，AI 为你创作独特歌词"
              delay={0}
            />
            <FeatureCard
              icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="多风格支持"
              description="流行、摇滚、民谣、说唱等多种音乐风格"
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
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              如何使用
            </h2>
            <p className="text-base sm:text-lg text-purple-200/70 max-w-2xl mx-auto">
              简单的四步，让你的歌词创作更加高效
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: '选择主题', desc: '输入你想要表达的主题和情感' },
              { step: '02', title: '选择风格', desc: '从流行、摇滚等多种风格中选择' },
              { step: '03', title: '生成歌词', desc: 'AI 智能生成独特的歌词内容' },
              { step: '04', title: '导出发布', desc: '导出歌词并发布到音乐平台' },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <div className="text-5xl font-bold text-purple-500/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-purple-200/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              强大的功能
            </h2>
            <p className="text-base sm:text-lg text-purple-200/70 max-w-2xl mx-auto">
              为创作者打造的专业工具
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: '快速生成', desc: '几秒钟内生成独特歌词' },
              { icon: Shield, title: '安全可靠', desc: '本地保存，数据安全加密' },
              { icon: Star, title: '高品质', desc: 'AI 优化保证歌词质量' },
              { icon: Globe, title: '多语言', desc: '支持中英文歌词创作' },
              { icon: Download, title: '导出方便', desc: '多种格式导出，灵活使用' },
              { icon: Monitor, title: '跨平台', desc: '网页、桌面、手机都能用' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-purple-200/60">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            准备好开始创作了吗？
          </h2>
          <p className="text-base sm:text-lg text-purple-200/70 mb-8">
            加入 thousands of 创作者，用 AI 赋能你的歌词创作
          </p>
          <Link to="/create">
            <Button size="lg" className="shadow-2xl shadow-purple-500/30 px-12">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              立即开始
            </Button>
          </Link>
        </div>
      </section>
    </div>
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
