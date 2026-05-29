import { LyricsStyle, LyricsMood } from '../types';

interface OptimizationOptions {
  type: 'polish' | 'simplify' | 'enhance' | 'rhyme';
  style: LyricsStyle;
  mood: LyricsMood;
}

export async function optimizeLyrics(
  lyrics: string,
  options: OptimizationOptions
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

  const lines = lyrics.split('\n').filter(line => line.trim());
  
  switch (options.type) {
    case 'polish':
      return polishLyrics(lines, options);
    case 'simplify':
      return simplifyLyrics(lines, options);
    case 'enhance':
      return enhanceLyrics(lines, options);
    case 'rhyme':
      return addRhymes(lines, options);
    default:
      return lyrics;
  }
}

function polishLyrics(lines: string[], options: OptimizationOptions): string {
  const polished = lines.map(line => {
    if (line.includes('【') && line.includes('】')) {
      return line;
    }

    let polishedLine = line.trim();
    
    if (options.mood === 'gentle') {
      const softWords = ['轻轻', '温柔', '缓缓', '静静', '柔柔'];
      const insertWord = softWords[Math.floor(Math.random() * softWords.length)];
      if (!polishedLine.includes(insertWord) && Math.random() > 0.5) {
        const words = polishedLine.split(/([，。、！？])/);
        if (words.length > 2) {
          words.splice(2, 0, insertWord);
          polishedLine = words.join('');
        }
      }
    }
    
    if (options.mood === 'passionate' && !polishedLine.includes('！')) {
      if (Math.random() > 0.7) {
        polishedLine += '！';
      }
    }

    return polishedLine;
  });

  return polished.join('\n');
}

function simplifyLyrics(lines: string[], options: OptimizationOptions): string {
  const simplified = lines.map(line => {
    if (line.includes('【') && line.includes('】')) {
      return line;
    }

    let simplifiedLine = line.trim();
    
    const phrasesToRemove = ['~~', '...', '~'];
    phrasesToRemove.forEach(phrase => {
      if (simplifiedLine.includes(phrase)) {
        simplifiedLine = simplifiedLine.replace(phrase, '');
      }
    });

    simplifiedLine = simplifiedLine.replace(/[，。、！]+$/, '');
    if (!simplifiedLine.endsWith('。') && !simplifiedLine.endsWith('！') && !simplifiedLine.endsWith('？')) {
      simplifiedLine += '。';
    }

    return simplifiedLine;
  });

  return simplified.join('\n');
}

function enhanceLyrics(lines: string[], options: OptimizationOptions): string {
  const enhanced = lines.map((line, index) => {
    if (line.includes('【') && line.includes('】')) {
      return line;
    }

    let enhancedLine = line.trim();
    
    const metaphor = getRandomMetaphor(options.mood);
    if (!enhancedLine.includes(metaphor) && Math.random() > 0.6) {
      const insertPosition = Math.floor(enhancedLine.length / 2);
      const char = enhancedLine[insertPosition];
      if (char && /[，。、]/.test(char)) {
        enhancedLine = enhancedLine.slice(0, insertPosition + 1) + metaphor + enhancedLine.slice(insertPosition + 1);
      }
    }

    if (index === 0 && !enhancedLine.includes('~')) {
      enhancedLine = '~ ' + enhancedLine + ' ~';
    }

    return enhancedLine;
  });

  return enhanced.join('\n');
}

function addRhymes(lines: string[], options: OptimizationOptions): string {
  const rhymed = lines.map((line) => {
    if (line.includes('【') && line.includes('】')) {
      return line;
    }

    let rhymedLine = line.trim();
    const lastChar = rhymedLine[rhymedLine.length - 1];
    
    if (['。', '！', '？', '，', '、'].includes(lastChar)) {
      const rhymeChar = findRhymeChar(lastChar);
      if (rhymeChar) {
        rhymedLine = rhymedLine.slice(0, -1) + rhymeChar + lastChar;
      }
    }

    return rhymedLine;
  });

  return rhymed.join('\n');
}

function getRandomMetaphor(mood: LyricsMood): string {
  const metaphors = {
    happy: ['阳光', '彩虹', '微笑', '旋律'],
    sad: ['雨滴', '影子', '迷雾', '落叶'],
    passionate: ['火焰', '雷鸣', '闪电', '狂潮'],
    gentle: ['微风', '月光', '轻纱', '花瓣'],
    inspirational: ['星辰', '高峰', '长风', '破浪'],
    nostalgic: ['旧时光', '老照片', '童年的风', '泛黄的记忆'],
  };

  const moodMetaphors = metaphors[mood] || metaphors.gentle;
  return moodMetaphors[Math.floor(Math.random() * moodMetaphors.length)];
}

function findRhymeChar(char: string): string | null {
  const rhymeGroups: Record<string, string[]> = {
    '啊': ['呀', '哇', '呐', '吧'],
    '呀': ['啊', '哇', '呐', '吧'],
    '来': ['爱', '在', '海', '白'],
    '海': ['爱', '在', '来', '白'],
    '心': ['深', '真', '人', '门'],
    '声': ['生', '星', '城', '情'],
    '中': ['风', '空', '龙', '梦'],
    '生': ['声', '星', '城', '情'],
  };

  const group = rhymeGroups[char];
  if (group) {
    return group[Math.floor(Math.random() * group.length)];
  }

  return null;
}

export function getOptimizationTypes() {
  return [
    {
      value: 'polish',
      label: '润色优化',
      description: '调整语气和用词，让歌词更加流畅自然',
      icon: '✨',
    },
    {
      value: 'simplify',
      label: '精简提炼',
      description: '去除多余符号，简化表达，突出核心内容',
      icon: '📝',
    },
    {
      value: 'enhance',
      label: '意境增强',
      description: '加入比喻和意象，提升歌词的意境和感染力',
      icon: '🎨',
    },
    {
      value: 'rhyme',
      label: '押韵优化',
      description: '调整韵脚，让歌词更加朗朗上口',
      icon: '🎵',
    },
  ];
}
