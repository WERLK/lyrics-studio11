# 📱 歌词工坊 - 移动应用构建指南

> 使用 Capacitor 将 Web 应用转换为原生 iOS 和 Android 应用

---

## 🎉 恭喜！项目已配置完成

歌词工坊已成功配置为可构建 iOS 和 Android 原生应用！

---

## 📋 当前状态

✅ **Web 应用** - 已构建  
✅ **Capacitor 配置** - 已完成  
✅ **iOS 平台** - 已添加  
✅ **Android 平台** - 已添加  
✅ **构建脚本** - 已创建  

---

## 🚀 快速开始

### 方法一：一键构建（推荐）

#### Windows 用户：
1. 双击运行 **`build-mobile.bat`**
2. 选择构建平台
3. 等待构建完成

#### macOS / Linux 用户：
```bash
# 添加执行权限
chmod +x build-mobile.sh

# 运行构建脚本
./build-mobile.sh
```

### 方法二：手动构建

#### 1. 安装依赖
```bash
npm install
```

#### 2. 构建 Web 应用
```bash
npm run build
```

#### 3. 同步到移动平台
```bash
npm run cap:sync
```

#### 4. 构建原生应用

**Android**:
```bash
# 进入 Android 目录
cd android

# 构建 Debug 版本
./gradlew assembleDebug

# 或者构建 Release 版本（需要签名）
./gradlew assembleRelease
```

**iOS (仅 macOS)**:
```bash
# 进入 iOS 目录
cd ios

# 构建 Debug 版本
xcodebuild -workspace App/App.xcworkspace -scheme App -configuration Debug -sdk iphoneos build

# 构建 Release 版本
xcodebuild -workspace App/App.xcworkspace -scheme App -configuration Release -sdk iphoneos build
```

---

## 📱 Android 应用

### 构建产物位置

Debug 版本 APK:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Release 版本 APK:
```
android/app/build/outputs/apk/release/app-release.apk
```

### 安装到手机

#### 方法 1：直接安装
1. 将 APK 文件传输到手机
2. 在手机上打开文件管理器
3. 点击 APK 文件开始安装
4. 如果提示"禁止安装未知来源应用"：
   - 进入 设置 > 安全
   - 开启"未知来源"或"允许安装未知应用"
5. 完成安装

#### 方法 2：使用 ADB
```bash
# 连接手机（开启 USB 调试）
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### 开启 USB 调试

1. 进入手机 **设置**
2. 找到 **关于手机**
3. 连续点击 **版本号** 7 次开启开发者模式
4. 返回设置，找到 **开发者选项**
5. 开启 **USB 调试**

---

## 🍎 iOS 应用

### 前置要求

- macOS 操作系统
- Xcode 最新版本
- Apple Developer 账号（用于发布到 App Store）

### 构建产物位置

```
ios/App/App/build/
```

### 安装到 iPhone/iPad

#### 方法 1：Xcode 直接运行
1. 用 Xcode 打开 `ios/App/App.xcworkspace`
2. 连接 iOS 设备
3. 选择目标设备和构建配置
4. 点击 ▶️ 运行按钮

#### 方法 2：导出 IPA
1. 在 Xcode 中选择 **Product > Archive**
2. 完成归档后，点击 **Distribute App**
3. 选择分发方式：
   - **Development** - 开发测试
   - **Enterprise** - 企业分发
   - **App Store Connect** - App Store 发布
4. 按照向导完成导出

### 发布到 App Store

1. 注册 [Apple Developer Program](https://developer.apple.com/programs/)
2. 在 [App Store Connect](https://appstoreconnect.apple.com/) 创建 App
3. 配置 App 信息、截图、描述等
4. 使用 Xcode 提交审核
5. 等待 Apple 审核通过

---

## 🔧 常见问题

### Android 常见问题

#### Q: 构建失败？

**A:** 尝试以下步骤：

1. **清理构建缓存**
   ```bash
   cd android
   ./gradlew clean
   ```

2. **检查 Gradle 版本**
   ```bash
   ./gradlew --version
   ```

3. **更新依赖**
   ```bash
   npm run cap:sync
   ```

4. **查看详细错误**
   ```bash
   ./gradlew assembleDebug --stacktrace
   ```

#### Q: APK 无法安装？

**A:** 检查：
1. 手机系统版本是否满足最低要求
2. APK 签名是否正确
3. 是否开启了"未知来源"安装权限
4. 手机存储空间是否充足

#### Q: 应用闪退？

**A:** 调试方法：
1. 连接电脑，使用 ADB 查看日志
   ```bash
   adb logcat
   ```
2. 查找崩溃日志（"FATAL EXCEPTION"）
3. 根据错误信息修复代码

### iOS 常见问题

#### Q: Xcode 报错找不到设备？

**A:** 检查：
1. 是否连接了 iOS 设备
2. 设备是否信任此电脑
3. Xcode 是否识别到设备

#### Q: 构建报错？

**A:** 常见解决方案：
1. **清理构建**
   ```bash
   xcodebuild clean
   ```

2. **更新 CocoaPods**
   ```bash
   cd ios/App
   pod deintegrate
   pod install
   ```

3. **重新同步**
   ```bash
   npm run cap:sync
   ```

#### Q: 如何调试 iOS 应用？

**A:** 
1. 在 Xcode 中运行，查看控制台输出
2. 使用 Safari 开发者工具调试 WebView
   - 开启 iOS设备的 Web 检查器
   - 在 Safari 菜单中选择 开发 > 设备名 > WebInspector

---

## 🎨 自定义应用

### 修改应用名称

#### Android
编辑 `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">歌词工坊</string>
</resources>
```

#### iOS
在 Xcode 中修改：
1. 打开 `ios/App/App/Resources/Info.plist`
2. 修改 `CFBundleDisplayName` 为 "歌词工坊"

### 修改应用图标

#### Android
替换 `android/app/src/main/res/mipmap-*/ic_launcher.png` 文件

#### iOS
替换 `ios/App/App/Resources/AppIcon.appiconset/` 中的图标文件

### 修改启动画面

#### Android
修改 `android/app/src/main/res/drawable/splash.xml`

#### iOS
修改 `ios/App/App/Resources/Splash/` 中的图片

---

## 📊 技术详情

### 项目结构

```
lyrics-studio/
├── src/                    # Web 源代码
├── dist/                   # Web 构建产物
├── android/                # Android 原生项目
│   ├── app/
│   │   └── src/
│   │       └── main/
│   │           ├── java/  # Java/Kotlin 代码
│   │           └── res/   # 资源文件
│   └── gradle/            # Gradle 配置
└── ios/                   # iOS 原生项目
    └── App/
        ├── App/           # Swift/Objective-C 代码
        └── Resources/     # 资源文件
```

### Capacitor 工作流程

1. **Web 构建** - Vite 构建生产版本
2. **同步** - Capacitor 复制 Web 文件到原生项目
3. **原生构建** - Xcode/Android Studio 构建应用
4. **打包** - 生成可安装的 APK/IPA 文件

---

## 🛠️ 开发工具

### Android 开发
- [Android Studio](https://developer.android.com/studio) - 官方 IDE
- [Gradle](https://gradle.org/) - 构建工具
- [ADB](https://developer.android.com/studio/command-line/adb) - 调试工具

### iOS 开发
- [Xcode](https://developer.apple.com/xcode/) - 官方 IDE
- [CocoaPods](https://cocoapods.org/) - 依赖管理
- [Apple Developer](https://developer.apple.com/) - 开发者平台

---

## 📝 注意事项

### Android
- ✅ 确保已安装 JDK 8 或更高版本
- ✅ 推荐使用 Android Studio 进行开发
- ✅ 测试多个 Android 版本（Android 5.0+）
- ✅ 检查权限配置（摄像头、存储等）

### iOS
- ✅ 确保 Xcode 为最新版本
- ✅ 测试多个 iOS 版本
- ✅ 遵守 App Store 审核指南
- ✅ 配置正确的证书和签名

---

## 🎯 下一步

1. **构建应用** - 按照以上步骤构建 APK/IPA
2. **测试应用** - 在真实设备上测试所有功能
3. **发布应用** - 发布到应用商店或分发给他人

---

## 📚 相关资源

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Android 开发文档](https://developer.android.com/docs)
- [iOS 开发文档](https://developer.apple.com/documentation)

---

## 🆘 获取帮助

如果在构建过程中遇到问题：

1. **查看日志** - 仔细阅读错误信息和堆栈跟踪
2. **搜索引擎** - 搜索错误关键词
3. **官方文档** - 查阅 Capacitor、Android、iOS 官方文档
4. **社区论坛** - Stack Overflow、Reddit 等
5. **创建 Issue** - 在项目仓库中提交问题

---

## 🎉 恭喜完成！

按照以上指南，你的歌词工坊移动应用已经可以构建了！

**立即开始构建你的第一个移动应用吧！** 📱🚀

---

**祝你开发顺利！** 🎵✨
