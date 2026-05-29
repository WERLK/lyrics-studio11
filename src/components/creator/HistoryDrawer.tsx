import { useEffect, useState } from 'react';
import { useLyricsStore } from '../../store/useLyricsStore';
import { HISTORY_KEY } from '../../store/useLyricsStore';
import { X, Clock, Heart, Trash2, Music2 } from 'lucide-react';
import { STYLE_LABELS, MOOD_LABELS, LyricsItem } from '../../types';

export default function HistoryDrawer() {
  const { historyVisible, setHistoryVisible, history, loadFromHistory, deleteFromHistory, toggleFavorite } =
    useLyricsStore();
  const [localHistory, setLocalHistory] = useState<LyricsItem[]>([]);

  useEffect(() => {
    if (historyVisible) {
      try {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
          setLocalHistory(JSON.parse(saved));
        } else {
          setLocalHistory(history);
        }
      } catch {
        setLocalHistory(history);
      }
    }
  }, [historyVisible, history]);

  const handleLoad = (item: LyricsItem) => {
    loadFromHistory(item);
    setHistoryVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setLocalHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setLocalHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  if (!historyVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setHistoryVisible(false)}
      />

      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/10 z-50 animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            历史记录
          </h3>
          <button
            onClick={() => setHistoryVisible(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-purple-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)] p-4 space-y-4">
          {localHistory.length === 0 ? (
            <div className="text-center py-12">
              <Music2 className="w-12 h-12 mx-auto mb-4 text-purple-400/50" />
              <p className="text-purple-200/50">暂无历史记录</p>
            </div>
          ) : (
            localHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
                onClick={() => handleLoad(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {item.theme}
                    </p>
                    <p className="text-xs text-purple-300/60 mt-1">
                      {STYLE_LABELS[item.style]} · {MOOD_LABELS[item.mood]}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(item.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        item.isFavorite
                          ? 'text-pink-400 hover:text-pink-300'
                          : 'text-purple-400/50 hover:text-pink-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-2 rounded-lg text-purple-400/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-purple-200/60 line-clamp-3 whitespace-pre-wrap">
                  {item.content}
                </p>
                <p className="text-xs text-purple-300/40 mt-2">
                  {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
