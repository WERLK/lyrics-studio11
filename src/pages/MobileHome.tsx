import { Link } from 'react-router-dom';
import { Music2, Sparkles, Smartphone, Monitor, Zap, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function MobileHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 pt-12 pb-16">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            歌词工坊
          </h1>
          <p className="text-purple-200/70 text-sm">
            手机专属创作体验
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-10">
          <Link
            to="/mobile/create"
            className="block bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">创作歌词</h3>
                  <p className="text-sm opacity-80">智能生成你的灵感</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          <Link
            to="/mobile/guide"
            className="block bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">发布平台</h3>
                  <p className="text-sm text-purple-200/70">100+音乐平台指南</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </Link>
        </div>

        {/* Platform Stats */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-400" />
            平台统计
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">100+</div>
              <div className="text-xs text-purple-200/60">音乐平台</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-pink-400">20+</div>
              <div className="text-xs text-purple-200/60">国内平台</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">30+</div>
              <div className="text-xs text-purple-200/60">国际平台</div>
            </div>
          </div>
        </div>

        {/* Switch to Desktop */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
          >
            <Monitor className="w-4 h-4" />
            切换到电脑版
          </Link>
        </div>
      </div>
    </div>
  );
}
