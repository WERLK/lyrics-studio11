import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Music2, Upload, BookOpen, Info, ExternalLink, CheckCircle, AlertCircle, HelpCircle, Filter, Globe, MapPin, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import { platforms, platformCategories, Platform } from '../data/platforms';

export default function PlatformGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          platform.tips.some(tip => tip.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || platform.region === selectedRegion;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'china': return <Globe className="w-4 h-4" />;
      case 'international': return <Globe className="w-4 h-4" />;
      case 'aggregator': return <Upload className="w-4 h-4" />;
      case 'social': return <MapPin className="w-4 h-4" />;
      case 'podcast': return <Music2 className="w-4 h-4" />;
      case 'ai': return <Zap className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回创作
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            音乐平台上传指南
          </h1>
          <p className="text-xl text-purple-200/70 max-w-2xl">
            将你的歌词和音乐作品发布到全球 {platforms.length}+ 个音乐平台，让更多人听到你的创作
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="搜索平台..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="all">全部分类</option>
                {Object.entries(platformCategories).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="all">全部地区</option>
                <option value="国内">🇨🇳 国内</option>
                <option value="国际">🌍 国际</option>
                <option value="全球">🌐 全球</option>
              </select>
            </div>

            {/* Platform Count */}
            <div className="flex-1 text-right">
              <span className="text-purple-300/70 text-sm">
                共找到 <span className="text-purple-400 font-semibold">{filteredPlatforms.length}</span> 个平台
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 mb-12 border border-purple-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">上传前的准备工作</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-200/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  高质量音频文件（WAV/MP3）
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  高清作品封面（正方形）
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  LRC 格式歌词文件
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Grid */}
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-16">
            <Globe className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">未找到匹配的平台</h3>
            <p className="text-purple-300/70">请尝试调整搜索条件或筛选器</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredPlatforms.map((platform, index) => (
              <div
                key={`${platform.name}-${index}`}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/50 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-xl shadow-lg`}>
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white group-hover:text-white transition-colors truncate">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-purple-300/70 flex items-center gap-1">
                          {getCategoryIcon(platform.category)}
                          {platformCategories[platform.category]?.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Upload className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0" />
                </div>

                <div className="space-y-3">
                  {/* Steps */}
                  <div>
                    <h4 className="text-xs font-semibold text-purple-200/80 mb-2 flex items-center gap-2">
                      <BookOpen className="w-3 h-3" />
                      上传步骤
                    </h4>
                    <ol className="space-y-1">
                      {platform.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                            {idx + 1}
                          </span>
                          <span className="text-purple-200/60 line-clamp-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="text-xs font-semibold text-purple-200/80 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-3 h-3" />
                      提示
                    </h4>
                    <ul className="space-y-1">
                      {platform.tips.slice(0, 2).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <AlertCircle className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-purple-200/60 line-clamp-2">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="primary" className="w-full" size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      开始上传
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category Overview */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">平台分类概览</h2>
            <p className="text-purple-200/70">了解不同类型的音乐平台，选择最适合你的发行渠道</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(platformCategories).map(([key, value]) => {
              const count = platforms.filter(p => p.category === key).length;
              return (
                <div key={key} className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-2">{getCategoryIcon(key)}</div>
                  <h3 className="text-white font-semibold mb-1 text-sm">{value.name}</h3>
                  <p className="text-purple-300/60 text-xs">{count} 个平台</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribution Guide */}
        <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-8 border border-green-500/20 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">数字发行攻略</h2>
            <p className="text-purple-200/70">使用专业发行平台，一次上传全网发行</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-400" />
                为什么使用发行平台？
              </h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>一次上传，自动分发到100+平台</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>统一管理版权和版税收入</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>专业的元数据管理和版权保护</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Music2 className="w-5 h-5 text-blue-400" />
                推荐发行平台
              </h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2"></span>
                  <span>DistroKid - 无限上传，性价比高</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2"></span>
                  <span>TuneCore - 专业版权管理服务</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 mt-2"></span>
                  <span>CD Baby - 一次性付费，永久发行</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">更多资源与帮助</h2>
            <p className="text-purple-200/70">需要更多帮助？查看这些有用的资源</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Music2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">版权保护</h3>
              <p className="text-sm text-purple-200/60">
                了解如何保护你的音乐作品版权，申请ISRC等
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">版税指南</h3>
              <p className="text-sm text-purple-200/60">
                了解各平台的版税分成机制和收款方式
              </p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">音乐人社区</h3>
              <p className="text-sm text-purple-200/60">
                加入音乐人社区，交流创作和发行经验
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
