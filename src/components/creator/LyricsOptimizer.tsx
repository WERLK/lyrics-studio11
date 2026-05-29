import { useState } from 'react';
import { Wand2, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { optimizeLyrics, getOptimizationTypes } from '../../services/lyricsOptimizer';
import { LyricsStyle, LyricsMood } from '../../types';
import Button from '../ui/Button';

interface LyricsOptimizerProps {
  lyrics: string;
  style: LyricsStyle;
  mood: LyricsMood;
  onOptimized: (optimizedLyrics: string) => void;
}

export default function LyricsOptimizer({ lyrics, style, mood, onOptimized }: LyricsOptimizerProps) {
  const [optimizing, setOptimizing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('polish');
  const [optimizationHistory, setOptimizationHistory] = useState<Array<{type: string; result: string}>>([]);

  const optimizationTypes = getOptimizationTypes();

  const handleOptimize = async () => {
    if (!lyrics) return;

    setOptimizing(true);
    try {
      const optimized = await optimizeLyrics(lyrics, {
        type: selectedType as any,
        style,
        mood,
      });

      const typeLabel = optimizationTypes.find(t => t.value === selectedType)?.label || selectedType;
      setOptimizationHistory(prev => [...prev, { type: typeLabel, result: optimized }]);
      onOptimized(optimized);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI 歌词优化</h3>
          <p className="text-sm text-purple-200/60">智能优化你的歌词，提升作品质量</p>
        </div>
      </div>

      <div className="space-y-3">
        {optimizationTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selectedType === type.value
                ? 'bg-blue-500/20 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                {type.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{type.label}</h4>
                <p className="text-sm text-purple-200/60">{type.description}</p>
              </div>
              {selectedType === type.value && (
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      <Button 
        onClick={handleOptimize} 
        isLoading={optimizing}
        disabled={!lyrics || optimizing}
        className="w-full"
      >
        {optimizing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            优化中...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            开始优化
          </>
        )}
      </Button>

      {optimizationHistory.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-purple-200/80">优化历史</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {optimizationHistory.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">{item.type}</span>
                </div>
                <p className="text-xs text-purple-200/60 line-clamp-2">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-200/70">
            <p className="font-medium text-blue-400 mb-1">优化提示</p>
            <ul className="space-y-1 text-xs">
              <li>• 润色优化：适合调整语气，使歌词更自然</li>
              <li>• 精简提炼：适合去除冗余，突出重点</li>
              <li>• 意境增强：适合加入比喻，提升意境</li>
              <li>• 押韵优化：适合调整韵脚，朗朗上口</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
