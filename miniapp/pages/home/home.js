// pages/home/home.js
const app = getApp();

Page({
  data: {
    
  },

  onLoad() {
    console.log('首页加载');
  },

  goToCreate() {
    wx.switchTab({
      url: '/pages/create/create'
    });
  },

  goToGuide() {
    wx.switchTab({
      url: '/pages/guide/guide'
    });
  }
})
