// pages/guide/guide.js
Page({
  data: {
    platforms: [
      {
        name: '网易云音乐',
        icon: '🎵',
        desc: '中国领先的在线音乐平台',
        url: 'https://music.163.com/st/musician',
        steps: '1. 注册音乐人账号\n2. 上传音频文件\n3. 填写作品信息\n4. 提交审核'
      },
      {
        name: 'QQ音乐',
        icon: '🎶',
        desc: '腾讯旗下音乐平台',
        url: 'https://y.qq.com/studio/artist',
        steps: '1. 认证音乐人\n2. 上传作品\n3. 填写信息\n4. 等待审核'
      },
      {
        name: '汽水音乐',
        icon: '🥤',
        desc: '抖音官方音乐平台',
        url: 'https://music.soda.net.cn',
        steps: '1. 下载汽水音乐\n2. 注册并认证\n3. 上传作品\n4. 发布分享'
      },
      {
        name: '番茄音乐',
        icon: '🍅',
        desc: '字节跳动旗下平台',
        url: 'https://music.fanqie.com/creator',
        steps: '1. 注册创作者\n2. 认证身份\n3. 上传作品\n4. 获取收益'
      },
      {
        name: 'Spotify',
        icon: '🎧',
        desc: '全球领先音乐流媒体',
        url: 'https://artists.spotify.com',
        steps: '1. 通过分销商注册\n2. 上传音乐文件\n3. 设置元数据\n4. 全球发行'
      },
      {
        name: 'Apple Music',
        icon: '🍎',
        desc: '苹果公司音乐服务',
        url: 'https://artists.apple.com',
        steps: '1. 注册音乐人\n2. 使用分销商\n3. 上传音频\n4. 发布全球'
      }
    ]
  },

  onLoad() {
    console.log('指南页面加载');
  },

  openPlatform(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  }
})
