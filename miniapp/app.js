// app.js
App({
  onLaunch() {
    console.log('歌词工坊小程序启动');
  },
  
  globalData: {
    userInfo: null,
    theme: '',
    style: 'pop',
    mood: 'happy',
    length: 'medium'
  },
  
  setGlobalParams(params) {
    this.globalData = { ...this.globalData, ...params };
  },
  
  getGlobalParams() {
    return this.globalData;
  }
})
