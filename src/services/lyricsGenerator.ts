import { GenerateParams, LyricsLength, LyricsMood, LyricsStyle } from '../types';

const THEMES: Record<string, string[]> = {
  love: ['心跳', '思念', '拥抱', '相守', '离别', '承诺'],
  dream: ['追逐', '远方', '希望', '坚持', '突破', '飞翔'],
  life: ['时光', '成长', '回忆', '选择', '勇气', '感悟'],
  nature: ['星空', '大海', '山川', '春风', '落叶', '月光'],
  custom: [],
};

const PHRASES: Record<LyricsStyle, Record<LyricsMood, string[][]>> = {
  pop: {
    happy: [
      ['阳光洒在街道上', '你的笑容像彩虹', '快乐就在这一刻'],
      ['跟着节奏摇摆', '心跳和音乐同步', '世界都在旋转'],
    ],
    sad: [
      ['窗外的雨滴落下', '回忆像潮水涌来', '心还在等待'],
      ['一个人的夜晚', '思念无法停止', '泪水模糊视线'],
    ],
    passionate: [
      ['燃烧的青春', '不羁的灵魂', '永不停歇'],
      ['追逐梦想的路上', '热血在沸腾', '永不放弃'],
    ],
    gentle: [
      ['微风轻轻吹过', '你的温柔', '温暖心窝'],
      ['月光下的低语', '甜蜜的呼吸', '浪漫时刻'],
    ],
    inspirational: [
      ['相信自己', '奇迹就在前方', '勇敢前行'],
      ['不惧风雨', '展翅高飞', '创造未来'],
    ],
    nostalgic: [
      ['那年夏天', '操场上的风', '纯真的梦'],
      ['泛黄的照片', '尘封的记忆', '美好的曾经'],
    ],
  },
  rock: {
    happy: [
      ['嘶吼的青春', '摇滚的力量', '疯狂的心跳'],
      ['电吉他的旋律', '燃烧的激情', '无尽的能量'],
    ],
    sad: [
      ['破碎的梦想', '孤独的嘶吼', '无尽的黑暗'],
      ['摇滚的呐喊', '心碎的回声', '痛苦的挣扎'],
    ],
    passionate: [
      ['不羁的灵魂', '燃烧的火焰', '永不言败'],
      ['狂野的心跳', '嘶吼的自由', '震撼天地'],
    ],
    gentle: [
      ['安静的角落', '温柔的旋律', '内心的独白'],
      ['摇滚也柔情', '细腻的情感', '别样的温柔'],
    ],
    inspirational: [
      ['站起来', '不要放弃', '冲破黑暗'],
      ['摇滚的力量', '激励人心', '永不止步'],
    ],
    nostalgic: [
      ['曾经的疯狂', '摇滚的岁月', '永恒的记忆'],
      ['热血的青春', '不灭的火焰', '经典永存'],
    ],
  },
  folk: {
    happy: [
      ['田野的麦浪', '乡间的小路', '简单的快乐'],
      ['鸟儿的歌声', '清澈的溪水', '纯真的笑容'],
    ],
    sad: [
      ['远方的故乡', '回不去的时光', '淡淡的忧伤'],
      ['落叶的秋天', '孤独的背影', '无声的思念'],
    ],
    passionate: [
      ['奔腾的河流', '不息的脚步', '执着的远方'],
      ['燃烧的热血', '不屈的意志', '坚定的信念'],
    ],
    gentle: [
      ['温柔的晚风', '萤火虫的光', '宁静的夜'],
      ['溪水潺潺流', '花香满径', '岁月静好'],
    ],
    inspirational: [
      ['山高路远', '初心不改', '继续前行'],
      ['风雨兼程', '不言放弃', '终达彼岸'],
    ],
    nostalgic: [
      ['童年的小河', '外婆的歌谣', '温暖的回忆'],
      ['老屋的炊烟', '母亲的呼唤', '深深的眷恋'],
    ],
  },
  rap: {
    happy: [
      ['Yo 跟着节奏', '快乐不停', '派对时间'],
      ['说唱的力量', '无限可能', '燥起来'],
    ],
    sad: [
      ['Yo 往事如烟', '心碎的声音', '说唱里的伤'],
      ['深夜独白', '街灯下的影', '无尽孤独'],
    ],
    passionate: [
      ['Yo 打破规则', '我就是我', '无限可能'],
      ['说唱不死', '热血永存', '震撼全场'],
    ],
    gentle: [
      ['Yo 安静时刻', '内心独白', '柔软的说唱'],
      ['月光下的flow', '温柔的节奏', '别样风情'],
    ],
    inspirational: [
      ['Yo 站起来', '别认输', '你就是王'],
      ['说唱的力量', '激励灵魂', '永不言弃'],
    ],
    nostalgic: [
      ['Yo 回到过去', '那段时光', '永远铭记'],
      ['街头的声音', '青春的记忆', '说唱的故事'],
    ],
  },
  electronic: {
    happy: [
      ['霓虹灯闪烁', '节奏在跳动', '未来已来'],
      ['数字的世界', '无限连接', '快乐无限'],
    ],
    sad: [
      ['数据的海洋', '虚拟的孤独', '真实的空虚'],
      ['屏幕的光芒', '无声的夜晚', '消散的梦'],
    ],
    passionate: [
      ['电流穿过', '心跳加速', '无限能量'],
      ['电子脉冲', '灵魂燃烧', '超越极限'],
    ],
    gentle: [
      ['柔和的合成器', '梦幻的旋律', '温柔的电子'],
      ['星空下的音', '静谧的节拍', '温柔的夜'],
    ],
    inspirational: [
      ['科技的力量', '连接未来', '无限可能'],
      ['电子的心跳', '永不停息', '创造奇迹'],
    ],
    nostalgic: [
      ['复古的合成器', '80年代的梦', '永恒的电音'],
      ['迪斯科球', '霓虹灯光', '复古的未来'],
    ],
  },
  ancient: {
    happy: [
      ['桃花源里', '春风得意', '诗意盎然'],
      ['山水之间', '琴瑟和鸣', '其乐融融'],
    ],
    sad: [
      ['独倚栏杆', '望断天涯', '离愁别绪'],
      ['落花流水', '春去秋来', '无尽的思念'],
    ],
    passionate: [
      ['长剑出鞘', '豪情万丈', '壮志凌云'],
      ['大漠孤烟', '铁马冰河', '热血男儿'],
    ],
    gentle: [
      ['月下独酌', '清风徐来', '悠然自得'],
      ['烟雨江南', '小桥流水', '婉约柔情'],
    ],
    inspirational: [
      ['破釜沉舟', '百二秦关', '壮志凌云'],
      ['长风破浪', '直挂云帆', '沧海桑田'],
    ],
    nostalgic: [
      ['故国神游', '多少往事', '都付笑谈'],
      ['蓦然回首', '灯火阑珊', '物是人非'],
    ],
  },
};

const STRUCTURE_TEMPLATES = [
  { type: 'verse', lines: 4 },
  { type: 'chorus', lines: 4 },
  { type: 'verse', lines: 4 },
  { type: 'chorus', lines: 4 },
  { type: 'bridge', lines: 4 },
  { type: 'chorus', lines: 4 },
];

function getLineCount(length: LyricsLength): number {
  switch (length) {
    case 'short':
      return 16;
    case 'medium':
      return 32;
    case 'long':
      return 48;
  }
}

function getStructure(lines: number) {
  const structure: { type: string; lines: number }[] = [];
  let remaining = lines;

  while (remaining > 0) {
    const template = STRUCTURE_TEMPLATES[structure.length % STRUCTURE_TEMPLATES.length];
    const count = Math.min(template.lines, remaining);
    structure.push({ type: template.type, lines: count });
    remaining -= count;
  }

  return structure;
}

function getSectionPrefix(type: string, index: number): string {
  const prefixes: Record<string, string[]> = {
    verse: ['第一段', '第二段', '第三段'],
    chorus: ['副歌', '高潮', '副歌再现'],
    bridge: ['过渡', '间奏', '转折'],
  };
  const arr = prefixes[type] || [type];
  return arr[index % arr.length];
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function generateLyrics(params: GenerateParams): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

  const lineCount = getLineCount(params.length);
  const structure = getStructure(lineCount);
  const phrases = PHRASES[params.style][params.mood];

  const lyrics: string[] = [];
  let lineCounter = 0;

  structure.forEach((section, sectionIndex) => {
    if (sectionIndex > 0 && section.type !== 'bridge') {
      const prefix = getSectionPrefix(section.type, Math.floor(sectionIndex / 2));
      lyrics.push(`【${prefix}】`);
      lineCounter++;
    } else if (section.type === 'bridge') {
      lyrics.push('【桥段】');
      lineCounter++;
    }

    const shuffledPhrases = shuffleArray(phrases);

    for (let i = 0; i < section.lines && lineCounter < lineCount; i++) {
      const phraseSet = shuffledPhrases[i % shuffledPhrases.length];
      const line = pickRandom(phraseSet);

      if (params.style === 'rap') {
        lyrics.push(line + '，Yo');
      } else if (params.style === 'ancient') {
        const endings = ['兮', '也', '乎', '哉', '矣', ''];
        const ending = endings[Math.floor(Math.random() * endings.length)];
        lyrics.push(line + ending);
      } else {
        const punctuation = ['~', '...', '！', '...', ''];
        const punct = punctuation[Math.floor(Math.random() * punctuation.length)];
        lyrics.push(line + punct);
      }
      lineCounter++;
    }
  });

  while (lyrics.length < lineCount) {
    const phraseSet = pickRandom(phrases);
    const line = pickRandom(phraseSet);
    lyrics.push(line);
  }

  return lyrics.join('\n');
}

export function detectTheme(theme: string): string {
  const lowerTheme = theme.toLowerCase();

  if (lowerTheme.includes('爱') || lowerTheme.includes('情') || lowerTheme.includes('心') || lowerTheme.includes('love')) {
    return 'love';
  }
  if (lowerTheme.includes('梦') || lowerTheme.includes('想') || lowerTheme.includes('追') || lowerTheme.includes('dream')) {
    return 'dream';
  }
  if (lowerTheme.includes('生') || lowerTheme.includes('活') || lowerTheme.includes('时光') || lowerTheme.includes('life')) {
    return 'life';
  }
  if (lowerTheme.includes('自然') || lowerTheme.includes('星空') || lowerTheme.includes('海') || lowerTheme.includes('山') || lowerTheme.includes('nature')) {
    return 'nature';
  }

  return 'custom';
}
