export interface Platform {
  name: string;
  icon: string;
  color: string;
  url: string;
  category: 'china' | 'international' | 'aggregator' | 'social' | 'podcast' | 'ai';
  region: '国内' | '国际' | '全球';
  steps: string[];
  tips: string[];
}

export const platforms: Platform[] = [
  // ==================== 国内主流平台 ====================
  {
    name: '网易云音乐',
    icon: '🎵',
    color: 'from-red-500 to-red-600',
    url: 'https://music.163.com/st/musician',
    category: 'china',
    region: '国内',
    steps: ['注册音乐人账号', '登录网易云音乐创作者中心', '进入作品管理页面', '点击上传新作品', '填写作品信息并上传', '等待审核通过'],
    tips: ['确保音频文件格式符合要求（MP3/WAV）', '准备好作品封面（建议尺寸 1080x1080）', '歌词文件建议使用 LRC 格式', '需要提供版权证明文件']
  },
  {
    name: 'QQ音乐',
    icon: '🎶',
    color: 'from-green-500 to-green-600',
    url: 'https://y.qq.com/studio/artist',
    category: 'china',
    region: '国内',
    steps: ['注册并认证音乐人', '进入 QQ 音乐开放平台', '选择上传单曲或专辑', '填写作品信息', '上传音频和歌词文件', '提交审核'],
    tips: ['支持 MP3、WAV、FLAC 格式', '需要提供 ISRC 码（可选）', '确保歌词时间轴准确', '审核周期通常 1-3 个工作日']
  },
  {
    name: '酷狗音乐',
    icon: '🐶',
    color: 'from-blue-500 to-blue-600',
    url: 'https://www.kugou.com/yy/html/union/apply.html',
    category: 'china',
    region: '国内',
    steps: ['注册酷狗音乐人账号', '登录创作者中心', '点击发布作品', '上传音频文件', '填写详细信息', '提交发布申请'],
    tips: ['支持多种音频格式', '需要实名认证', '建议准备高清封面', '可同步上传歌词']
  },
  {
    name: '酷我音乐',
    icon: '🎹',
    color: 'from-yellow-500 to-yellow-600',
    url: 'https://www.kuwo.cn/creator',
    category: 'china',
    region: '国内',
    steps: ['注册酷我音乐人', '进入创作者后台', '选择上传方式', '填写作品信息', '上传文件并提交', '等待审核结果'],
    tips: ['需要上传作品Demo', '确保文件质量达标', '版权声明需准确', '审核时间约 2-5 天']
  },
  {
    name: '汽水音乐',
    icon: '🥤',
    color: 'from-cyan-500 to-cyan-600',
    url: 'https://music.soda.net.cn',
    category: 'china',
    region: '国内',
    steps: ['下载并安装汽水音乐 App', '注册账号并完成实名认证', '进入音乐人中心申请认证', '创建发行方主体', '上传音频文件和封面', '提交审核并发布作品'],
    tips: ['支持 MP3、WAV、FLAC 格式', '需要抖音账号授权登录', '封面尺寸需 1400×1400 像素以上', '可同步分发至抖音音乐库']
  },
  {
    name: '番茄音乐',
    icon: '🍅',
    color: 'from-orange-500 to-orange-600',
    url: 'https://music.fanqie.com/creator',
    category: 'china',
    region: '国内',
    steps: ['访问番茄音乐创作者平台', '注册并登录账号', '完成创作者身份认证', '上传音频文件和元数据', '设置发行信息', '提交审核并发布'],
    tips: ['字节跳动旗下音乐平台', '支持 AI 音乐人入驻', '按播放时长计费收益', '可同步至字节系产品矩阵']
  },
  {
    name: '咪咕音乐',
    icon: '📱',
    color: 'from-orange-600 to-orange-700',
    url: 'https://artist.migu.cn/',
    category: 'china',
    region: '国内',
    steps: ['注册咪咕音乐人', '完成实名认证', '进入创作者后台', '上传音乐作品', '填写作品信息', '提交审核发布'],
    tips: ['支持多种音频格式上传', '需要提供版权证明', '审核周期较短', '可获得流量扶持']
  },
  {
    name: '全民K歌',
    icon: '🎤',
    color: 'from-pink-500 to-pink-600',
    url: 'https://kg.qq.com/',
    category: 'social',
    region: '国内',
    steps: ['注册QQ账号', '登录全民K歌', '完成歌手认证', '上传原创作品', '完善作品信息', '发布并分享'],
    tips: ['支持K歌翻唱和原创', '可获得粉丝打赏', '适合展示演唱实力', '社交属性强']
  },
  {
    name: '喜马拉雅',
    icon: '🎙️',
    color: 'from-orange-700 to-red-700',
    url: 'https://www.ximalaya.com/creator',
    category: 'podcast',
    region: '国内',
    steps: ['注册喜马拉雅账号', '申请成为主播', '上传音频作品', '添加歌词描述', '设置作品分类', '发布作品'],
    tips: ['适合有声内容创作', '支持多种音频格式', '需要完善主播资料', '可获得平台推荐']
  },
  {
    name: '网易音乐人',
    icon: '☁️',
    color: 'from-red-600 to-pink-600',
    url: 'https://music.163.com/st/musician',
    category: 'china',
    region: '国内',
    steps: ['选择入驻身份（音乐人/AI音乐人/见习音乐人）', '提交个人资料和原创作品', '完成实名认证', '等待平台审核', '通过审核后发布作品', '可逐步升级音乐人等级'],
    tips: ['支持三种音乐人身份入驻', 'AI 音乐人有专属激励计划', '提供天音 AI 写歌工具', '百万奖金 AI 音乐创作大赛进行中']
  },
  {
    name: '懒人听书',
    icon: '📖',
    color: 'from-purple-500 to-purple-600',
    url: 'https://www.lrts.me/',
    category: 'podcast',
    region: '国内',
    steps: ['注册懒人听书账号', '申请成为主播', '上传长音频内容', '添加标题和描述', '设置分类标签', '发布作品'],
    tips: ['专注长音频和有声书', '版权内容优先', '适合广播剧和有声书', '收益模式成熟']
  },
  {
    name: '波点音乐',
    icon: '💿',
    color: 'from-indigo-500 to-indigo-600',
    url: 'https://bodian.music.funpocal.com/',
    category: 'china',
    region: '国内',
    steps: ['下载波点音乐 App', '注册并登录账号', '进入创作者中心', '上传原创音乐', '设置作品信息', '发布作品'],
    tips: ['界面简洁美观', '支持短视频音乐联动', '年轻用户群体大', '推广机会多']
  },
  {
    name: '千千音乐',
    icon: '🎼',
    color: 'from-teal-500 to-teal-600',
    url: 'https://music.9icu.com/',
    category: 'china',
    region: '国内',
    steps: ['注册千千音乐账号', '申请音乐人认证', '上传音乐作品', '填写详细信息', '等待审核', '发布作品'],
    tips: ['老牌音乐平台', '独立音乐人友好', '社区氛围浓厚', '历史底蕴深']
  },
  {
    name: '蜻蜓FM',
    icon: '🦋',
    color: 'from-sky-500 to-sky-600',
    url: 'https://www.qtfm.cn/',
    category: 'podcast',
    region: '国内',
    steps: ['注册蜻蜓FM账号', '申请主播认证', '上传音频内容', '完善频道信息', '设置节目分类', '发布节目'],
    tips: ['聚合全国广播电台', '专业播客内容丰富', '用户基础广泛', '变现渠道多元']
  },
  {
    name: '荔枝FM',
    icon: '🥒',
    color: 'from-lime-500 to-lime-600',
    url: 'https://www.lizhi.fm/',
    category: 'podcast',
    region: '国内',
    steps: ['注册荔枝FM账号', '申请成为主播', '录制或上传音频', '编辑节目信息', '设置封面和分类', '发布节目'],
    tips: ['移动端友好', '支持录音编辑', '粉丝互动强', '变现方式多样']
  },
  {
    name: '豆瓣音乐',
    icon: '🎭',
    color: 'from-gray-600 to-gray-700',
    url: 'https://music.douban.com/',
    category: 'china',
    region: '国内',
    steps: ['注册豆瓣账号', '进入豆瓣音乐', '完善艺术家资料', '上传音乐作品', '编写专辑介绍', '发布音乐'],
    tips: ['文艺青年聚集地', '独立音乐人首选', '社区评价高', '适合小众音乐']
  },
  {
    name: '5sing原创音乐',
    icon: '🎸',
    color: 'from-violet-500 to-violet-600',
    url: 'https://5sing.kugou.com/',
    category: 'china',
    region: '国内',
    steps: ['注册5sing账号', '完成音乐人认证', '上传原创作品', '填写作品信息', '设置伴奏和歌词', '发布作品'],
    tips: ['原创音乐基地', '支持原创和翻唱', '古风音乐友好', '粉丝粘性高']
  },
  {
    name: 'JOOX',
    icon: '🎧',
    color: 'from-fuchsia-500 to-fuchsia-600',
    url: 'https://www.joox.com/',
    category: 'international',
    region: '国内',
    steps: ['下载JOOX App', '注册并登录', '申请音乐人认证', '上传音乐作品', '填写详细信息', '发布作品'],
    tips: ['腾讯音乐旗下海外平台', '覆盖东南亚市场', '多语言支持', '国际化推广']
  },
  {
    name: 'MOO音乐',
    icon: '🎵',
    color: 'from-rose-500 to-rose-600',
    url: 'https://i.moo.tech/',
    category: 'china',
    region: '国内',
    steps: ['下载MOO音乐 App', '注册并登录', '申请成为音乐人', '上传原创音乐', '完善作品信息', '发布作品'],
    tips: ['高品质音乐定位', '视觉设计独特', '适合独立音乐', '小众精品平台']
  },
  {
    name: '唱吧',
    icon: '🎚️',
    color: 'from-amber-500 to-amber-600',
    url: 'https://changba.com/',
    category: 'social',
    region: '国内',
    steps: ['下载唱吧 App', '注册并登录', '完成歌手认证', '录制或上传作品', '添加伴奏和特效', '发布并分享'],
    tips: ['K歌社交平台', '支持录制和编辑', '可获得粉丝打赏', '展示演唱实力']
  },

  // ==================== 国际主流平台 ====================
  {
    name: 'Spotify',
    icon: '🎧',
    color: 'from-green-600 to-green-700',
    url: 'https://artists.spotify.com',
    category: 'international',
    region: '国际',
    steps: ['通过音乐分销商注册', '选择合适的分销平台', '上传音乐文件和元数据', '设置发行日期和地区', '完成付费流程', '等待发布到 Spotify'],
    tips: ['通常需要使用第三方分销商', '常见的分销商有 DistroKid、CD Baby 等', '需要准备高质量音频文件', '全球发行通常需要 1-2 周']
  },
  {
    name: 'Apple Music',
    icon: '🍎',
    color: 'from-gray-800 to-black',
    url: 'https://artists.apple.com',
    category: 'international',
    region: '国际',
    steps: ['注册 Apple Music 音乐人', '使用音乐分销商上传', '准备 WAV 或 ALAC 格式音频', '填写完整的元数据', '设置发行计划', '提交审核和发布'],
    tips: ['Apple Music 对音频质量要求较高', '建议使用 44.1kHz/16bit WAV 格式', '封面尺寸建议 3000x3000 像素', '需要提供 ISRC 和 UPC/EAN 码']
  },
  {
    name: 'Amazon Music',
    icon: '📦',
    color: 'from-orange-500 to-orange-600',
    url: 'https://artists.amazon.com',
    category: 'international',
    region: '国际',
    steps: ['注册 Amazon Music for Artists', '使用分销商上传音乐', '准备高质量音频文件', '填写元数据和版权信息', '设置发行日期', '等待平台审核'],
    tips: ['全球最大电商平台音乐服务', '与 Alexa 深度集成', '覆盖智能音箱用户', '增长快速的流媒体平台']
  },
  {
    name: 'YouTube Music',
    icon: '📺',
    color: 'from-red-600 to-red-700',
    url: 'https://artists.youtube.com',
    category: 'international',
    region: '国际',
    steps: ['注册 YouTube 频道', '申请 YouTube 音乐人', '使用分销商上传音乐', '上传音乐视频', '设置版权信息', '发布并推广'],
    tips: ['全球最大视频平台音乐服务', '支持音乐视频上传', '与 YouTube 深度整合', '算法推荐强大']
  },
  {
    name: 'Deezer',
    icon: '💜',
    color: 'from-purple-600 to-purple-700',
    url: 'https://developers.deezer.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Deezer 开发者账号', '使用分销商上传音乐', '准备音频和封面文件', '填写完整的元数据', '设置发行计划', '发布到 Deezer'],
    tips: ['法国知名音乐平台', 'HiFi 音质服务', '全球覆盖', '独立的推荐算法']
  },
  {
    name: 'Tidal',
    icon: '🌊',
    color: 'from-blue-700 to-blue-800',
    url: 'https://tidal.com/artists',
    category: 'international',
    region: '国际',
    steps: ['注册 Tidal 艺术家账号', '使用分销商上传音乐', '上传高质量音频', '填写艺术家信息', '设置发行日期', '发布作品'],
    tips: ['主打无损音质', '艺术家友好平台', '高保真音乐体验', '独立音乐人友好']
  },
  {
    name: 'Pandora',
    icon: '📻',
    color: 'from-sky-600 to-sky-700',
    url: 'https://www.pandora.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Pandora 账号', '申请艺术家入驻', '使用分销商上传音乐', '填写元数据', '设置发行信息', '等待审核发布'],
    tips: ['美国老牌音乐平台', '独特的音乐推荐算法', '广播式音乐体验', '粉丝互动功能']
  },
  {
    name: 'SoundCloud',
    icon: '☁️',
    color: 'from-orange-600 to-orange-700',
    url: 'https://soundcloud.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 SoundCloud 账号', '升级为 Pro 账户', '上传音乐作品', '添加封面和描述', '设置发行选项', '分享和推广'],
    tips: ['全球最大独立音乐平台', '支持直接上传分享', '独立音乐人首选', '社区互动性强']
  },
  {
    name: 'Bandcamp',
    icon: '🎸',
    color: 'from-teal-600 to-teal-700',
    url: 'https://bandcamp.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Bandcamp 账号', '创建艺术家页面', '上传音乐和专辑', '设置价格和销售选项', '添加粉丝追踪', '直接销售音乐'],
    tips: ['独立音乐人直销平台', '粉丝可直接购买支持', '合理的分成比例', '支持实体专辑销售']
  },
  {
    name: 'Audiomack',
    icon: '🎵',
    color: 'from-cyan-600 to-cyan-700',
    url: 'https://audiomack.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Audiomack 账号', '申请音乐人认证', '上传音乐作品', '完善艺术家资料', '添加社交链接', '推广作品'],
    tips: ['非洲及散居社区流行', '独立音乐推广平台', '免费上传音乐', '播放分成机制']
  },
  {
    name: 'iHeartRadio',
    icon: '📻',
    color: 'from-pink-600 to-pink-700',
    url: 'https://www.iheart.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 iHeartRadio 账号', '申请艺术家入驻', '使用分销商上传音乐', '添加艺术家资料', '设置发行信息', '发布作品'],
    tips: ['美国领先广播平台', '结合传统广播和流媒体', '电台节目丰富', '粉丝互动功能']
  },
  {
    name: 'Napster',
    icon: '🎵',
    color: 'from-blue-600 to-blue-700',
    url: 'https://us.napster.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Napster 账号', '申请音乐人入驻', '使用分销商上传音乐', '填写元数据', '设置发行日期', '发布作品'],
    tips: ['历史悠久的音乐平台', '高质量音乐服务', '无广告体验', '全球覆盖']
  },
  {
    name: 'Qobuz',
    icon: '🎼',
    color: 'from-indigo-600 to-indigo-700',
    url: 'https://www.qobuz.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Qobuz 账号', '申请艺术家入驻', '上传高质量音乐', '填写详细信息', '设置发行计划', '发布作品'],
    tips: ['法国高端音乐平台', '主打Hi-Res无损音质', '古典音乐丰富', '专业音乐人支持']
  },
  {
    name: 'Anghami',
    icon: '🎵',
    color: 'from-violet-600 to-violet-700',
    url: 'https://www.anghami.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Anghami 账号', '申请成为艺术家', '上传音乐作品', '添加艺术家资料', '设置发行信息', '发布并推广'],
    tips: ['中东和北非领先平台', '阿拉伯音乐中心', '多语言支持', '区域推广优势']
  },
  {
    name: 'Yandex Music',
    icon: '🎵',
    color: 'from-red-500 to-red-600',
    url: 'https://music.yandex.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Yandex 账号', '申请音乐人认证', '使用分销商上传音乐', '填写详细信息', '设置发行日期', '发布作品'],
    tips: ['俄罗斯最大音乐平台', '东欧市场覆盖', '智能推荐系统', '多语言支持']
  },
  {
    name: 'KKBox',
    icon: '🎵',
    color: 'from-teal-500 to-teal-600',
    url: 'https://www.kkbox.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 KKBox 账号', '申请音乐人认证', '上传音乐作品', '填写详细信息', '设置发行信息', '发布作品'],
    tips: ['台湾领先音乐平台', '华语音乐丰富', '东南亚市场覆盖', '高质量音频服务']
  },
  {
    name: 'Line Music',
    icon: '📱',
    color: 'from-green-500 to-green-600',
    url: 'https://music.line.me/',
    category: 'international',
    region: '国际',
    steps: ['注册 Line 账号', '申请 Line Music 音乐人', '上传音乐作品', '填写详细信息', '设置发行日期', '发布作品'],
    tips: ['日本主流音乐平台', '与 Line 社交整合', '动漫音乐丰富', '亚洲市场推广']
  },
  {
    name: 'AWA',
    icon: '🎵',
    color: 'from-purple-500 to-purple-600',
    url: 'https://awamusic.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 AWA 账号', '申请艺术家认证', '上传音乐作品', '完善艺术家资料', '设置发行信息', '发布作品'],
    tips: ['日本音乐平台', '高质量流媒体', '专业音乐推荐', '亚洲市场覆盖']
  },
  {
    name: 'Melon',
    icon: '🍈',
    color: 'from-green-600 to-green-700',
    url: 'https://www.melon.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Melon 账号', '申请音乐人认证', '使用分销商上传音乐', '填写详细信息', '设置发行日期', '发布作品'],
    tips: ['韩国最大音乐平台', 'K-POP 中心', '高质量音乐服务', '韩流粉丝基础']
  },
  {
    name: 'Viberate',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://www.viberate.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Viberate 账号', '创建艺术家页面', '上传音乐作品', '完善艺术家资料', '设置发行信息', '推广作品'],
    tips: ['全球艺术家推广平台', '区块链技术支持', '透明数据统计', '粉丝互动功能']
  },

  // ==================== 音乐分发平台 ====================
  {
    name: 'DistroKid',
    icon: '🎵',
    color: 'from-yellow-500 to-yellow-600',
    url: 'https://distrokid.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 DistroKid 账号', '选择订阅计划', '上传音乐文件和封面', '填写元数据', '选择目标平台', '一键分发'],
    tips: ['无限上传订阅', '一年一次付费', '150+ 平台分发', '快速审核流程']
  },
  {
    name: 'TuneCore',
    icon: '🎵',
    color: 'from-blue-500 to-blue-600',
    url: 'https://www.tunecore.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 TuneCore 账号', '选择分发服务', '上传音乐和封面', '填写完整的元数据', '选择发行平台', '提交并付费'],
    tips: ['专业音乐发行服务', '版权管理服务', '全球平台覆盖', '详细的收益报告']
  },
  {
    name: 'CD Baby',
    icon: '🎵',
    color: 'from-orange-500 to-orange-600',
    url: 'https://www.cdbaby.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 CD Baby 账号', '选择分发选项', '上传音乐和封面', '填写元数据和版权', '选择目标平台', '完成支付并分发'],
    tips: ['老牌音乐发行服务', '一次性付费模式', '全球数字商店覆盖', '实体CD制作服务']
  },
  {
    name: 'LANDR',
    icon: '🎵',
    color: 'from-purple-500 to-purple-600',
    url: 'https://www.landr.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 LANDR 账号', '选择订阅计划', '上传音乐文件', '自动母带处理', '填写元数据', '分发到全球平台'],
    tips: ['AI 母带处理服务', '无限分发', '专业音频工具', '智能发行系统']
  },
  {
    name: 'UnitedMasters',
    icon: '🎵',
    color: 'from-red-500 to-red-600',
    url: 'https://www.unitedmasters.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 UnitedMasters 账号', '连接社交媒体', '上传音乐作品', '填写艺术家信息', '设置发行平台', '一键发布'],
    tips: ['NBA合作的音乐平台', '免费分发服务', '保留90%版权收益', '专业推广工具']
  },
  {
    name: 'AWAL',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://www.awal.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 AWAL 账号', '申请加入', '上传音乐作品', '填写详细信息', '设置发行计划', '全球发行'],
    tips: ['Sony旗下发行服务', '全方位艺术家支持', '数据分析工具', '推广和营销服务']
  },
  {
    name: 'CD Baby Pro',
    icon: '🎵',
    color: 'from-indigo-500 to-indigo-600',
    url: 'https://www.cdbaby.com/pro/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 CD Baby Pro 账号', '上传音乐作品', '提供词曲版权信息', '填写全球版权管理', '设置发行平台', '自动版税收集'],
    tips: ['全球版权管理', '版税自动收集', '专业版权服务', '详细的收益报告']
  },
  {
    name: 'ONErpm',
    icon: '🎵',
    color: 'from-teal-500 to-teal-600',
    url: 'https://www.onerpm.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 ONErpm 账号', '选择发行计划', '上传音乐和封面', '填写元数据', '选择目标平台', '分发音乐'],
    tips: ['全球发行服务', '透明的分成比例', '营销推广工具', '数据分析支持']
  },
  {
    name: 'RouteNote',
    icon: '🎵',
    color: 'from-green-500 to-green-600',
    url: 'https://www.routenote.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 RouteNote 账号', '上传音乐文件', '选择免费或高级计划', '填写元数据和封面', '选择发行平台', '发布音乐'],
    tips: ['免费和付费选项', '全球平台覆盖', '无隐藏费用', '简单的操作流程']
  },
  {
    name: 'Amuse',
    icon: '🎵',
    color: 'from-yellow-600 to-yellow-700',
    url: 'https://www.amuse.io/',
    category: 'aggregator',
    region: '全球',
    steps: ['下载 Amuse App', '注册并认证', '上传音乐作品', '填写详细信息', '选择发行平台', '一键分发'],
    tips: ['移动端友好App', '免费发行服务', '快速审核流程', '独立音乐人首选']
  },
  {
    name: 'Symphonic',
    icon: '🎵',
    color: 'from-violet-600 to-violet-700',
    url: 'https://www.symphonic.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Symphonic 账号', '选择服务级别', '上传音乐和封面', '填写元数据和版权', '选择目标平台', '分发和管理'],
    tips: ['专业发行服务', '版权管理', '营销推广工具', '数据分析支持']
  },
  {
    name: 'Ditto Music',
    icon: '🎵',
    color: 'from-blue-600 to-blue-700',
    url: 'https://www.dittomusic.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Ditto Music 账号', '选择发行计划', '上传音乐文件', '填写元数据', '设置版权信息', '分发到全球平台'],
    tips: ['独立音乐发行', '版权保护服务', '全球覆盖', '专业的支持团队']
  },
  {
    name: 'Record Union',
    icon: '🎵',
    color: 'from-orange-600 to-orange-700',
    url: 'https://www.recordunion.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Record Union 账号', '上传音乐作品', '填写元数据和封面', '设置发行平台', '审核通过后发布', '追踪收益'],
    tips: ['欧洲音乐发行', '透明的费用结构', '全球数字商店覆盖', '简单的操作界面']
  },
  {
    name: 'Songtradr',
    icon: '🎵',
    color: 'from-pink-600 to-pink-700',
    url: 'https://www.songtradr.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Songtradr 账号', '上传音乐作品', '填写详细元数据', '设置版权信息', '选择分发平台', '发布并管理'],
    tips: ['音乐授权平台', '同步授权服务', '全球版权管理', '商业用途授权']
  },
  {
    name: 'TuneControl',
    icon: '🎵',
    color: 'from-cyan-500 to-cyan-600',
    url: 'https://tunecontroldistribution.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 TuneControl 账号', '选择发行计划', '上传音乐文件', '填写元数据', '设置发行平台', '一键分发'],
    tips: ['透明定价', '全球平台覆盖', '版权保护', '实时数据分析']
  },
  {
    name: 'Too Lost',
    icon: '🎵',
    color: 'from-lime-500 to-lime-600',
    url: 'https://www.toolost.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Too Lost 账号', '选择分发计划', '上传音乐和封面', '填写元数据', '选择目标平台', '分发音乐'],
    tips: ['独立音乐发行', '无隐藏费用', '全球覆盖', '版权管理服务']
  },
  {
    name: 'Horus Music',
    icon: '🎵',
    color: 'from-amber-500 to-amber-600',
    url: 'https://www.horusmusic.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Horus Music 账号', '选择发行选项', '上传音乐文件', '填写元数据和版权', '选择发行平台', '发布并管理'],
    tips: ['全球音乐发行', '灵活的定价方案', '版权保护服务', '专业的支持团队']
  },
  {
    name: 'Vydia',
    icon: '🎵',
    color: 'from-sky-500 to-sky-600',
    url: 'https://www.vydia.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Vydia 账号', '上传音乐作品', '填写元数据和版权', '设置发行平台', '版权保护功能', '分发和管理'],
    tips: ['音乐版权保护', 'YouTube Content ID', '全球发行服务', '收入追踪系统']
  },
  {
    name: 'Stem',
    icon: '🎵',
    color: 'from-rose-500 to-rose-600',
    url: 'https://stem.is/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Stem 账号', '创建艺术家档案', '上传音乐作品', '添加合作者信息', '设置分成比例', '分发和管理'],
    tips: ['多合作者分成', '透明的收益分配', '全球发行服务', '版权管理']
  },
  {
    name: 'Spinnup',
    icon: '🎵',
    color: 'from-violet-500 to-violet-600',
    url: 'https://www.spinnup.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Spinnup 账号', '上传音乐作品', '填写元数据', '设置发行平台', '审核通过后发布', '追踪播放数据'],
    tips: ['Spotify旗下发行', '免费分发服务', '简单操作流程', '数据分析工具']
  },
  {
    name: 'Music Gateway',
    icon: '🎵',
    color: 'from-green-600 to-green-700',
    url: 'https://www.musicgateway.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Music Gateway 账号', '选择服务计划', '上传音乐和封面', '填写元数据', '设置发行平台', '分发和管理'],
    tips: ['一站式音乐服务', '营销推广工具', '全球数字发行', '版权保护']
  },
  {
    name: 'Music Gateway Sync',
    icon: '🎵',
    color: 'from-teal-600 to-teal-700',
    url: 'https://www.musicgateway.com/sync',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Music Gateway Sync 账号', '上传音乐作品', '填写同步授权信息', '设置授权范围', '提交审核', '等待商业配对'],
    tips: ['商业音乐授权', '广告/影视配乐', '游戏音乐授权', '品牌合作机会']
  },
  {
    name: 'MusicMatiks',
    icon: '🎵',
    color: 'from-indigo-500 to-indigo-600',
    url: 'https://www.musicmatiks.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 MusicMatiks 账号', '上传音乐作品', '填写元数据', '设置发行平台', '版权信息登记', '分发管理'],
    tips: ['自动化发行服务', '版权登记支持', '全球覆盖', '收益追踪']
  },
  {
    name: 'Munich Records',
    icon: '🎵',
    color: 'from-gray-600 to-gray-700',
    url: 'https://www.munich-records.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Munich Records 账号', '上传音乐作品', '填写详细信息', '设置发行平台', '版权管理', '全球分发'],
    tips: ['欧洲音乐发行', '专业服务', '版权保护', '全球数字覆盖']
  },
  {
    name: 'PIAS',
    icon: '🎵',
    color: 'from-orange-700 to-orange-800',
    url: 'https://www.pias.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 PIAS 账号', '申请加入', '上传音乐作品', '填写元数据和版权', '设置发行计划', '全球发行'],
    tips: ['独立音乐发行商', '全球品牌', '专业支持', '版权管理服务']
  },

  // ==================== 社交和短视频平台 ====================
  {
    name: '抖音',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://creator.douyin.com/',
    category: 'social',
    region: '国内',
    steps: ['注册抖音创作者账号', '完成实名认证', '进入创作者服务中心', '申请音乐人认证', '上传原创音乐', '发布并推广'],
    tips: ['全球最大短视频平台', '音乐病毒式传播', '流量变现机会', '算法推荐强大']
  },
  {
    name: '快手',
    icon: '📹',
    color: 'from-orange-500 to-orange-600',
    url: 'https://creator.kuaishou.com/',
    category: 'social',
    region: '国内',
    steps: ['注册快手创作者账号', '完成身份认证', '进入创作者中心', '申请音乐人认证', '上传原创音乐', '发布作品'],
    tips: ['国内第二大短视频平台', '下沉市场覆盖广', '直播打赏收益', '音乐推广机会']
  },
  {
    name: 'Bilibili',
    icon: '📺',
    color: 'from-pink-600 to-pink-700',
    url: 'https://creator.bilibili.com/',
    category: 'social',
    region: '国内',
    steps: ['注册B站创作者账号', '完成实名认证', '进入创作中心', '申请音乐创作', '上传原创音乐', '发布并与视频结合'],
    tips: ['年轻人文化社区', '弹幕互动特色', '音乐区活跃', 'UP主变现渠道']
  },
  {
    name: '小红书',
    icon: '📕',
    color: 'from-red-500 to-red-600',
    url: 'https://creator.xiaohongshu.com/',
    category: 'social',
    region: '国内',
    steps: ['注册小红书创作者账号', '完成身份认证', '进入创作者中心', '发布音乐内容', '配合图文或视频', '标签和话题推广'],
    tips: ['生活方式分享平台', '种草能力强大', '年轻女性用户多', '音乐+生活方式结合']
  },
  {
    name: 'TikTok',
    icon: '🎵',
    color: 'from-gray-800 to-black',
    url: 'https://www.tiktok.com/creators/',
    category: 'social',
    region: '国际',
    steps: ['注册 TikTok 创作者账号', '完成认证', '进入创作者工具', '上传原创音乐', '设置音乐信息', '配合视频发布'],
    tips: ['全球短视频巨头', '音乐病毒传播', '创作者基金支持', '国际推广最佳平台']
  },
  {
    name: 'Instagram Reels',
    icon: '📷',
    color: 'from-pink-500 to-pink-600',
    url: 'https://business.instagram.com/',
    category: 'social',
    region: '国际',
    steps: ['创建 Instagram 商业账号', '切换到 Reels', '添加音乐到视频', '使用音乐库选择', '发布 Reels', '互动和推广'],
    tips: ['Meta旗下短视频', '全球用户基础', '与Facebook整合', '视觉内容优势']
  },
  {
    name: 'YouTube Shorts',
    icon: '📺',
    color: 'from-red-600 to-red-700',
    url: 'https://www.youtube.com/shorts/',
    category: 'social',
    region: '国际',
    steps: ['创建 YouTube 频道', '启用 Shorts 功能', '上传短视频', '从音乐库选择音乐', '添加标题和标签', '发布 Shorts'],
    tips: ['YouTube 短视频功能', '长视频生态整合', '广告分成机会', '搜索引擎优化']
  },
  {
    name: 'Facebook Reels',
    icon: '👍',
    color: 'from-blue-600 to-blue-700',
    url: 'https://www.facebook.com/creators/',
    category: 'social',
    region: '国际',
    steps: ['创建 Facebook 创作者账号', '启用 Reels 功能', '上传短视频内容', '添加音乐', '编写描述和标签', '发布推广'],
    tips: ['全球最大社交平台', 'Meta生态整合', '广告变现机会', '跨平台推广']
  },

  // ==================== AI 音乐平台 ====================
  {
    name: 'Suno AI',
    icon: '🤖',
    color: 'from-purple-500 to-purple-600',
    url: 'https://suno.ai/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Suno AI 账号', '探索平台功能', '使用 AI 生成音乐', '编辑和调整生成结果', '导出音乐作品', '发布到平台'],
    tips: ['AI 音乐生成先驱', '文字转音乐', '支持多种风格', '音乐创作革命性工具']
  },
  {
    name: 'Udio AI',
    icon: '🎵',
    color: 'from-blue-500 to-blue-600',
    url: 'https://www.udio.com/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Udio AI 账号', '体验 AI 音乐生成', '输入描述生成音乐', '调整音乐参数', '完善作品', '导出和发布'],
    tips: ['AI 音乐生成平台', '高质量音频输出', '多风格支持', '专业音乐制作辅助']
  },
  {
    name: 'Boomy',
    icon: '🎵',
    color: 'from-green-500 to-green-600',
    url: 'https://boomy.com/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Boomy 账号', '选择音乐风格', 'AI 生成音乐', '自定义调整', '提交到流媒体平台', '追踪播放收益'],
    tips: ['AI 音乐创作平台', '一键生成歌曲', '全球平台分发', '播放分成收益']
  },
  {
    name: 'AIVA',
    icon: '🎼',
    color: 'from-yellow-500 to-yellow-600',
    url: 'https://www.aiva.ai/',
    category: 'ai',
    region: '国际',
    steps: ['注册 AIVA 账号', '选择创作模式', 'AI 生成音乐', '编辑和完善作品', '导出不同格式', '用于商业或创作'],
    tips: ['AI 音乐作曲助手', '专业作曲家工具', '电影/游戏配乐', '版权清晰']
  },
  {
    name: 'Soundraw',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://soundraw.io/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Soundraw 账号', '选择音乐类型', '自定义参数生成', '编辑和混音', '下载授权', '用于项目'],
    tips: ['AI 音乐生成工具', '免版权音乐库', '商业授权明确', '视频/内容创作者首选']
  },
  {
    name: 'Loudly',
    icon: '🎵',
    color: 'from-violet-500 to-violet-600',
    url: 'https://www.loudly.com/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Loudly 账号', '体验 AI 音乐生成', '选择风格和情绪', '自定义生成参数', '导出作品', '商业授权使用'],
    tips: ['AI 音乐生成服务', '品牌音乐定制', '高质量音频', '全球发行支持']
  },
  {
    name: 'Amadeus Code',
    icon: '🎹',
    color: 'from-teal-500 to-teal-600',
    url: 'https://amadeuscode.com/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Amadeus Code 账号', 'AI 辅助作曲', '探索和弦进行', '生成旋律和伴奏', '导出项目', '继续完善创作'],
    tips: ['AI 作曲辅助工具', '和弦进行推荐', '旋律生成', '音乐教育用途']
  },
  {
    name: 'Ecrett Music',
    icon: '🎵',
    color: 'from-orange-500 to-orange-600',
    url: 'https://ecrettmusic.com/',
    category: 'ai',
    region: '国际',
    steps: ['注册 Ecrett Music 账号', '选择场景和情绪', 'AI 生成背景音乐', '自定义编辑', '下载无版权音乐', '用于视频/内容'],
    tips: ['免版权 AI 音乐', '适合视频创作者', '多场景音乐库', '商业使用安全']
  },

  // ==================== 其他专业平台 ====================
  {
    name: 'Soundtracks',
    icon: '🎬',
    color: 'from-purple-600 to-purple-700',
    url: 'https://soundtracks.io/',
    category: 'international',
    region: '国际',
    steps: ['注册 Soundtracks 账号', '上传原创音乐', '填写详细的元数据', '设置授权信息', '等待品牌配对', '获得商业授权收益'],
    tips: ['品牌音乐授权平台', '商业用途配对', '透明收益分成', '高质量独立音乐优先']
  },
  {
    name: 'Musicbed',
    icon: '🎵',
    color: 'from-gray-600 to-gray-700',
    url: 'https://www.musicbed.com/',
    category: 'international',
    region: '国际',
    steps: ['申请加入 Musicbed', '提交作品集', '审核通过后入驻', '上传音乐作品', '设置授权价格', '等待客户购买'],
    tips: ['高品质音乐授权', '影视制作首选', '严格的艺术家审核', '高收益分成']
  },
  {
    name: 'Epidemic Sound',
    icon: '🎵',
    color: 'from-blue-600 to-blue-700',
    url: 'https://www.epidemicsound.com/',
    category: 'international',
    region: '国际',
    steps: ['申请加入 Epidemic Sound', '提交高质量音乐', '审核通过', '上传作品到平台', '设置授权选项', '基于使用量获得收益'],
    tips: ['内容创作者音乐库', '免版权音乐服务', '高收益分成', '全球内容创作者覆盖']
  },
  {
    name: 'Artlist',
    icon: '🎵',
    color: 'from-orange-600 to-orange-700',
    url: 'https://artlist.io/',
    category: 'international',
    region: '国际',
    steps: ['申请成为 Artlist 艺术家', '提交原创音乐作品', '审核通过后入驻', '上传高质量音乐', '设置授权范围', '基于许可证获得收益'],
    tips: ['视频创作者音乐库', '一次性授权模式', '永久使用授权', '独立音乐人支持']
  },
  {
    name: 'Songtradr Sync',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://www.songtradr.com/sync',
    category: 'international',
    region: '国际',
    steps: ['注册 Songtradr Sync 账号', '上传原创音乐', '填写同步授权信息', '设置授权范围和价格', '等待商业配对', '获得授权收益'],
    tips: ['商业音乐授权平台', '影视/广告/游戏', '透明定价', '全球品牌覆盖']
  },
  {
    name: 'Music Gateway Sync',
    icon: '🎵',
    color: 'from-green-500 to-green-600',
    url: 'https://www.musicgateway.com/sync',
    category: 'international',
    region: '国际',
    steps: ['注册 Music Gateway Sync 账号', '上传音乐用于同步', '填写详细的授权信息', '设置授权范围', '提交审核', '等待商业配对机会'],
    tips: ['同步授权服务', '广告/影视/游戏', '品牌合作机会', '全球发行']
  },
  {
    name: ' licensing International',
    icon: '🎵',
    color: 'from-indigo-500 to-indigo-600',
    url: 'https://www.licensinginternational.org/',
    category: 'international',
    region: '国际',
    steps: ['了解 licensing 要求', '准备音乐作品', '注册 licensing 平台', '提交音乐和授权信息', '设置授权条款', '等待商业合作'],
    tips: ['国际版权授权', '品牌合作机会', '专业版权管理', '全球市场覆盖']
  },
  {
    name: 'Media Rights Corporation',
    icon: '🎵',
    color: 'from-teal-600 to-teal-700',
    url: 'https://www.mediarights.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 MRC 账号', '提交原创音乐', '进行版权登记', '设置授权信息', '等待内容识别', '获得版权收益'],
    tips: ['内容识别技术', 'YouTube 版权管理', '全球版权保护', '收益追踪系统']
  },
  {
    name: 'Audiam',
    icon: '🎵',
    color: 'from-yellow-600 to-yellow-700',
    url: 'https://www.audiam.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Audiam 账号', '提交音乐作品', '进行版权匹配', '设置授权追踪', '监控播放数据', '获得版权收益'],
    tips: ['YouTube 版权管理', '自动版权匹配', '全球版权收集', '收益最大化']
  },
  {
    name: 'Songtrust',
    icon: '🎵',
    color: 'from-blue-500 to-blue-600',
    url: 'https://www.songtrust.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Songtrust 账号', '提交词曲版权', '全球版权管理', '收集全球版税', '设置版权追踪', '获得详细的收益报告'],
    tips: ['词曲版权管理', '全球版税收集', '超过100个国家', '专业的版权服务']
  },
  {
    name: 'BMI',
    icon: '🎵',
    color: 'from-red-600 to-red-700',
    url: 'https://www.bmi.com/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 BMI', '注册词曲版权', '提交作品信息', 'BMI 代收取版税', '获得收益分成', '使用 BMI 工具管理'],
    tips: ['美国最大的表演权组织', '表演版权管理', '现场演出版税', '全球网络覆盖']
  },
  {
    name: 'ASCAP',
    icon: '🎵',
    color: 'from-blue-700 to-blue-800',
    url: 'https://www.ascap.com/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 ASCAP', '注册词曲版权', '提交作品信息', 'ASCAP 代收取版税', '获得收益分成', '使用平台工具管理'],
    tips: ['美国领先表演权组织', '词曲版权保护', '现场演出版税', '全球版税收集网络']
  },
  {
    name: 'SESAC',
    icon: '🎵',
    color: 'from-gray-700 to-gray-800',
    url: 'https://www.sesac.com/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 SESAC', '提交高质量作品', '审核通过后入驻', '注册版权信息', 'SESAC 代收取版税', '获得专业支持'],
    tips: ['精英版权组织', '高端音乐人支持', '个性化服务', '全球版权保护']
  },
  {
    name: 'PRS for Music',
    icon: '🎵',
    color: 'from-red-600 to-red-700',
    url: 'https://www.prsformusic.com/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 PRS', '注册词曲版权', '提交作品信息', 'PRS 代收取版税', '获得英国及全球版税', '使用管理工具'],
    tips: ['英国最大版权组织', '欧洲版权保护', '全球版税收集', '专业的版权服务']
  },
  {
    name: 'GEMA',
    icon: '🎵',
    color: 'from-yellow-600 to-yellow-700',
    url: 'https://www.gema.de/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 GEMA', '注册德国版权', '提交作品信息', 'GEMA 代收取版税', '获得德国及欧洲版税', '版权管理服务'],
    tips: ['德国最大版权组织', '欧洲版权保护', '全球版税网络', '专业的版权管理']
  },
  {
    name: 'SACEM',
    icon: '🎵',
    color: 'from-orange-600 to-orange-700',
    url: 'https://www.sacem.fr/',
    category: 'aggregator',
    region: '国际',
    steps: ['申请加入 SACEM', '注册法国版权', '提交作品信息', 'SACEM 代收取版税', '获得法国及法语区版税', '版权保护服务'],
    tips: ['法国最大版权组织', '法语区版权保护', '全球版税收集', '文化支持项目']
  },

  // ==================== 垂直细分平台 ====================
  {
    name: 'Gaana',
    icon: '🎵',
    color: 'from-orange-500 to-orange-600',
    url: 'https://gaana.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Gaana 账号', '申请成为艺术家', '上传音乐作品', '填写详细信息', '设置发行信息', '发布到印度市场'],
    tips: ['印度最大音乐平台', ' Bollywood 音乐丰富', '印度市场覆盖', '多语言支持']
  },
  {
    name: 'JioSaavn',
    icon: '🎵',
    color: 'from-red-500 to-red-600',
    url: 'https://www.jiosaavn.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 JioSaavn 账号', '申请艺术家入驻', '上传音乐作品', '填写元数据', '设置发行日期', '发布到印度市场'],
    tips: ['印度领先音乐平台', '区域音乐丰富', 'Jio 生态系统整合', '移动端用户多']
  },
  {
    name: 'Anghami',
    icon: '🎵',
    color: 'from-purple-500 to-purple-600',
    url: 'https://www.anghami.com/artists',
    category: 'international',
    region: '国际',
    steps: ['注册 Anghami 账号', '申请成为艺术家', '上传音乐作品', '添加艺术家资料', '设置发行信息', '发布并推广'],
    tips: ['中东和北非最大平台', '阿拉伯音乐中心', '多语言支持', '区域推广优势']
  },
  {
    name: 'Boomplay',
    icon: '🎵',
    color: 'from-orange-500 to-orange-600',
    url: 'https://www.boomplay.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Boomplay 账号', '申请音乐人认证', '上传音乐作品', '填写详细信息', '设置发行信息', '发布到非洲市场'],
    tips: ['非洲最大音乐平台', '法语非洲覆盖广', '本地化支持', '快速增长的流媒体市场']
  },
  {
    name: 'Mdundo',
    icon: '🎵',
    color: 'from-green-500 to-green-600',
    url: 'https://www.mdundo.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Mdundo 账号', '申请成为艺术家', '上传音乐作品', '填写详细信息', '设置发行信息', '发布到非洲市场'],
    tips: ['非洲音乐平台', '本地艺术家支持', '东非市场覆盖', '免费音乐服务']
  },
  {
    name: 'MusicTime',
    icon: '🎵',
    color: 'from-teal-500 to-teal-600',
    url: 'https://musictime.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 MusicTime 账号', '上传原创音乐', '填写元数据', '设置授权信息', '分发到平台', '追踪收益'],
    tips: ['免版权音乐服务', '基于使用的定价', '内容创作者友好', '商业使用安全']
  },
  {
    name: 'Beatport',
    icon: '🎧',
    color: 'from-blue-600 to-blue-700',
    url: 'https://www.beatport.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Beatport 账号', '申请成为艺术家', '上传电子音乐', '填写详细信息', '设置发行信息', '发布到电子音乐市场'],
    tips: ['电子音乐专业平台', 'DJ 市场领先', '舞曲发行首选', '高质量电子音乐库']
  },
  {
    name: 'Traxsource',
    icon: '🎧',
    color: 'from-purple-600 to-purple-700',
    url: 'https://www.traxsource.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Traxsource 账号', '申请成为艺术家', '上传电子/浩室音乐', '填写详细信息', '设置发行信息', '发布到舞曲市场'],
    tips: ['电子/浩室音乐平台', 'DJ 和制作人社区', '舞曲发行专家', '高质量舞曲库']
  },
  {
    name: 'Bandzoogle',
    icon: '🎵',
    color: 'from-green-600 to-green-700',
    url: 'https://www.bandzoogle.com/',
    category: 'international',
    region: '国际',
    steps: ['注册 Bandzoogle 账号', '创建艺术家网站', '上传音乐作品', '设置直接销售', '添加粉丝功能', '独立运营'],
    tips: ['独立音乐人网站构建', '直销音乐和周边', '粉丝管理工具', '无平台费用']
  },
  {
    name: 'Music Gateway',
    icon: '🎵',
    color: 'from-orange-500 to-orange-600',
    url: 'https://www.musicgateway.com/',
    category: 'aggregator',
    region: '全球',
    steps: ['注册 Music Gateway 账号', '选择服务计划', '上传音乐和封面', '填写元数据', '设置发行平台', '分发和管理'],
    tips: ['一站式音乐服务', '营销推广工具', '全球数字发行', '版权保护']
  },
  {
    name: 'VIRGE',
    icon: '🎵',
    color: 'from-pink-500 to-pink-600',
    url: 'https://www.virge.io/',
    category: 'ai',
    region: '国际',
    steps: ['注册 VIRGE 账号', '体验 AI 音乐生成', '选择音乐风格', '自定义参数', '生成音乐作品', '导出和商业使用'],
    tips: ['AI 音乐创作工具', '专业音频质量', '多风格支持', '商业授权明确']
  },
  {
    name: 'BANDIER',
    icon: '🎵',
    color: 'from-violet-500 to-violet-600',
    url: 'https://bandier.co/',
    category: 'international',
    region: '国际',
    steps: ['了解 BANDIER 平台', '准备高质量音乐', '提交作品申请', '等待审核', '通过后入驻', '发布和推广'],
    tips: ['高端音乐授权', '时尚品牌合作', '精品音乐库', '专业艺术家支持']
  }
];

export const platformCategories = {
  china: { name: '🇨🇳 国内平台', description: '中国主流音乐平台' },
  international: { name: '🌍 国际平台', description: '全球知名音乐流媒体服务' },
  aggregator: { name: '📦 分发平台', description: '数字音乐发行和版权管理' },
  social: { name: '📱 社交/短视频', description: '社交媒体和短视频平台' },
  podcast: { name: '🎙️ 播客/有声', description: '播客和有声内容平台' },
  ai: { name: '🤖 AI 音乐', description: '人工智能音乐生成平台' }
};
