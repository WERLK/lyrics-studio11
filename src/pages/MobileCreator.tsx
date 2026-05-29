import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Music2, Copy, Download, CheckCircle, Feather, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

export default function MobileCreator() {
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
${genre || '让音乐'}永不停止

[主歌2]
${mood || '城市'}的灯光闪烁
${genre || '我们'}的故事还在继续
${mood || '每一'}个节拍
都是生命的律动

[副歌]
${mood || '跟着'}音乐舞动
${genre || '让旋律'}穿透灵魂
${mood || '这一刻'}属于你我
${genre || '让音乐'}永不停止

[桥段]
${mood || '时光'}流逝
${genre || '但音乐'}永恒
${mood || '我们'}的歌声
${genre || '永远'}年轻`;

    setLyrics(generatedLyrics);
    setIsGenerating(false);
  };

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyrics);
    alert('歌词已复制！');
  };

  const downloadLyrics = () => {
    const blob = new Blob([lyrics], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '我的歌词.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-8 pb-16">
      <div className="px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/mobile"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                歌词创作
              </h1>
              <p className="text-purple-200/70 text-sm">
                手机版创作
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        {!lyrics ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-purple-200/70 mb-2">
                心情/主题
              </label>
              <input
                type="text"
                placeholder="例如：快乐、悲伤、励志、爱情..."
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-purple-200/70 mb-2">
                音乐风格
              </label>
              <input
                type="text"
                placeholder="例如：流行、摇滚、说唱、民谣..."
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <Button
              onClick={generateLyrics}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 animate-pulse" />
                  创作中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  生成歌词
                </span>
              )}
            </Button>

            {/* Quick Presets */}
            <div className="pt-4">
              <label className="block text-sm text-purple-200/70 mb-3">
                快速选择
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { mood: '快乐', genre: '流行' },
                  { mood: '悲伤', genre: '民谣' },
                  { mood: '励志', genre: '摇滚' },
                  { mood: '爱情', genre: 'R&B' },
                ].map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMood(preset.mood);
                      setGenre(preset.genre);
                    }}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-purple-200/70 hover:bg-white/10 transition-colors"
                  >
                    {preset.mood} + {preset.genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Lyrics Display */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Feather className="w-4 h-4 text-purple-400" />
                <h3 className="text-white font-medium">你的歌词</h3>
              </div>
              <pre className="text-purple-200/80 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {lyrics}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={copyLyrics}
                variant="secondary"
                className="py-3"
              >
                <Copy className="w-4 h-4 mr-2" />
                复制
              </Button>
              <Button
                onClick={downloadLyrics}
                variant="secondary"
                className="py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
            </div>

            <Button
              onClick={() => {
                setLyrics('');
                setMood('');
                setGenre('');
              }}
              variant="ghost"
              className="w-full py-3 border border-white/10"
            >
              再创作一首
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
