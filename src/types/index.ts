export type LyricsStyle = 'pop' | 'rock' | 'folk' | 'rap' | 'electronic' | 'ancient';
export type LyricsMood = 'happy' | 'sad' | 'passionate' | 'gentle' | 'inspirational' | 'nostalgic';
export type LyricsLength = 'short' | 'medium' | 'long';

export interface GenerateParams {
  theme: string;
  style: LyricsStyle;
  mood: LyricsMood;
  length: LyricsLength;
}

export interface LyricsItem {
  id: string;
  theme: string;
  style: LyricsStyle;
  mood: LyricsMood;
  length: LyricsLength;
  content: string;
  createdAt: number;
  isFavorite: boolean;
}

export const STYLE_LABELS: Record<LyricsStyle, string> = {
  pop: '流行',
  rock: '摇滚',
  folk: '民谣',
  rap: '说唱',
  electronic: '电子',
  ancient: '古风',
};

export const MOOD_LABELS: Record<LyricsMood, string> = {
  happy: '欢快',
  sad: '忧伤',
  passionate: '激昂',
  gentle: '温柔',
  inspirational: '励志',
  nostalgic: '怀旧',
};

export const LENGTH_LABELS: Record<LyricsLength, string> = {
  short: '短篇 (16句)',
  medium: '中篇 (32句)',
  long: '长篇 (48句)',
};
