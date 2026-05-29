// pages/download/download.js
Page({
  data: {
    
  },

  onLoad() {
    console.log('下载页面加载');
  },

  showDesktopGuide() {
    wx.showModal({
      title: '获取桌面版',
      content: '请访问歌词工坊官网或联系开发者获取桌面版安装包。\n\n构建说明：\n1. 确保已安装 Node.js\n2. 运行 npm install\n3. 运行 npm run dist:win\n4. 在 release/win-unpacked/ 目录找到安装包',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  copyWebUrl() {
    const url = 'https://lyrics-studio.example.com';
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({
          title: '网址已复制',
          icon: 'success'
        });
      }
    });
  }
})
