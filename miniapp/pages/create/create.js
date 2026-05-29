// pages/create/create.js
const app = getApp();

Page({
  data: {
    theme: '',
    style: 'pop',
    mood: 'happy',
    length: 'medium',
    lyrics: '',
    editingLyrics: '',
    generating: false,
    
    styles: [
      { value: 'pop', label: '流行' },
      { value: 'rock', label: '摇滚' },
      { value: 'folk', label: '民谣' },
      { value: 'rap', label: '说唱' },
      { value: 'electronic', label: '电子' },
      { value: 'ancient', label: '古风' }
    ],
    
    moods: [
      { value: 'happy', label: '欢快' },
      { value: 'sad', label: '忧伤' },
      { value: 'passionate', label: '激昂' },
      { value: 'gentle', label: '温柔' },
      { value: 'inspirational', label: '励志' },
      { value: 'nostalgic', label: '怀旧' }
    ],
    
    lengths: [
      { value: 'short', label: '短篇 (16句)' },
      { value: 'medium', label: '中篇 (32句)' },
      { value: 'long', label: '长篇 (48句)' }
    ],
    
    currentStyle: { value: 'pop', label: '流行' },
    currentMood: { value: 'happy', label: '欢快' },
    currentLength: { value: 'medium', label: '中篇 (32句)' }
  },

  onLoad() {
    console.log('创作页面加载');
  },

  onThemeInput(e) {
    this.setData({
      theme: e.detail.value
    });
    app.setGlobalParams({ theme: e.detail.value });
  },

  onStyleChange(e) {
    const index = e.detail.value;
    const style = this.data.styles[index];
    this.setData({
      currentStyle: style,
      style: style.value
    });
    app.setGlobalParams({ style: style.value });
  },

  onMoodChange(e) {
    const index = e.detail.value;
    const mood = this.data.moods[index];
    this.setData({
      currentMood: mood,
      mood: mood.value
    });
    app.setGlobalParams({ mood: mood.value });
  },

  onLengthChange(e) {
    const index = e.detail.value;
    const length = this.data.lengths[index];
    this.setData({
      currentLength: length,
      length: length.value
    });
    app.setGlobalParams({ length: length.value });
  },

  async generateLyrics() {
    if (!this.data.theme) {
      wx.showToast({
        title: '请输入歌词主题',
        icon: 'none'
      });
      return;
    }

    this.setData({ generating: true });

    // 模拟歌词生成
    await new Promise(resolve => setTimeout(resolve, 2000));

    const lyrics = this.generateMockLyrics();
    
    this.setData({
      lyrics,
      editingLyrics: lyrics,
      generating: false
    });
  },

  generateMockLyrics() {
    const templates = [
      '在这个城市里\n我寻找你的身影\n每一次心跳\n都是你的回应',
      '星光点点\n照亮前行的路\n梦想在远方\n我们一起追逐',
      '微风轻轻吹过\n带走了思念\n在这月光下\n我们许下心愿'
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  },

  onLyricsInput(e) {
    this.setData({
      editingLyrics: e.detail.value
    });
  },

  copyLyrics() {
    wx.setClipboardData({
      data: this.data.editingLyrics,
      success() {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        });
      }
    });
  },

  saveLyrics() {
    const history = wx.getStorageSync('lyrics_history') || [];
    const newItem = {
      id: Date.now(),
      theme: this.data.theme,
      style: this.data.style,
      mood: this.data.mood,
      length: this.data.length,
      content: this.data.lyrics,
      createdAt: Date.now()
    };
    
    history.unshift(newItem);
    wx.setStorageSync('lyrics_history', history.slice(0, 50));
    
    wx.showToast({
      title: '已保存',
      icon: 'success'
    });
  },

  clearLyrics() {
    this.setData({
      lyrics: '',
      editingLyrics: ''
    });
  }
})
