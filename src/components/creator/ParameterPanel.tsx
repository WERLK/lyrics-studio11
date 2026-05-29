import { useLyricsStore } from '../../store/useLyricsStore';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { LyricsStyle, LyricsMood, LyricsLength, STYLE_LABELS, MOOD_LABELS, LENGTH_LABELS } from '../../types';

const STYLE_OPTIONS = Object.entries(STYLE_LABELS).map(([value, label]) => ({ value, label }));
const MOOD_OPTIONS = Object.entries(MOOD_LABELS).map(([value, label]) => ({ value, label }));
const LENGTH_OPTIONS = Object.entries(LENGTH_LABELS).map(([value, label]) => ({ value, label }));

export default function ParameterPanel() {
  const {
    currentParams,
    isGenerating,
    setTheme,
    setStyle,
    setMood,
    setLength,
    generate,
  } = useLyricsStore();

  const handleGenerate = () => {
    generate();
  };

  return (
    <div className="space-y-6">
      <Input
        label="歌词主题"
        placeholder="输入你想要表达的主题，如：爱情、离别、梦想..."
        value={currentParams.theme}
        onChange={(e) => setTheme(e.target.value)}
      />

      <Select
        label="音乐风格"
        options={STYLE_OPTIONS}
        value={currentParams.style}
        onChange={(e) => setStyle(e.target.value as LyricsStyle)}
      />

      <Select
        label="歌词情绪"
        options={MOOD_OPTIONS}
        value={currentParams.mood}
        onChange={(e) => setMood(e.target.value as LyricsMood)}
      />

      <Select
        label="歌词长度"
        options={LENGTH_OPTIONS}
        value={currentParams.length}
        onChange={(e) => setLength(e.target.value as LyricsLength)}
      />

      <div className="pt-4">
        <Button
          onClick={handleGenerate}
          isLoading={isGenerating}
          disabled={!currentParams.theme.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? '生成中...' : '生成歌词'}
        </Button>
      </div>

      <div className="text-xs text-purple-300/50 text-center">
        提示：输入越详细的描述，生成效果越好
      </div>
    </div>
  );
}
