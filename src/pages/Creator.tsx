import { useEffect, useState } from 'react';
import { History, Wand2, Image, Edit3 } from 'lucide-react';
import { useLyricsStore } from '../store/useLyricsStore';
import ParameterPanel from '../components/creator/ParameterPanel';
import LyricsDisplay from '../components/creator/LyricsDisplay';
import HistoryDrawer from '../components/creator/HistoryDrawer';
import CoverGenerator from '../components/creator/CoverGenerator';
import LyricsOptimizer from '../components/creator/LyricsOptimizer';
import Button from '../components/ui/Button';

type TabType = 'editor' | 'cover' | 'optimize';

export default function Creator() {
  const { setHistoryVisible, loadHistory, editingLyrics, setEditingLyrics, currentParams } = useLyricsStore();
  const [activeTab, setActiveTab] = useState<TabType>('editor');

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const tabs = [
    { id: 'editor' as TabType, label: '歌词编辑', icon: Edit3 },
    { id: 'cover' as TabType, label: '封面生成', icon: Image },
    { id: 'optimize' as TabType, label: 'AI 优化', icon: Wand2 },
  ];

  const handleOptimized = (optimized: string) => {
    setEditingLyrics(optimized);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">歌词创作</h1>
            <p className="text-sm sm:text-base text-purple-200/60">选择风格和情绪，让AI为你创作独特的歌词</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setHistoryVisible(true)}>
            <History className="w-4 h-4 mr-2" />
            历史记录
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl mb-4 sm:mb-6">
          <div className="flex flex-wrap border-b border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] sm:min-w-[120px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 transition-all text-sm sm:text-base`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-purple-400' : 'text-purple-200/60'}`} />
                  <span className={`font-medium ${isActive ? 'text-purple-400' : 'text-purple-200/60'}`}>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'editor' && (
              <div className="space-y-4 sm:space-y-6">
                <ParameterPanel />
              </div>
            )}
            
            {activeTab === 'cover' && (
              <CoverGenerator
                theme={currentParams.theme}
                style={currentParams.style}
                mood={currentParams.mood}
              />
            )}
            
            {activeTab === 'optimize' && (
              <LyricsOptimizer
                lyrics={editingLyrics}
                style={currentParams.style}
                mood={currentParams.mood}
                onOptimized={handleOptimized}
              />
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              歌词展示
            </h2>
            <LyricsDisplay />
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              创作指南
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h3 className="font-semibold text-purple-400 mb-2 text-sm">💡 创作技巧</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-purple-200/70">
                  <li>1. 先在「歌词编辑」中生成歌词</li>
                  <li>2. 使用「AI 优化」提升歌词质量</li>
                  <li>3. 用「封面生成」创建专业封面</li>
                  <li>4. 导出并发布到音乐平台</li>
                </ul>
              </div>
              
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm">🎵 推荐流程</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-purple-200/60 flex-wrap">
                  <span className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-purple-500/20 text-purple-400 text-xs">编辑</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-blue-500/20 text-blue-400 text-xs">优化</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-pink-500/20 text-pink-400 text-xs">封面</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 sm:px-2 sm:py-1 rounded bg-green-500/20 text-green-400 text-xs">导出</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HistoryDrawer />
    </div>
  );
}
