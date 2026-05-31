export interface MVProject {
  id: string;
  title: string;
  lyricsId?: string;
  lyrics?: string;
  style: 'cinematic' | 'lyric' | 'animation' | 'live' | 'abstract';
  duration: number;
  resolution: '720p' | '1080p' | '4k';
  audioUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  status: 'draft' | 'generating' | 'completed' | 'failed';
  createdAt: number;
  updatedAt: number;
  publishedPlatforms: string[];
}

export interface VideoPlatform {
  id: string;
  name: string;
  region: 'china' | 'international' | 'asia' | 'global';
  type: 'video' | 'music' | 'social' | 'streaming';
  url: string;
  icon: string;
  color: string;
  accessibleInChina: boolean;
  accessMethod?: string;
  description: string;
  features: string[];
  popularity: number;
  monetization: boolean;
  contentGuidelines: string[];
}

export const videoPlatforms: VideoPlatform[] = [
  // 中国国内可直接访问
  {
    id: 'youtube',
    name: 'YouTube',
    region: 'international',
    type: 'video',
    url: 'https://www.youtube.com',
    icon: '▶️',
    color: 'from-red-500 to-orange-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: '全球最大的视频平台，可上传音乐MV',
    features: ['全球覆盖', ' monetization', '直播', 'Shorts短视频'],
    popularity: 100,
    monetization: true,
    contentGuidelines: ['遵守社区准则', '原创内容', '版权合规']
  },
  {
    id: 'youtube-music',
    name: 'YouTube Music',
    region: 'international',
    type: 'music',
    url: 'https://music.youtube.com',
    icon: '🎵',
    color: 'from-red-500 to-pink-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: 'Google音乐平台，适合音乐视频',
    features: ['音乐视频', '音乐流媒体', '歌词同步'],
    popularity: 95,
    monetization: true,
    contentGuidelines: ['音乐版权', '原创内容']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    region: 'international',
    type: 'social',
    url: 'https://www.tiktok.com',
    icon: '🎵',
    color: 'from-pink-500 to-purple-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问，海外版抖音',
    description: '全球最热门的短视频平台',
    features: ['短视频', '音乐BGM', '特效', '直播'],
    popularity: 100,
    monetization: true,
    contentGuidelines: ['原创内容', '社区准则', '音乐版权']
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    region: 'china',
    type: 'video',
    url: 'https://www.bilibili.com',
    icon: '📺',
    color: 'from-blue-500 to-pink-500',
    accessibleInChina: true,
    description: '中国最大的原创视频平台，年轻人聚集地',
    features: ['弹幕', '原创内容', 'UP主', '直播'],
    popularity: 98,
    monetization: true,
    contentGuidelines: ['原创内容', '弹幕礼仪', '版权合规']
  },
  {
    id: 'douyin',
    name: '抖音',
    region: 'china',
    type: 'social',
    url: 'https://www.douyin.com',
    icon: '🎬',
    color: 'from-pink-500 to-rose-500',
    accessibleInChina: true,
    description: '中国最热门的短视频平台',
    features: ['短视频', '音乐BGM', '特效', '直播带货'],
    popularity: 100,
    monetization: true,
    contentGuidelines: ['原创内容', '社区准则', '音乐版权']
  },
  {
    id: 'kuaishou',
    name: '快手',
    region: 'china',
    type: 'video',
    url: 'https://www.kuaishou.com',
    icon: '🎥',
    color: 'from-teal-500 to-green-500',
    accessibleInChina: true,
    description: '中国第二大短视频平台',
    features: ['短视频', '直播', '快手小店'],
    popularity: 95,
    monetization: true,
    contentGuidelines: ['原创内容', '真实记录']
  },
  {
    id: 'tencent-video',
    name: '腾讯视频',
    region: 'china',
    type: 'video',
    url: 'https://v.qq.com',
    icon: '🎞️',
    color: 'from-blue-500 to-indigo-500',
    accessibleInChina: true,
    description: '腾讯旗下视频平台',
    features: ['长视频', '自制剧', '综艺'],
    popularity: 90,
    monetization: true,
    contentGuidelines: ['版权内容', '原创投稿']
  },
  {
    id: 'iqiyi',
    name: '爱奇艺',
    region: 'china',
    type: 'video',
    url: 'https://www.iqiyi.com',
    icon: '🎬',
    color: 'from-green-500 to-teal-500',
    accessibleInChina: true,
    description: '中国领先的视频平台',
    features: ['长视频', '自制内容', 'VR'],
    popularity: 88,
    monetization: true,
    contentGuidelines: ['原创投稿', '版权合规']
  },
  {
    id: 'youku',
    name: '优酷',
    region: 'china',
    type: 'video',
    url: 'https://www.youku.com',
    icon: '📽️',
    color: 'from-orange-500 to-yellow-500',
    accessibleInChina: true,
    description: '阿里巴巴旗下视频平台',
    features: ['长视频', '自制剧', '综艺'],
    popularity: 85,
    monetization: true,
    contentGuidelines: ['原创内容', '版权合规']
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    region: 'international',
    type: 'video',
    url: 'https://vimeo.com',
    icon: '🎥',
    color: 'from-blue-400 to-cyan-400',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: '专业视频平台，高质量视频分享',
    features: ['高清视频', '专业剪辑', '音乐视频'],
    popularity: 80,
    monetization: false,
    contentGuidelines: ['高清质量', '原创内容', '专业标准']
  },
  {
    id: 'dailymotion',
    name: 'Dailymotion',
    region: 'international',
    type: 'video',
    url: 'https://www.dailymotion.com',
    icon: '▶️',
    color: 'from-blue-600 to-indigo-600',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: '欧洲主要视频平台',
    features: ['视频上传', '直播', '优质内容'],
    popularity: 70,
    monetization: true,
    contentGuidelines: ['原创内容', '社区准则']
  },
  {
    id: 'twitch',
    name: 'Twitch',
    region: 'international',
    type: 'streaming',
    url: 'https://www.twitch.tv',
    icon: '📺',
    color: 'from-purple-500 to-violet-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: '全球最大直播平台，也适合音乐直播',
    features: ['直播', '音乐直播', '社区', '订阅'],
    popularity: 90,
    monetization: true,
    contentGuidelines: ['社区准则', '版权音乐', '直播规范']
  },
  {
    id: 'instagram-video',
    name: 'Instagram Reels',
    region: 'international',
    type: 'social',
    url: 'https://www.instagram.com',
    icon: '📷',
    color: 'from-pink-500 to-orange-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: 'Meta旗下短视频平台',
    features: ['Reels短视频', 'Stories', '音乐贴纸'],
    popularity: 98,
    monetization: true,
    contentGuidelines: ['原创内容', '音乐版权', '社区准则']
  },
  {
    id: 'facebook-watch',
    name: 'Facebook Watch',
    region: 'international',
    type: 'video',
    url: 'https://www.facebook.com/watch',
    icon: '👥',
    color: 'from-blue-600 to-blue-400',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: 'Facebook视频平台',
    features: ['视频', '直播', '社交分享'],
    popularity: 85,
    monetization: true,
    contentGuidelines: ['社区准则', '原创内容']
  },
  {
    id: 'twitter-video',
    name: 'Twitter/X Video',
    region: 'international',
    type: 'social',
    url: 'https://twitter.com',
    icon: '🐦',
    color: 'from-blue-400 to-sky-400',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理访问',
    description: '社交平台内嵌视频功能',
    features: ['短视频', '直播', '社交分享'],
    popularity: 88,
    monetization: true,
    contentGuidelines: ['社区准则', '原创内容']
  }
];

export const mvStyles = [
  {
    id: 'cinematic',
    name: '电影风格',
    icon: '🎬',
    description: '高质量电影级MV效果',
    price: 100
  },
  {
    id: 'lyric',
    name: '歌词字幕',
    icon: '📝',
    description: '滚动歌词配合背景视频',
    price: 50
  },
  {
    id: 'animation',
    name: '动画风格',
    icon: '🎨',
    description: '手绘或卡通动画效果',
    price: 80
  },
  {
    id: 'live',
    name: '现场感',
    icon: '🎤',
    description: '演唱会现场效果',
    price: 60
  },
  {
    id: 'abstract',
    name: '抽象艺术',
    icon: '✨',
    description: '现代艺术抽象风格',
    price: 70
  }
];

export const resolutions = [
  { id: '720p', name: '720P', description: '高清', price: 0 },
  { id: '1080p', name: '1080P', description: '全高清', price: 20 },
  { id: '4k', name: '4K', description: '超高清', price: 50 }
];

export const videoGuides = [
  {
    title: 'MV制作基础',
    steps: [
      '选择或导入歌词',
      '选择MV风格和模板',
      '上传背景音乐或使用AI生成',
      '调整时间轴和歌词同步',
      '预览并调整细节',
      '导出最终MV'
    ]
  },
  {
    title: '视频平台上传指南',
    steps: [
      '准备视频文件（MP4格式最佳）',
      '创建平台账号并完成实名认证',
      '填写视频信息（标题、描述、标签）',
      '选择分类和封面图',
      '设置可见性和发布时间',
      '提交审核并等待通过'
    ]
  }
];
