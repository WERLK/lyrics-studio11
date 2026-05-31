import { useState } from 'react';
import { Globe, Lock, ExternalLink, Info, Search } from 'lucide-react';
import { musicPlatforms, platformCategories, accessGuides, MusicPlatform } from '../data/musicPlatforms';

export default function GlobalMusicPlatforms() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlatforms = musicPlatforms.filter(platform => {
    let matchesCategory = selectedCategory === 'all';
    if (selectedCategory === 'china') {
      matchesCategory = platform.accessibleInChina;
    } else if (selectedCategory === 'international') {
      matchesCategory = !platform.accessibleInChina;
    } else if (selectedCategory !== 'all') {
      matchesCategory = platform.type === selectedCategory || platform.region === selectedCategory;
    }
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">全球音乐平台</h1>
          <p className="text-purple-200/70 text-lg">发现全球最热门的音乐平台，从国内到国际</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              type="text"
              placeholder="搜索平台名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {platformCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  "px-4 py-2 rounded-full transition-all " + 
                  (selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20')
                }
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlatforms.map(platform => (
            <div
              key={platform.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition-all hover:border-purple-500/50"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                    {platform.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {platform.accessibleInChina ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <span>✓</span> 国内可直接访问
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <Lock className="w-4 h-4" /> 需要特殊访问方式
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-purple-200/70 text-sm mb-4">{platform.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {!platform.accessibleInChina && platform.accessMethod && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-200/80 text-xs">{platform.accessMethod}</p>
                    </div>
                  </div>
                )}

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all"
                >
                  <span>访问平台</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">🔐 国际平台访问指南</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {accessGuides.map((guide, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{guide.title}</h3>
                <pre className="text-purple-200/80 text-sm whitespace-pre-wrap font-sans">{guide.content}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}