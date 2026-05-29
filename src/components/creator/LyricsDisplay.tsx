import { useEffect, useState } from 'react';
import { useLyricsStore } from '../../store/useLyricsStore';
import { Copy, RefreshCw, Heart, Download, Share2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ExportModal from './ExportModal';

export default function LyricsDisplay() {
  const { currentLyrics, editingLyrics, isGenerating, setEditingLyrics, clearLyrics, saveToHistory, currentParams } =
    useLyricsStore();
  const [copied, setCopied] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    setEditingLyrics(currentLyrics);
  }, [currentLyrics, setEditingLyrics]);

  const handleCopy = async () => {
    if (!editingLyrics) return;
    try {
      await navigator.clipboard.writeText(editingLyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSave = () => {
    saveToHistory();
  };

  if (!currentLyrics && !isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-purple-400/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-purple-200/50 mb-4">在左侧输入主题，开始创作你的歌词</p>
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            查看音乐平台上传指南
          </Link>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-purple-300 animate-pulse">正在为你创作歌词...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <textarea
        value={editingLyrics}
        onChange={(e) => setEditingLyrics(e.target.value)}
        className="w-full h-96 px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 resize-none font-mono text-sm leading-relaxed"
        placeholder="在这里编辑你的歌词..."
      />

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          {copied ? '已复制' : '复制'}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setExportModalOpen(true)}>
          <Download className="w-4 h-4 mr-2" />
          导出/分享
        </Button>
        <Button variant="secondary" size="sm" onClick={clearLyrics}>
          <RefreshCw className="w-4 h-4 mr-2" />
          清空
        </Button>
        <Button variant="primary" size="sm" onClick={handleSave}>
          <Heart className="w-4 h-4 mr-2" />
          保存
        </Button>
      </div>

      <div className="pt-2">
        <Link
          to="/guide"
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          如何发布到音乐平台？
        </Link>
      </div>

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        lyrics={editingLyrics}
        theme={currentParams.theme}
      />
    </div>
  );
}
