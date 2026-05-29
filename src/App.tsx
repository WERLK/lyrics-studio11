import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className={`text-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-4xl">🎵</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">歌词工坊</h1>
        <p className="text-purple-200/70">智能歌词生成与管理工具</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-4xl">🎵</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">歌词工坊</h1>
          <p className="text-xl text-purple-200/70 max-w-2xl mx-auto">
            让每一句歌词都成为你的故事。AI 智能歌词生成，随时随地创作。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-2">手机版</h3>
            <p className="text-purple-200/70 mb-4">专为手机优化的体验</p>
            <a href="/mobile" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              进入手机版
              <CheckCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-5xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-white mb-2">电脑版</h3>
            <p className="text-purple-200/70 mb-4">完整的创作工作台</p>
            <a href="/create" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              开始创作
              <CheckCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-purple-200/50 text-sm">
            多平台支持：网页版 · Windows · macOS · iOS · Android
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileHome() {
  return (
    <div className="min-h-screen bg-gray-950 pt-8 pb-16 px-4">
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-3xl">🎵</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">歌词工坊</h1>
        <p className="text-purple-200/70 text-sm">手机专属创作体验</p>
      </div>

      <div className="space-y-4">
        <a href="/mobile/create" className="block bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h3 className="font-semibold">创作歌词</h3>
                <p className="text-sm opacity-80">智能生成你的灵感</p>
              </div>
            </div>
            <span className="text-lg">→</span>
          </div>
        </a>

        <a href="/mobile/guide" className="block bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">发布平台</h3>
                <p className="text-sm text-purple-200/70">100+音乐平台指南</p>
              </div>
            </div>
            <span className="text-lg text-purple-400">→</span>
          </div>
        </a>
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm">
          <span>🖥️</span>
          切换到电脑版
        </a>
      </div>
    </div>
  );
}

function MobileCreator() {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLyrics = async () => {
    if (!mood && !genre) {
      alert('请至少填写一项！');
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedLyrics = `[主歌1]
${mood || '在这个'}的夜晚
感受${genre || '音乐'}的节奏
每一个音符
都是我要对你说的话

[副歌]
${mood || '跟着'}音乐舞动
${genre || '让旋律'}穿透灵魂
${mood || '这一刻'}属于你我
${genre || '让音乐'}永不停止`;

    setLyrics(generatedLyrics);
    setIsGenerating(false);
  };

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyrics);
    alert('歌词已复制！');
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-8 pb-16 px-4">
      <div className="mb-6">
        <a href="/mobile" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors">
          <span>←</span>
          返回
        </a>
        <h1 className="text-2xl font-bold text-white">歌词创作</h1>
      </div>

      {!lyrics ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-purple-200/70 mb-2">心情/主题</label>
            <input
              type="text"
              placeholder="例如：快乐、悲伤、励志..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-200/70 mb-2">音乐风格</label>
            <input
              type="text"
              placeholder="例如：流行、摇滚、说唱..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={generateLyrics}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
          >
            {isGenerating ? '创作中...' : '生成歌词'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">你的歌词</h3>
            <pre className="text-purple-200/80 text-sm whitespace-pre-wrap">{lyrics}</pre>
          </div>
          <button onClick={copyLyrics} className="w-full py-3 bg-white/10 border border-white/10 rounded-xl text-white">
            复制歌词
          </button>
          <button onClick={() => { setLyrics(''); setMood(''); setGenre(''); }} className="w-full py-3 border border-white/10 rounded-xl text-purple-200/70">
            再创作一首
          </button>
        </div>
      )}
    </div>
  );
}

function MobilePlatformGuide() {
  const platforms = [
    { name: 'QQ音乐', category: 'china', region: '中国', url: 'https://y.qq.com', icon: '🎵', color: 'from-green-500 to-emerald-500' },
    { name: '网易云音乐', category: 'china', region: '中国', url: 'https://music.163.com', icon: '🎶', color: 'from-red-500 to-orange-500' },
    { name: '酷狗音乐', category: 'china', region: '中国', url: 'https://www.kugou.com', icon: '🎧', color: 'from-blue-500 to-cyan-500' },
    { name: '酷我音乐', category: 'china', region: '中国', url: 'https://www.kuwo.cn', icon: '🎤', color: 'from-purple-500 to-pink-500' },
    { name: 'Apple Music', category: 'international', region: '全球', url: 'https://music.apple.com', icon: '🍎', color: 'from-gray-400 to-gray-600' },
    { name: 'Spotify', category: 'international', region: '全球', url: 'https://open.spotify.com', icon: '🎼', color: 'from-green-500 to-emerald-400' },
    { name: 'YouTube Music', category: 'international', region: '全球', url: 'https://music.youtube.com', icon: '📺', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-8 pb-12 px-4">
      <div className="mb-6">
        <a href="/mobile" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors">
          <span>←</span>
          返回
        </a>
        <h1 className="text-2xl font-bold text-white">音乐平台</h1>
        <p className="text-purple-200/70 text-sm">{platforms.length}个平台</p>
      </div>

      <div className="space-y-3">
        {platforms.map((platform, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-xl`}>
                {platform.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{platform.name}</h3>
                <p className="text-xs text-purple-200/60">{platform.region}</p>
              </div>
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm">→</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <CheckCircle className="w-20 h-20 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-purple-200/70 mb-8">抱歉，您访问的页面不存在</p>
        <a href="/" className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
          返回首页
        </a>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<MobileHome />} />
        <Route path="/mobile/create" element={<MobileCreator />} />
        <Route path="/mobile/guide" element={<MobilePlatformGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;