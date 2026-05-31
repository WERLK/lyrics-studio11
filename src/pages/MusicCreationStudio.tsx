import { useState } from 'react';
import { Wand2, Music, Palette, Type, Layers, Volume2, Save, Download, Copy, RotateCcw } from 'lucide-react';
import { musicCreationFeatures } from '../data/musicPlatforms';

export default function MusicCreationStudio() {
  const [activeTab, setActiveTab] = useState('lyrics');
  const [lyricsText, setLyricsText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLyrics = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLyricsText(`[主歌1]
在这个特别的时刻
我想对你说声感谢
感谢你一直的陪伴
让我感到温暖

[预副歌]
每一个音符都是我对你的思念
每一个旋律都是我对你的爱恋

[副歌]
你是我生命中的阳光
照亮我前行的方向
有你在身边
我什么都不害怕

[主歌2]
想起我们在一起的时光
那些美好的回忆
永远都不会忘记
你是我最珍贵的礼物

[副歌]
你是我生命中的阳光
照亮我前行的方向
有你在身边
我什么都不害怕

[桥段]
让我们一起牵手
走向未来的每一天
不管有多少风雨
我都会陪在你身边

[副歌]
你是我生命中的阳光
照亮我前行的方向
有你在身边
我什么都不害怕
`);
    setIsGenerating(false);
  };

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyricsText);
    alert('歌词已复制！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/20 to-gray-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">音乐创作工作室</h1>
          <p className="text-purple-200/70 text-lg">从歌词到发行，一站式音乐创作工具</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {musicCreationFeatures.map(feature => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-6 py-3 rounded-2xl transition-all flex items-center gap-3 ${
                  activeTab === feature.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                <span className="text-xl">{feature.icon}</span>
                <span className="font-medium">{feature.name}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'lyrics' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">创作参数</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">歌词主题</label>
                    <input
                      type="text"
                      placeholder="例如：爱情、梦想、友情..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">音乐风格</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option value="pop">流行 Pop</option>
                      <option value="rock">摇滚 Rock</option>
                      <option value="folk">民谣 Folk</option>
                      <option value="rap">说唱 Rap</option>
                      <option value="rnb">R&B</option>
                      <option value="ancient">中国风</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">歌曲结构</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option value="standard">标准：主-副-主-副-桥-副</option>
                      <option value="simple">简单：主-副-主-副</option>
                      <option value="verse">多段：多段主歌</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purple-200/80 text-sm mb-2">歌词长度</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option value="short">短歌（约16行）</option>
                      <option value="medium">中等（约32行）</option>
                      <option value="long">长歌（约48行）</option>
                    </select>
                  </div>
                  <button
                    onClick={generateLyrics}
                    disabled={isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        生成中...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Wand2 className="w-5 h-5" />
                        生成歌词
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">歌词编辑</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLyricsText('')}
                      className="p-2 bg-white/10 rounded-lg text-purple-200 hover:bg-white/20 transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={copyLyrics}
                      className="p-2 bg-white/10 rounded-lg text-purple-200 hover:bg-white/20 transition-all"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/10 rounded-lg text-purple-200 hover:bg-white/20 transition-all">
                      <Save className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/10 rounded-lg text-purple-200 hover:bg-white/20 transition-all">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={lyricsText}
                  onChange={(e) => setLyricsText(e.target.value)}
                  placeholder="歌词将在这里显示..."
                  className="w-full h-96 px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'lyrics' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-4xl">{musicCreationFeatures.find(f => f.id === activeTab)?.icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{musicCreationFeatures.find(f => f.id === activeTab)?.name}</h2>
            <p className="text-purple-200/70">{musicCreationFeatures.find(f => f.id === activeTab)?.description}</p>
            <p className="text-purple-200/50 mt-4 text-sm">该功能即将上线，敬请期待！</p>
          </div>
        )}
      </div>
    </div>
  );
}
