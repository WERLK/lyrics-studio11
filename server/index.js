import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'lyrics.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS lyrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_hash TEXT NOT NULL,
    style TEXT NOT NULL,
    mood TEXT NOT NULL,
    length TEXT NOT NULL,
    lyrics_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(prompt_hash, style, mood, length)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS usage_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prompt_hash TEXT NOT NULL,
    style TEXT NOT NULL,
    mood TEXT NOT NULL,
    length TEXT NOT NULL,
    count INTEGER DEFAULT 1,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(prompt_hash, style, mood, length)
  )
`);

function hashPrompt(theme: string, style: string, mood: string, length: string): string {
  const combined = `${theme.toLowerCase().trim()}|${style}|${mood}|${length}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

const THEMES = {
  love: ['心跳', '思念', '拥抱', '相守', '离别', '承诺'],
  dream: ['追逐', '远方', '希望', '坚持', '突破', '飞翔'],
  life: ['时光', '成长', '回忆', '选择', '勇气', '感悟'],
  nature: ['星空', '大海', '山川', '春风', '落叶', '月光'],
  custom: [],
};

const PHRASES = {
  pop: {
    happy: [
      ['阳光洒在街道上', '你的笑容像彩虹', '快乐就在这一刻'],
      ['跟着节奏摇摆', '心跳和音乐同步', '世界都在旋转'],
      ['每一天都是新的开始', '快乐没有终点', '幸福就在身边'],
      ['笑容是最好的语言', '阳光温暖心间', '快乐无限蔓延'],
    ],
    sad: [
      ['窗外的雨滴落下', '回忆像潮水涌来', '心还在等待'],
      ['一个人的夜晚', '思念无法停止', '泪水模糊视线'],
      ['寂静的房间', '只剩下寂寞', '心在风中摇曳'],
      ['过去的时光', '像梦境一场', '醒来只剩遗憾'],
    ],
    passionate: [
      ['燃烧的青春', '不羁的灵魂', '永不停歇'],
      ['追逐梦想的路上', '热血在沸腾', '永不放弃'],
      ['激情燃烧', '生命在跳跃', '梦想在燃烧'],
      ['热血沸腾', '心跳加速', '梦想就在前方'],
    ],
    gentle: [
      ['微风轻轻吹过', '你的温柔', '温暖心窝'],
      ['月光下的低语', '甜蜜的呼吸', '浪漫时刻'],
      ['温柔的风', '轻轻拂过', '心在慢慢融化'],
      ['你的温柔', '像春风拂过', '我的世界充满阳光'],
    ],
    inspirational: [
      ['相信自己', '奇迹就在前方', '勇敢前行'],
      ['不惧风雨', '展翅高飞', '创造未来'],
      ['只要有梦想', '就有希望', '永远向前'],
      ['勇敢的心', '永不言败', '追逐梦想'],
    ],
    nostalgic: [
      ['那年夏天', '操场上的风', '纯真的梦'],
      ['泛黄的照片', '尘封的记忆', '美好的曾经'],
      ['时光流转', '岁月如歌', '回忆永存'],
      ['曾经的你我', '美好的时光', '永远在心中'],
    ],
  },
  rock: {
    happy: [
      ['嘶吼的青春', '摇滚的力量', '疯狂的心跳'],
      ['电吉他的旋律', '燃烧的激情', '无尽的能量'],
      ['摇滚不死', '青春永恒', '激情燃烧'],
      ['疯狂的节奏', '释放自己', '尽情摇摆'],
    ],
    sad: [
      ['破碎的梦想', '孤独的嘶吼', '无尽的黑暗'],
      ['摇滚的呐喊', '心碎的回声', '痛苦的挣扎'],
      ['黑暗中前行', '独自一人', '心碎的声音'],
      ['破碎的心灵', '孤独的摇滚', '无尽的悲伤'],
    ],
    passionate: [
      ['不羁的灵魂', '燃烧的火焰', '永不言败'],
      ['狂野的心跳', '嘶吼的自由', '震撼天地'],
      ['摇滚的精神', '永不言败', '燃烧的火焰'],
      ['释放自己', '摇滚的力量', '震撼全场'],
    ],
    gentle: [
      ['安静的角落', '温柔的旋律', '内心的独白'],
      ['摇滚也柔情', '细腻的情感', '别样的温柔'],
      ['柔情摇滚', '心灵的旋律', '温柔的力量'],
      ['温柔的摇滚', '内心的声音', '别样的温情'],
    ],
    inspirational: [
      ['站起来', '不要放弃', '冲破黑暗'],
      ['摇滚的力量', '激励人心', '永不止步'],
      ['摇滚的精神', '激励你我', '永远向前'],
      ['冲破一切', '摇滚的力量', '改变世界'],
    ],
    nostalgic: [
      ['曾经的疯狂', '摇滚的岁月', '永恒的记忆'],
      ['热血的青春', '不灭的火焰', '经典永存'],
      ['摇滚的黄金时代', '永远的经典', '永恒的记忆'],
      ['曾经的摇滚', '永远的记忆', '永恒的经典'],
    ],
  },
  folk: {
    happy: [
      ['田野的麦浪', '乡间的小路', '简单的快乐'],
      ['鸟儿的歌声', '清澈的溪水', '纯真的笑容'],
      ['大自然的美', '简单的快乐', '纯真的笑容'],
      ['乡村的宁静', '简单的幸福', '纯真的快乐'],
    ],
    sad: [
      ['远方的故乡', '回不去的时光', '淡淡的忧伤'],
      ['落叶的秋天', '孤独的背影', '无声的思念'],
      ['乡愁的味道', '远方的故乡', '无尽的思念'],
      ['异乡的夜晚', '思念故乡', '淡淡的忧伤'],
    ],
    passionate: [
      ['奔腾的河流', '不息的脚步', '执着的远方'],
      ['燃烧的热血', '不屈的意志', '坚定的信念'],
      ['对梦想的执着', '永不放弃', '永远向前'],
      ['执着的追求', '不屈的精神', '永远向前'],
    ],
    gentle: [
      ['温柔的晚风', '萤火虫的光', '宁静的夜'],
      ['溪水潺潺流', '花香满径', '岁月静好'],
      ['宁静的夜晚', '温柔的风', '岁月静好'],
      ['月光如水', '温柔的夜', '宁静的美'],
    ],
    inspirational: [
      ['山高路远', '初心不改', '继续前行'],
      ['风雨兼程', '不言放弃', '终达彼岸'],
      ['路在脚下', '梦想在前方', '继续前行'],
      ['永远向前', '不言放弃', '终达彼岸'],
    ],
    nostalgic: [
      ['童年的小河', '外婆的歌谣', '温暖的回忆'],
      ['老屋的炊烟', '母亲的呼唤', '深深的眷恋'],
      ['童年的记忆', '永恒的温暖', '永远的眷恋'],
      ['曾经的时光', '美好的回忆', '永远的眷恋'],
    ],
  },
  rap: {
    happy: [
      ['Yo 跟着节奏', '快乐不停', '派对时间'],
      ['说唱的力量', '无限可能', '燥起来'],
      ['Yo 快乐至上', '跟着节奏', '一起摇摆'],
      ['Yo 派对时刻', '快乐不停', '燥起来'],
    ],
    sad: [
      ['Yo 往事如烟', '心碎的声音', '说唱里的伤'],
      ['深夜独白', '街灯下的影', '无尽孤独'],
      ['Yo 内心的痛', '说唱表达', '无尽的悲伤'],
      ['Yo 孤独的夜', '说唱的痛', '心在流泪'],
    ],
    passionate: [
      ['Yo 打破规则', '我就是我', '无限可能'],
      ['说唱不死', '热血永存', '震撼全场'],
      ['Yo 我的说唱', '我的态度', '我就是我'],
      ['Yo 说唱的力量', '我的舞台', '我做主'],
    ],
    gentle: [
      ['Yo 安静时刻', '内心独白', '柔软的说唱'],
      ['月光下的flow', '温柔的节奏', '别样风情'],
      ['Yo 温柔的说唱', '内心的声音', '别样的美'],
      ['Yo 月光下的说唱', '温柔的节奏', '别样的情'],
    ],
    inspirational: [
      ['Yo 站起来', '别认输', '你就是王'],
      ['说唱的力量', '激励灵魂', '永不言弃'],
      ['Yo 永不言败', '你就是王', '站起来'],
      ['Yo 说唱的力量', '激励你我', '永不言弃'],
    ],
    nostalgic: [
      ['Yo 回到过去', '那段时光', '永远铭记'],
      ['街头的声音', '青春的记忆', '说唱的故事'],
      ['Yo 曾经的说唱', '青春的记忆', '永远的经典'],
      ['Yo 回到过去', '青春的记忆', '永远的故事'],
    ],
  },
  electronic: {
    happy: [
      ['霓虹灯闪烁', '节奏在跳动', '未来已来'],
      ['数字的世界', '无限连接', '快乐无限'],
      ['电子的节奏', '快乐的节拍', '未来已来'],
      ['霓虹闪烁', '节奏跳动', '快乐无限'],
    ],
    sad: [
      ['数据的海洋', '虚拟的孤独', '真实的空虚'],
      ['屏幕的光芒', '无声的夜晚', '消散的梦'],
      ['虚拟的世界', '真实的孤独', '无尽的空虚'],
      ['数字的海洋', '孤独的我', '真实的空虚'],
    ],
    passionate: [
      ['电流穿过', '心跳加速', '无限能量'],
      ['电子脉冲', '灵魂燃烧', '超越极限'],
      ['电子的力量', '心跳加速', '超越极限'],
      ['电流穿过', '灵魂燃烧', '无限能量'],
    ],
    gentle: [
      ['柔和的合成器', '梦幻的旋律', '温柔的电子'],
      ['星空下的音', '静谧的节拍', '温柔的夜'],
      ['温柔的电子', '梦幻的旋律', '星空下的夜'],
      ['柔和的合成器', '静谧的节拍', '温柔的夜'],
    ],
    inspirational: [
      ['科技的力量', '连接未来', '无限可能'],
      ['电子的心跳', '永不停息', '创造奇迹'],
      ['科技的力量', '创造未来', '无限可能'],
      ['电子的心跳', '永不停息', '创造奇迹'],
    ],
    nostalgic: [
      ['复古的合成器', '80年代的梦', '永恒的电音'],
      ['迪斯科球', '霓虹灯光', '复古的未来'],
      ['复古的电子', '80年代的梦', '永恒的经典'],
      ['迪斯科时代', '复古的未来', '永恒的电音'],
    ],
  },
  ancient: {
    happy: [
      ['桃花源里', '春风得意', '诗意盎然'],
      ['山水之间', '琴瑟和鸣', '其乐融融'],
      ['春风得意', '山水之间', '诗意盎然'],
      ['桃花源里', '其乐融融', '诗意盎然'],
    ],
    sad: [
      ['独倚栏杆', '望断天涯', '离愁别绪'],
      ['落花流水', '春去秋来', '无尽的思念'],
      ['望断天涯', '离愁别绪', '无尽的思念'],
      ['独倚栏杆', '落花流水', '无尽的悲伤'],
    ],
    passionate: [
      ['长剑出鞘', '豪情万丈', '壮志凌云'],
      ['大漠孤烟', '铁马冰河', '热血男儿'],
      ['壮志凌云', '豪情万丈', '热血男儿'],
      ['长剑出鞘', '大漠孤烟', '壮志凌云'],
    ],
    gentle: [
      ['月下独酌', '清风徐来', '悠然自得'],
      ['烟雨江南', '小桥流水', '婉约柔情'],
      ['清风徐来', '悠然自得', '婉约柔情'],
      ['月下独酌', '烟雨江南', '悠然自得'],
    ],
    inspirational: [
      ['破釜沉舟', '百二秦关', '壮志凌云'],
      ['长风破浪', '直挂云帆', '沧海桑田'],
      ['壮志凌云', '长风破浪', '直挂云帆'],
      ['破釜沉舟', '壮志凌云', '沧海桑田'],
    ],
    nostalgic: [
      ['故国神游', '多少往事', '都付笑谈'],
      ['蓦然回首', '灯火阑珊', '物是人非'],
      ['故国神游', '蓦然回首', '物是人非'],
      ['多少往事', '都付笑谈', '物是人非'],
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

function getLineCount(length: string): number {
  switch (length) {
    case 'short':
      return 16;
    case 'medium':
      return 32;
    case 'long':
      return 48;
    default:
      return 32;
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

function generateLyricsInternal(theme: string, style: string, mood: string, length: string, attempt: number = 0): string {
  const lineCount = getLineCount(length);
  const structure = getStructure(lineCount);
  const phrases = (PHRASES as any)[style]?.[mood];

  if (!phrases) {
    throw new Error('Invalid style or mood');
  }

  const lyrics: string[] = [];
  let lineCounter = 0;

  const shuffledPhrases = shuffleArray(phrases);
  const startOffset = (attempt * 2) % shuffledPhrases.length;

  structure.forEach((section, sectionIndex) => {
    if (sectionIndex > 0 && section.type !== 'bridge') {
      const prefix = getSectionPrefix(section.type, Math.floor(sectionIndex / 2));
      lyrics.push(`【${prefix}】`);
      lineCounter++;
    } else if (section.type === 'bridge') {
      lyrics.push('【桥段】');
      lineCounter++;
    }

    for (let i = 0; i < section.lines && lineCounter < lineCount; i++) {
      const phraseIndex = (startOffset + i + attempt * 3) % shuffledPhrases.length;
      const phraseSet = shuffledPhrases[phraseIndex];
      const line = phraseSet[(i + attempt) % phraseSet.length];

      if (style === 'rap') {
        const rapEndings = ['，Yo', '，Yeah', '，Check it', '，Uh', ''];
        const ending = rapEndings[(i + attempt) % rapEndings.length];
        lyrics.push(line + ending);
      } else if (style === 'ancient') {
        const endings = ['兮', '也', '乎', '哉', '矣', '耳', ''];
        const ending = endings[(i + attempt) % endings.length];
        lyrics.push(line + ending);
      } else {
        const punctuation = ['~', '...', '！', '...', '', '。', '！', '~'];
        const punct = punctuation[(i + attempt) % punctuation.length];
        lyrics.push(line + punct);
      }
      lineCounter++;
    }
  });

  while (lyrics.length < lineCount) {
    const phraseSet = pickRandom(shuffledPhrases);
    const line = pickRandom(phraseSet);
    lyrics.push(line);
  }

  return lyrics.join('\n');
}

app.post('/api/generate', (req, res) => {
  try {
    const { theme, style, mood, length } = req.body;

    if (!theme || !style || !mood || !length) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const promptHash = hashPrompt(theme, style, mood, length);

    const checkStmt = db.prepare('SELECT lyrics_text, created_at FROM lyrics WHERE prompt_hash = ? AND style = ? AND mood = ? AND length = ? ORDER BY created_at DESC');
    const existing = checkStmt.all(promptHash, style, mood, length);

    const recentSet = new Set<string>();
    const recentLyrics = existing.slice(0, 5);
    recentLyrics.forEach(row => recentSet.add(row.lyrics_text));

    let lyrics = '';
    let attempt = 0;
    const maxAttempts = 10;

    while (attempt < maxAttempts) {
      const candidate = generateLyricsInternal(theme, style, mood, length, attempt);
      if (!recentSet.has(candidate)) {
        lyrics = candidate;
        break;
      }
      attempt++;
    }

    if (!lyrics) {
      lyrics = generateLyricsInternal(theme, style, mood, length, Date.now() % 1000);
    }

    try {
      const insertStmt = db.prepare('INSERT OR IGNORE INTO lyrics (prompt_hash, style, mood, length, lyrics_text) VALUES (?, ?, ?, ?, ?)');
      insertStmt.run(promptHash, style, mood, length, lyrics);
    } catch (insertErr) {
      console.error('Insert error:', insertErr);
    }

    try {
      const upsertStmt = db.prepare(`
        INSERT INTO usage_stats (prompt_hash, style, mood, length, count) 
        VALUES (?, ?, ?, ?, 1) 
        ON CONFLICT(prompt_hash, style, mood, length) 
        DO UPDATE SET count = count + 1, last_used = CURRENT_TIMESTAMP
      `);
      upsertStmt.run(promptHash, style, mood, length);
    } catch (upsertErr) {
      console.error('Upsert error:', upsertErr);
    }

    res.json({
      success: true,
      lyrics,
      isNew: !recentLyrics.some(row => row.lyrics_text === lyrics),
      totalVariations: existing.length + 1,
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ error: 'Failed to generate lyrics' });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM lyrics');
    const statsStmt = db.prepare('SELECT prompt_hash, style, mood, length, count FROM usage_stats ORDER BY count DESC LIMIT 20');

    const total = totalStmt.get() as any;
    const popular = statsStmt.all() as any[];

    res.json({
      totalLyrics: total?.count || 0,
      popularQueries: popular,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lyrics Studio API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Lyrics Studio API server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${dbPath}`);
});
