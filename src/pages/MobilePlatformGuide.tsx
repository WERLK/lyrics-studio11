import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Music2, Upload, BookOpen, Info, ExternalLink, CheckCircle, AlertCircle, Filter, Globe, MapPin, Zap, ArrowLeft, Smartphone } from 'lucide-react';
import Button from '../components/ui/Button';
import { platforms, platformCategories, Platform } from '../data/platforms';

export default function MobilePlatformGuide() {
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
    <div className="min-h-screen bg-gray-950 pt-8 pb-12">
      <div className="px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/mobile"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                音乐平台
              </h1>
              <p className="text-purple-200/70 text-sm">
                {filteredPlatforms.length}个平台
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="搜索平台..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/5 text-purple-200/70 hover:bg-white/10'
              }`}
            >
              全部
            </button>
            {Object.entries(platformCategories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === key 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200/70 hover:bg-white/10'
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>

        {/* Platform List */}
        {filteredPlatforms.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-lg text-white mb-2">未找到匹配的平台</h3>
            <p className="text-purple-200/70 text-sm">请尝试调整搜索条件</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPlatforms.map((platform, index) => (
              <div
                key={`${platform.name}-${index}`}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {platform.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 truncate">
                      {platform.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-purple-200/70 flex items-center gap-1">
                        {getCategoryIcon(platform.category)}
                        {platformCategories[platform.category]?.name.split(' ')[0]}
                      </span>
                      <span className="text-xs text-purple-200/50">
                        {platform.region}
                      </span>
                    </div>
                    <div className="text-xs text-purple-200/60 line-clamp-2 mb-3">
                      {platform.tips[0]}
                    </div>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-purple-400 font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      前往平台
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
