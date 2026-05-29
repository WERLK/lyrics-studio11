# 🎵 歌词工坊 - 微信小程序开发指南

## 📱 小程序简介

歌词工坊微信小程序是网页版的移动端适配版本，让用户可以在微信内直接使用歌词创作功能。

## 🚀 快速开始

### 第一步：获取 AppID

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 注册小程序账号
3. 获取 AppID（必须）

### 第二步：下载开发者工具

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 安装并登录

### 第三步：导入项目

1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择项目目录：`/workspace/miniapp`
4. 填写 AppID（必须）
5. 点击"确定"

### 第四步：配置 AppID

编辑 `project.config.json`，将 `__REPLACE_WITH_YOUR_APPID__` 替换为你的真实 AppID：

```json
{
  "appid": "wx1234567890abcdef"
}
```

### 第五步：开发调试

1. 点击"编译"按钮
2. 在模拟器或真机上预览
3. 使用开发者工具进行调试

## 📁 项目结构

```
miniapp/
├── app.js              # 小程序主逻辑
├── app.json            # 小程序配置
├── app.wxss            # 小程序全局样式
├── sitemap.json        # SEO 配置
├── project.config.json # 项目配置
├── pages/              # 页面目录
│   ├── home/          # 首页
│   ├── create/        # 创作页
│   ├── guide/         # 平台指南页
│   └── download/      # 下载页
├── assets/            # 资源目录
│   └── images/        # 图片资源
├── components/        # 组件目录
└── utils/            # 工具函数
```

## 🎯 页面说明

### 1. 首页 (home)

- 展示产品介绍和功能特点
- 快速入口跳转到创作页面
- 展示支持的平台列表

### 2. 创作页 (create)

- 输入歌词主题
- 选择音乐风格（流行/摇滚/民谣/说唱/电子/古风）
- 选择歌词情绪（欢快/忧伤/激昂/温柔/励志/怀旧）
- 选择歌词长度（短篇/中篇/长篇）
- 生成歌词
- 编辑和保存歌词

### 3. 平台指南页 (guide)

- 展示各大音乐平台上传指南
- 提供平台访问链接
- 上传步骤说明

### 4. 下载页 (download)

- 桌面版下载指引
- 在线使用说明
- 小程序本身入口（本页面）
- 自定义构建说明

## 🔧 功能实现

### 歌词生成

在小程序中，歌词生成使用预设模板模拟：

```javascript
// pages/create/create.js
generateMockLyrics() {
  const templates = [
    '在这个城市里\n我寻找你的身影\n每一次心跳\n都是你的回应',
    '星光点点\n照亮前行的路\n梦想在远方\n我们一起追逐',
    '微风轻轻吹过\n带走了思念\n在这月光下\n我们许下心愿'
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}
```

### 本地存储

使用微信小程序的 Storage API 保存历史记录：

```javascript
// 保存
wx.setStorageSync('lyrics_history', history);

// 读取
const history = wx.getStorageSync('lyrics_history') || [];
```

## 🎨 样式指南

### 颜色主题

```css
/* 主色调 */
background: #0d0d1a;        /* 深紫黑背景 */
color: #8b5cf6;            /* 紫色强调色 */
color: #ec4899;            /* 粉色强调色 */

/* 文字颜色 */
color: #ffffff;            /* 主文字 */
color: rgba(255,255,255,0.7); /* 次要文字 */
color: rgba(255,255,255,0.5); /* 辅助文字 */
```

### 圆角和间距

```css
/* 卡片圆角 */
border-radius: 20rpx;

/* 按钮圆角 */
border-radius: 50rpx;

/* 内边距 */
padding: 30rpx;

/* 元素间距 */
margin-bottom: 20rpx;
```

## 📱 适配说明

### 尺寸单位

微信小程序使用 rpx 作为尺寸单位，750rpx = 屏幕宽度，能够自动适配不同屏幕尺寸。

### 安全区域

考虑到 iPhone 等设备的刘海屏和 Home Indicator，需要为页面添加适当的安全区域适配。

## 🐛 常见问题

### Q1: 编译失败，提示 app.json 错误

检查 `app.json` 配置是否正确，确保：
- pages 路径存在
- tabBar 配置正确
- 页面文件完整

### Q2: AppID 无效

确保已替换为真实的 AppID，且该 AppID 已通过微信公众平台注册。

### Q3: 真机调试失败

1. 检查开发者是否已加入小程序的体验成员
2. 确保手机已开启开发者模式
3. 检查网络连接

## 🚀 发布上线

### 1. 版本管理

在微信开发者工具中，点击"上传"按钮，上传代码并填写版本号和备注。

### 2. 提交审核

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入"版本管理"
3. 选择提交审核的版本
4. 填写功能页面信息
5. 提交审核

### 3. 审核周期

通常 1-7 个工作日，审核通过后即可发布。

### 4. 发布上线

审核通过后，在管理后台点击"发布"即可正式上线。

## 🔗 相关资源

- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [小程序代码示例](https://github.com/wechat-miniprogram/miniprogram-demo)

## 💡 优化建议

### 性能优化

1. 使用分包加载，减少主包体积
2. 合理使用 setData，避免频繁更新
3. 图片资源压缩和懒加载
4. 使用骨架屏提升加载体验

### 用户体验

1. 添加加载状态提示
2. 操作反馈（Toast/Modal）
3. 空状态展示
4. 错误处理和重试机制

### 功能扩展

1. 接入真实的歌词生成 API
2. 添加用户登录和云存储
3. 实现歌词分享功能
4. 添加音乐播放功能

## 📞 技术支持

如遇问题，请：

1. 查看微信小程序官方文档
2. 在开发者社区提问
3. 检查代码是否有语法错误

---

**祝你开发顺利！** 🎵✨
