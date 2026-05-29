import { useState } from 'react';
import {
  Download,
  FileText,
  Music,
  Share2,
  Check,
  X,
  Copy,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  MessageSquare,
  FileJson,
  FileAudio,
} from 'lucide-react';
import Button from '../ui/Button';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lyrics: string;
  theme: string;
}

export default function ExportModal({ isOpen, onClose, lyrics, theme }: ExportModalProps) {
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'txt' | 'lrc' | 'json' | 'pdf'>('txt');

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!lyrics) return;
    try {
      await navigator.clipboard.writeText(lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExport = async (format: 'txt' | 'lrc' | 'json') => {
    setExporting(true);
    try {
      let content = '';
      let filename = '';
      let type = '';

      switch (format) {
        case 'txt':
          content = lyrics;
          filename = `${theme || 'lyrics'}.txt`;
          type = 'text/plain';
          break;
        case 'lrc':
          content = generateLRC(lyrics);
          filename = `${theme || 'lyrics'}.lrc`;
          type = 'text/plain';
          break;
        case 'json':
          content = JSON.stringify(
            {
              theme,
              lyrics,
              created: new Date().toISOString(),
              lines: lyrics.split('\n').filter((l) => l.trim()),
            },
            null,
            2
          );
          filename = `${theme || 'lyrics'}.json`;
          type = 'application/json';
          break;
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export:', err);
    } finally {
      setExporting(false);
    }
  };

  const generateLRC = (text: string) => {
    const lines = text.split('\n').filter((l) => l.trim());
    return lines
      .map((line, index) => {
        const minutes = Math.floor(index / 60);
        const seconds = index % 60;
        return `[${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.00]${line}`;
      })
      .join('\n');
  };

  const sharePlatforms = [
    { name: '复制链接', icon: Copy, action: handleCopy, color: 'text-purple-400' },
    { name: '分享到微信', icon: MessageSquare, color: 'text-green-500' },
    { name: '分享到微博', icon: Twitter, color: 'text-red-500' },
    { name: '邮件分享', icon: Mail, color: 'text-blue-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white">导出与分享</h3>
            <p className="text-purple-200/60 text-sm mt-1">将你的歌词保存到本地或分享给他人</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Options */}
          <div>
            <h4 className="text-sm font-semibold text-purple-200/80 mb-4 flex items-center gap-2">
              <Download className="w-4 h-4" />
              导出格式
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleExport('txt')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-white">TXT</span>
                <span className="text-xs text-purple-200/50">文本文件</span>
              </button>

              <button
                onClick={() => handleExport('lrc')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                  <FileAudio className="w-6 h-6 text-pink-400" />
                </div>
                <span className="text-sm font-medium text-white">LRC</span>
                <span className="text-xs text-purple-200/50">歌词字幕</span>
              </button>

              <button
                onClick={() => handleExport('json')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <FileJson className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-white">JSON</span>
                <span className="text-xs text-purple-200/50">数据格式</span>
              </button>

              <button
                onClick={() => handleExport('txt')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Music className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-sm font-medium text-white">PDF</span>
                <span className="text-xs text-purple-200/50">打印格式</span>
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div>
            <h4 className="text-sm font-semibold text-purple-200/80 mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              分享到
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sharePlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={platform.action}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors ${platform.color}`}
                  >
                    <platform.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-white">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h4 className="text-sm font-semibold text-purple-200/80 mb-3">歌词预览</h4>
            <div className="max-h-40 overflow-y-auto p-4 rounded-xl bg-white/5 border border-white/10">
              <pre className="text-sm text-purple-200/80 whitespace-pre-wrap font-mono">
                {lyrics}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <Button variant="secondary" onClick={onClose}>
            关闭
          </Button>
          <Button onClick={() => handleExport('txt')} isLoading={exporting}>
            {exporting ? '导出中...' : '导出 TXT'}
          </Button>
        </div>
      </div>
    </div>
  );
}
