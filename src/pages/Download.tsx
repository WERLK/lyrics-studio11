import { Link } from 'react-router-dom';
import { Download, Monitor, Smartphone, ArrowLeft, Box, Zap, Shield, Globe, Tablet, Code, CheckCircle, FileCode, Package, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';

const AppleIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const AndroidIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.527.527 0 01-.524.523.527.527 0 01-.525-.523v-3.511a.527.527 0 01.525-.523.527.527 0 01.524.523v3.511zm-11.046 0a.527.527 0 01-.524.523.527.527 0 01-.525-.523v-3.511a.527.527 0 01.525-.523.527.527 0 01.524.523v3.511zM21.75 7.5a.75.75 0 01-.744.661l-1.854-.185-.186-1.85a.75.75 0 111.481-.24l.26 2.614h1.543a.75.75 0 01.744.833l-.083.185-1.161 2.87a.75.75 0 01-1.414-.002l-.26-2.613H15.95v2.613a.75.75 0 01-1.35.375l-2.65-2.613-.26 2.613a.75.75 0 11-1.35-.375V6.625a.75.75 0 011.5-.1v1.852l2.7-.27 1.854.185a.75.75 0 01-.075 1.49l-2.025-.202-.186 1.85a.75.75 0 11-1.481-.24l.26-2.613H8.1v2.613a.75.75 0 01-1.35.375l-2.65-2.613-.26 2.613a.75.75 0 11-1.414-.002l-1.161-2.87-.083-.185a.75.75 0 01.744-.833h1.543l.26-2.614a.75.75 0 111.481.24l-.186 1.85-1.854-.185a.75.75 0 01-.661-.744.75.75 0 01.661-.811l1.854.186.186-1.85A.75.75 0 113.39 3.09l-.26 2.614H1.35a.75.75 0 01-.744-.833l.083-.185 1.161-2.87a.75.75 0 111.414.002l.26 2.613h3.15V3.09a.75.75 0 111.5-.1v1.852l2.7-.27 1.854.185a.75.75 0 01-.075 1.49l-2.025-.202-.186 1.85a.75.75 0 11-1.481-.24l.26-2.613h3.15V3.09a.75.75 0 011.5-.1v1.852l2.7-.27 1.854.185a.75.75 0 01-.075 1.49l-2.025-.202-.186 1.85a.75.75 0 11-1.481-.24l.26-2.613h1.543l.26 2.614a.75.75 0 11-1.481.24l-.186-1.85-1.854.185a.75.75 0 01-.661-.811.75.75 0 01.661-.744l1.854-.186.186 1.85a.75.75 0 11-1.481.24l-.26-2.614h3.15v2.613a.75.75 0 01-1.35.375l-2.65-2.613-.26 2.613a.75.75 0 11-1.414-.002l-1.161-2.87-.083-.185A.75.75 0 015.25 3.5h1.543l.26 2.614a.75.75 0 11-1.481.24l-.186-1.85-1.854-.185A.75.75 0 012.25 4.3l.186 1.85-1.854.186A.75.75 0 012.25 7.5zm-9-3a2.25 2.25 0 00-2.25 2.25v7.5A2.25 2.25 0 007.25 21h9.5a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0016.75 4.5h-9.5z"/>
  </svg>
);

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            返回创作
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            下载歌词工坊
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-purple-200/70 max-w-2xl">
            选择最适合你的平台，随时随地创作歌词
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Desktop App */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 sm:p-8 border border-purple-500/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-purple-500/30">
              <Monitor className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">桌面版</h2>
            <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
              Windows 原生应用，无需浏览器，直接运行，性能更优
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <span className="text-blue-400 font-bold">WIN</span>
                Windows 10/11
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Box className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                约 150 MB
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                安全无广告
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button className="w-full" size="md">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Windows 安装包
              </Button>
              <p className="text-xs text-center text-purple-300/50">
                安装包 .exe（推荐）
              </p>
            </div>
          </div>

          {/* iOS App */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 sm:p-8 border border-blue-500/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/30">
              <AppleIcon />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">iOS App</h2>
            <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
              iPhone 和 iPad 原生应用，随时随地创作歌词
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                配置完成 - 可构建
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                iOS 14.0+
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                需要 macOS 构建
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button variant="primary" className="w-full" size="md">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                查看构建指南
              </Button>
              <p className="text-xs text-center text-purple-300/50">
                使用 Capacitor 构建
              </p>
            </div>
          </div>

          {/* Android App */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 sm:p-8 border border-green-500/20 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-green-500/30">
              <AndroidIcon />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Android App</h2>
            <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
              安卓手机和平板原生应用，随时随地创作歌词
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                配置完成 - 可构建
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                Android 6.0+
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-purple-200/60">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                多平台支持
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button variant="primary" className="w-full" size="md">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                查看构建指南
              </Button>
              <p className="text-xs text-center text-purple-300/50">
                使用 Capacitor 构建
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Section */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 sm:p-8 border border-blue-500/20 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
            <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            移动端适配
          </h2>
          
          <p className="text-base sm:text-lg text-purple-200/70 mb-6">
            歌词工坊已完美适配移动端，无论你使用手机，平板还是电脑，都能获得流畅的创作体验
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="bg-white/5 rounded-xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">手机端优化</h3>
              <p className="text-xs sm:text-sm text-purple-200/60">
                响应式布局，触摸友好，适合移动创作场景
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <Tablet className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">平板适配</h3>
              <p className="text-xs sm:text-sm text-purple-200/60">
                大屏优化，充分利用屏幕空间，多列布局
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">PC 端体验</h3>
              <p className="text-xs sm:text-sm text-purple-200/60">
                桌面端完整功能，大屏创作更高效
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              响应式断点
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">320px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">超小屏</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">640px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">小屏</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">768px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">平板</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">1024px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">小桌面</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">1280px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">桌面</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">1536px</div>
                <div className="text-xs sm:text-sm text-purple-200/60">大屏</div>
              </div>
            </div>
          </div>
        </div>

        {/* Web Version */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl p-6 sm:p-8 border border-cyan-500/20 mb-8 sm:mb-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0">
              <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">在线使用</h2>
              <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
                无需下载，打开浏览器即可使用，随时随地创作，支持所有现代浏览器
              </p>
              
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  Chrome / Safari / Edge
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  即开即用
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  数据本地保存
                </div>
              </div>

              <Link to="/">
                <Button variant="secondary" size="md">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  立即使用
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mini Program */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 sm:p-8 border border-green-500/20 mb-8 sm:mb-12">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
              <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">微信小程序</h2>
              <p className="text-sm sm:text-base text-purple-200/70 mb-4 sm:mb-6">
                微信内直接使用，扫码即开，方便快捷，适合移动创作
              </p>
              
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  微信内置
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  秒开即用
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-200/60">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  无需安装
                </div>
              </div>

              <Button variant="secondary" size="md">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                即将上线
              </Button>
            </div>
          </div>
        </div>

        {/* Build Instructions */}
        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
            <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            移动应用构建
          </h2>
          
          <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
            {/* Android Build */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 sm:p-6 border border-green-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                <AndroidIcon />
                Android 应用构建
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">前置要求</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-purple-200/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      Node.js 18.x 或更高版本
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      Android Studio（可选）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      Android SDK（Android Studio 内置）
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">快速构建</h4>
                  <code className="block text-xs sm:text-sm text-green-400 bg-black/50 p-3 rounded">
                    # 一键构建 Android<br/>
                    ./build-mobile.sh<br/><br/>
                    # 或手动构建<br/>
                    cd android<br/>
                    ./gradlew assembleDebug<br/><br/>
                    # APK 位置<br/>
                    android/app/build/outputs/apk/debug/
                  </code>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-500/20">
                <p className="text-xs sm:text-sm text-purple-200/60">
                  💡 <strong className="text-white">提示：</strong>构建完成后，将 APK 文件传输到手机即可安装使用
                </p>
              </div>
            </div>

            {/* iOS Build */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 sm:p-6 border border-blue-500/20">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <AppleIcon />
                iOS 应用构建
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">前置要求</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-purple-200/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      macOS 操作系统
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      Xcode 最新版本
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      Apple Developer 账号（发布用）
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">构建步骤</h4>
                  <code className="block text-xs sm:text-sm text-blue-400 bg-black/50 p-3 rounded">
                    # 使用 Xcode 打开<br/>
                    open ios/App/App.xcworkspace<br/><br/>
                    # 或命令行构建<br/>
                    cd ios<br/>
                    xcodebuild -workspace App.xcworkspace<br/>
                    -scheme App -configuration Release build
                  </code>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-500/20">
                <p className="text-xs sm:text-sm text-purple-200/60">
                  💡 <strong className="text-white">提示：</strong>iOS 构建需要在 macOS 上进行，可在 Xcode 中直接运行到设备或导出 IPA
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-3 sm:mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5 sm:w-6 sm:h-6" />
              项目已配置完成
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="font-semibold text-green-400 mb-1 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Android
                </div>
                <code className="text-xs text-purple-300/60 block">android/ 目录已创建</code>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="font-semibold text-blue-400 mb-1 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  iOS
                </div>
                <code className="text-xs text-purple-300/60 block">ios/ 目录已创建</code>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="font-semibold text-purple-400 mb-1 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  构建脚本
                </div>
                <code className="text-xs text-purple-300/60 block">build-mobile.sh</code>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <div className="font-semibold text-cyan-400 mb-1 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  指南文档
                </div>
                <code className="text-xs text-purple-300/60 block">MOBILE-BUILD-GUIDE.md</code>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">相关资源</h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/guide"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-purple-200 text-sm sm:text-base"
            >
              📚 音乐平台上传指南
            </Link>
            <a
              href="/workspace/BUILD-GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-purple-200 text-sm sm:text-base"
            >
              🖥️ 桌面应用构建
            </a>
            <a
              href="/workspace/MOBILE-BUILD-GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:from-green-500/20 hover:to-emerald-500/20 transition-all text-green-200 text-sm sm:text-base"
            >
              📱 移动应用构建
            </a>
            <a
              href="/workspace/GITHUB-DEPLOY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-purple-200 text-sm sm:text-base"
            >
              🌐 GitHub Pages 部署
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
