export interface MusicPlatform {
  id: string;
  name: string;
  region: 'china' | 'international' | 'asia' | 'europe' | 'americas';
  type: 'streaming' | 'social' | 'creation' | 'distribution';
  url: string;
  icon: string;
  color: string;
  accessibleInChina: boolean;
  accessMethod?: string;
  description: string;
  features: string[];
  popularity: number;
}

export const musicPlatforms: MusicPlatform[] = [
  // 中国国内可直接访问的平台
  {
    id: 'qq-music',
    name: 'QQ音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://y.qq.com',
    icon: '🎵',
    color: 'from-green-500 to-emerald-500',
    accessibleInChina: true,
    description: '中国最大的在线音乐平台，由腾讯开发',
    features: ['海量曲库', '独家版权', '歌词翻译', '电台'],
    popularity: 100
  },
  {
    id: 'netease-music',
    name: '网易云音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://music.163.com',
    icon: '🎶',
    color: 'from-red-500 to-orange-500',
    accessibleInChina: true,
    description: '以社区和评论著称的音乐平台',
    features: ['音乐社区', '精彩评论', '私人FM', '云盘'],
    popularity: 98
  },
  {
    id: 'kugou',
    name: '酷狗音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://www.kugou.com',
    icon: '🎧',
    color: 'from-blue-500 to-cyan-500',
    accessibleInChina: true,
    description: '数字音乐交互服务提供商',
    features: ['海量曲库', '无损音质', '蝰蛇音效', 'K歌'],
    popularity: 95
  },
  {
    id: 'kuwo',
    name: '酷我音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://www.kuwo.cn',
    icon: '🎤',
    color: 'from-purple-500 to-pink-500',
    accessibleInChina: true,
    description: '多样化音乐内容的在线平台',
    features: ['酷我聚星', '有声内容', '音乐现场'],
    popularity: 90
  },
  {
    id: 'xiami',
    name: '虾米音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://www.xiami.com',
    icon: '🦐',
    color: 'from-orange-500 to-amber-500',
    accessibleInChina: true,
    description: '阿里巴巴旗下的音乐平台',
    features: ['精选题集', '音乐人', '专辑解析'],
    popularity: 85
  },
  {
    id: 'migu',
    name: '咪咕音乐',
    region: 'china',
    type: 'streaming',
    url: 'https://music.migu.cn',
    icon: '📱',
    color: 'from-yellow-500 to-lime-500',
    accessibleInChina: true,
    description: '中国移动旗下的音乐平台',
    features: ['免流量', '彩铃', '演唱会直播'],
    popularity: 82
  },
  {
    id: 'douyin-music',
    name: '抖音音乐',
    region: 'china',
    type: 'social',
    url: 'https://www.douyin.com',
    icon: '🎬',
    color: 'from-pink-500 to-rose-500',
    accessibleInChina: true,
    description: '短视频与音乐结合的社交平台',
    features: ['音乐推广', '热门BGM', '音乐挑战赛'],
    popularity: 99
  },
  {
    id: 'kuaishou-music',
    name: '快手音乐',
    region: 'china',
    type: 'social',
    url: 'https://www.kuaishou.com',
    icon: '🎥',
    color: 'from-teal-500 to-cyan-500',
    accessibleInChina: true,
    description: '快手旗下的音乐内容平台',
    features: ['原创音乐', '音乐人计划', '音乐带货'],
    popularity: 96
  },
  {
    id: 'bilibili-music',
    name: 'B站音乐区',
    region: 'china',
    type: 'social',
    url: 'https://www.bilibili.com/audio',
    icon: '📺',
    color: 'from-blue-500 to-indigo-500',
    accessibleInChina: true,
    description: '二次元和原创音乐聚集地',
    features: ['原创音乐', '鬼畜', '音乐MV'],
    popularity: 92
  },
  {
    id: '5sing',
    name: '5sing原创音乐',
    region: 'china',
    type: 'creation',
    url: 'https://5sing.kugou.com',
    icon: '🎼',
    color: 'from-purple-500 to-violet-500',
    accessibleInChina: true,
    description: '原创音乐基地，独立音乐人平台',
    features: ['原创音乐', '翻唱', '伴奏'],
    popularity: 80
  },

  // 国际平台 - 需要特殊访问方式
  {
    id: 'spotify',
    name: 'Spotify',
    region: 'international',
    type: 'streaming',
    url: 'https://www.spotify.com',
    icon: '🎵',
    color: 'from-green-500 to-emerald-400',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，可通过苹果商店海外版或官网下载',
    description: '全球最大的音乐流媒体平台',
    features: ['个性化推荐', '播放列表', '播客', '多语言'],
    popularity: 100
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    region: 'international',
    type: 'streaming',
    url: 'https://music.apple.com',
    icon: '🍎',
    color: 'from-gray-400 to-gray-600',
    accessibleInChina: true,
    description: '苹果公司推出的音乐流媒体服务',
    features: ['空间音频', '无损音质', '独家内容'],
    popularity: 98
  },
  {
    id: 'youtube-music',
    name: 'YouTube Music',
    region: 'international',
    type: 'streaming',
    url: 'https://music.youtube.com',
    icon: '📹',
    color: 'from-red-500 to-orange-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，可通过浏览器或APP访问',
    description: 'Google推出的音乐流媒体服务',
    features: ['音乐视频', '个性化混音', '离线下载'],
    popularity: 97
  },
  {
    id: 'amazon-music',
    name: 'Amazon Music',
    region: 'international',
    type: 'streaming',
    url: 'https://music.amazon.com',
    icon: '📦',
    color: 'from-orange-500 to-amber-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，需海外Amazon账号',
    description: '亚马逊旗下的音乐流媒体服务',
    features: ['HD音质', 'Alexa集成', '海量曲库'],
    popularity: 90
  },
  {
    id: 'deezer',
    name: 'Deezer',
    region: 'europe',
    type: 'streaming',
    url: 'https://www.deezer.com',
    icon: '🎶',
    color: 'from-purple-600 to-indigo-600',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，全球多地区可用',
    description: '总部在法国的音乐流媒体平台',
    features: ['Flow推荐', '歌词同步', '高清音质'],
    popularity: 85
  },
  {
    id: 'tidal',
    name: 'Tidal',
    region: 'international',
    type: 'streaming',
    url: 'https://tidal.com',
    icon: '🌊',
    color: 'from-cyan-500 to-blue-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，支持多种无损格式',
    description: '高保真音乐流媒体平台',
    features: ['Master质量', '无损音乐', '独家内容'],
    popularity: 80
  },
  {
    id: 'pandora',
    name: 'Pandora',
    region: 'americas',
    type: 'streaming',
    url: 'https://www.pandora.com',
    icon: '📻',
    color: 'from-blue-500 to-indigo-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，主要面向美国市场',
    description: '美国的互联网电台服务',
    features: ['音乐基因组', '电台', '个性化'],
    popularity: 78
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    region: 'international',
    type: 'creation',
    url: 'https://soundcloud.com',
    icon: '☁️',
    color: 'from-orange-500 to-red-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，独立音乐人聚集地',
    description: '全球最大的独立音乐人平台',
    features: ['独立音乐', '免费上传', '音乐人社区'],
    popularity: 92
  },
  {
    id: 'bandcamp',
    name: 'Bandcamp',
    region: 'international',
    type: 'creation',
    url: 'https://bandcamp.com',
    icon: '🎸',
    color: 'from-blue-400 to-cyan-400',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，支持独立音乐人',
    description: '独立音乐销售和发现平台',
    features: ['支持音乐人', '实体商品', '粉丝社区'],
    popularity: 85
  },
  {
    id: 'tiktok-music',
    name: 'TikTok Music',
    region: 'international',
    type: 'social',
    url: 'https://www.tiktok.com/music',
    icon: '🎵',
    color: 'from-pink-500 to-purple-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，海外版抖音',
    description: '全球热门的短视频音乐平台',
    features: ['热门BGM', '音乐挑战', '全球趋势'],
    popularity: 99
  },
  {
    id: 'instagram-music',
    name: 'Instagram Music',
    region: 'international',
    type: 'social',
    url: 'https://www.instagram.com',
    icon: '📷',
    color: 'from-pink-500 to-rose-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，图片社交平台',
    description: 'Instagram中的音乐功能',
    features: ['音乐贴纸', 'Reels', '音乐故事'],
    popularity: 95
  },

  // 亚洲平台
  {
    id: 'line-music',
    name: 'LINE MUSIC',
    region: 'asia',
    type: 'streaming',
    url: 'https://music.line.me',
    icon: '💬',
    color: 'from-green-500 to-teal-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，主要在日本、台湾',
    description: 'LINE旗下的音乐流媒体服务',
    features: ['LINE集成', '日韩音乐', '铃声'],
    popularity: 85
  },
  {
    id: 'kkbox',
    name: 'KKBOX',
    region: 'asia',
    type: 'streaming',
    url: 'https://www.kkbox.com',
    icon: '🎧',
    color: 'from-blue-500 to-purple-500',
    accessibleInChina: true,
    description: '台湾、香港和新加坡流行的音乐平台',
    features: ['华语音乐', '榜单', '电台'],
    popularity: 88
  },
  {
    id: 'joox',
    name: 'JOOX',
    region: 'asia',
    type: 'streaming',
    url: 'https://www.joox.com',
    icon: '🎤',
    color: 'from-green-500 to-lime-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，东南亚热门平台',
    description: '腾讯在东南亚推出的音乐平台',
    features: ['K-Pop', '本地音乐', 'K歌'],
    popularity: 82
  },
  {
    id: 'gaana',
    name: 'Gaana',
    region: 'asia',
    type: 'streaming',
    url: 'https://gaana.com',
    icon: '🇮🇳',
    color: 'from-orange-500 to-green-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，印度最大平台',
    description: '印度最大的音乐流媒体平台',
    features: ['宝莱坞', '地方语言', '播客'],
    popularity: 80
  },

  // 发行平台
  {
    id: 'distrokid',
    name: 'DistroKid',
    region: 'international',
    type: 'distribution',
    url: 'https://distrokid.com',
    icon: '🚀',
    color: 'from-green-500 to-emerald-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，音乐分发平台',
    description: '独立音乐人音乐发行平台',
    features: ['全球分发', '100%收益', '快速上架'],
    popularity: 90
  },
  {
    id: 'cdbaby',
    name: 'CD Baby',
    region: 'international',
    type: 'distribution',
    url: 'https://cdbaby.com',
    icon: '💿',
    color: 'from-red-500 to-orange-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，老牌发行平台',
    description: '历史悠久的独立音乐发行平台',
    features: ['实体唱片', '数字发行', '销售数据'],
    popularity: 85
  },
  {
    id: 'tunecore',
    name: 'TuneCore',
    region: 'international',
    type: 'distribution',
    url: 'https://www.tunecore.com',
    icon: '🎵',
    color: 'from-purple-500 to-violet-500',
    accessibleInChina: false,
    accessMethod: '需要使用 VPN / 代理，全球发行服务',
    description: '专业的音乐发行服务平台',
    features: ['全球上架', '收入统计', 'YouTube内容ID'],
    popularity: 82
  }
];

export const platformCategories = [
  { id: 'all', name: '全部平台', icon: '🌍' },
  { id: 'china', name: '国内可直接访问', icon: '🇨🇳' },
  { id: 'international', name: '国际平台', icon: '🌐' },
  { id: 'streaming', name: '流媒体', icon: '🎵' },
  { id: 'social', name: '社交音乐', icon: '👥' },
  { id: 'creation', name: '创作/独立', icon: '🎹' },
  { id: 'distribution', name: '发行平台', icon: '🚀' }
];

export const accessGuides = [
  {
    title: 'VPN 推荐',
    content: '1. ExpressVPN - 稳定高速\n2. NordVPN - 服务器丰富\n3. Surfshark - 性价比高\n4. Clash - 开源方案'
  },
  {
    title: '海外 Apple ID',
    content: '如何获取海外 Apple ID：\n1. 注册新 Apple ID，选择其他国家/地区\n2. 购买礼品卡进行充值\n3. 下载海外版应用'
  },
  {
    title: '代理设置',
    content: '常用的代理协议：\n• Shadowsocks (SS)\n• ShadowsocksR (SSR)\n• V2Ray\n• Trojan\n• Clash'
  }
];

export const deploymentGuides = [
  {
    id: 'github-pages',
    title: 'GitHub Pages 部署',
    difficulty: '简单',
    icon: '🐙',
    steps: [
      '创建 GitHub 仓库',
      '上传项目代码',
      '配置 Actions 自动构建',
      '部署到 GitHub Pages'
    ]
  },
  {
    id: 'netlify',
    title: 'Netlify 部署',
    difficulty: '简单',
    icon: '🔺',
    steps: [
      '连接 GitHub 仓库',
      '配置构建命令',
      '点击部署',
      '自定义域名'
    ]
  },
  {
    id: 'vps',
    title: 'VPS 部署',
    difficulty: '中等',
    icon: '💻',
    steps: [
      '购买 VPS（推荐：阿里云、腾讯云、Vultr）',
      '安装 Nginx 和 Node.js',
      '克隆项目到服务器',
      '配置 PM2 管理进程',
      '配置 SSL 证书'
    ]
  },
  {
    id: 'cloudflare',
    title: 'Cloudflare Pages',
    difficulty: '简单',
    icon: '☁️',
    steps: [
      '连接 GitHub 仓库',
      '设置构建命令',
      '自动部署',
      '全球 CDN 加速'
    ]
  }
];

export const musicCreationFeatures = [
  {
    id: 'lyrics',
    name: '歌词生成',
    icon: '✍️',
    description: 'AI智能生成歌词，支持多种风格和主题'
  },
  {
    id: 'melody',
    name: '旋律建议',
    icon: '🎵',
    description: '根据歌词提供旋律建议和和弦进行'
  },
  {
    id: 'rhythm',
    name: '节奏辅助',
    icon: '🥁',
    description: '节奏模板和节拍器工具'
  },
  {
    id: 'cover',
    name: '封面设计',
    icon: '🎨',
    description: 'AI生成专辑封面设计'
  },
  {
    id: 'optimize',
    name: '歌词优化',
    icon: '✨',
    description: '润色和优化现有歌词'
  },
  {
    id: 'translate',
    name: '多语言',
    icon: '🌍',
    description: '歌词翻译和多语言版本'
  }
];
