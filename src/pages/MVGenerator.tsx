import { useState } from 'react';
import { Video, Film, Music, Layers, Download, Share2, Play, Pause, RotateCcw, Wand2 } from 'lucide-react';
import { mvStyles, resolutions, videoGuides } from '../data/videoPlatforms';

export default function MVGenerator() {
  const [lyrics, setLyrics] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMV, setGeneratedMV] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'guide'>('create');

  const generateMV = async () => {
    if (!lyrics) {
      alert('请先输入歌词');
      return;
    }

    setIsGenerating(true);
    
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 3000));

    setGeneratedMV({
      id: Date.now(),
      title: '我的MV作品',
      status: 'completed',
      style: selectedStyle,
      resolution: selectedResolution,
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iIzMzNjY2OSIvPjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1WX0dFTkVSQVRFRDwvdGV4dD48L3N2Zz4='
    });

    setIsGenerating(false);
  };

  const resetMV = () => {
    setLyrics('');
    setGeneratedMV(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 pt-20 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">MV视频生成器</h1>
          <p className="text-purple-200/70 text-lg">AI智能生成专业级音乐视频</p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-xl transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Film className="w-5 h-5 inline mr-2" />
            创建MV
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-3 rounded-xl transition-all ${
              activeTab === 'guide'
                ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Wand2 className="w-5 h-5 inline mr-2" />
            制作指南
          </button>
        </div>

        {activeTab === 'create' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 左侧：参数设置 */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  歌词输入
                </h3>
                <textarea
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  placeholder="输入你的歌词..."
                  className="w-full h-48 px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-pink-500 resize-none"
                />
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  MV风格
                </h3>
                <div className="space-y-3">
                  {mvStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full p-4 rounded-xl transition-all text-left ${
                        selectedStyle === style.id
                          ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                          : 'bg-white/10 text-purple-200 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{style.icon}</span>
                            <span className="font-semibold">{style.name}</span>
                          </div>
                          <p className="text-sm opacity-80">{style.description}</p>
                        </div>
                        <span className="text-sm">{style.price}积分</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  输出分辨率
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {resolutions.map(res => (
                    <button
                      key={res.id}
                      onClick={() => setSelectedResolution(res.id)}
                      className={`p-4 rounded-xl transition-all text-center ${
                        selectedResolution === res.id
                          ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                          : 'bg-white/10 text-purple-200 hover:bg-white/20'
                      }`}
                    >
                      <div className="font-bold mb-1">{res.name}</div>
                      <div className="text-sm opacity-80">{res.description}</div>
                      {res.price > 0 && <div className="text-xs mt-1">+{res.price}积分</div>}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateMV}
                disabled={isGenerating || !lyrics}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    生成中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    生成MV
                  </span>
                )}
              </button>
            </div>

            {/* 右侧：预览区域 */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 h-full">
                <h3 className="text-xl font-bold text-white mb-4">MV预览</h3>
                
                {generatedMV ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                      <img
                        src={generatedMV.thumbnail}
                        alt="MV Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                          <Play className="w-10 h-10 text-white" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                        <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-full h-1">
                          <div className="w-0 h-full bg-pink-500 rounded-full" />
                        </div>
                        <span className="text-white text-sm">00:00 / 03:45</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <div>
                        <h4 className="text-white font-semibold">{generatedMV.title}</h4>
                        <p className="text-purple-200/70 text-sm">
                          风格: {mvStyles.find(s => s.id === generatedMV.style)?.name} | 
                          分辨率: {selectedResolution}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          下载
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg text-white hover:opacity-90 transition-all flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          分享
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={resetMV}
                      className="w-full py-3 bg-white/10 rounded-xl text-purple-200 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      重新创作
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Film className="w-24 h-24 text-purple-400/50 mx-auto mb-4" />
                      <p className="text-purple-200/50">输入歌词并选择风格开始生成</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
            <div className="space-y-8">
              {videoGuides.map((guide, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-white mb-6">{guide.title}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guide.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
                            {stepIdx + 1}
                          </div>
                          <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-orange-500 rounded" />
                        </div>
                        <p className="text-purple-200/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
