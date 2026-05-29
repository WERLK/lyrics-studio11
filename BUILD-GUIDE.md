# 歌词工坊桌面版构建指南

## 概述

本指南帮助你将歌词工坊项目构建为可在 Windows、macOS 和 Linux 系统上运行的桌面应用程序。

## 环境要求

### 必需软件

1. **Node.js** 18.x 或更高版本
   - 下载地址：https://nodejs.org/
   - 验证安装：`node -v`

2. **Git**
   - 下载地址：https://git-scm.com/
   - 验证安装：`git --version`

3. **npm** (随 Node.js 一起安装)
   - 验证安装：`npm -v`

### Windows 额外要求

- **Windows 10/11** (64位)
- 如果需要构建安装包，需要安装 **Visual Studio Build Tools** 或 **Visual Studio**

### macOS 额外要求

- macOS 10.13 或更高版本
- Xcode 命令行工具：`xcode-select --install`

### Linux 额外要求

- GCC/G++ 编译器
- GTK 3.0 开发库

## 构建步骤

### 1. 克隆或下载项目

```bash
# 如果使用 Git
git clone <项目仓库地址>
cd lyrics-studio

# 或者直接下载并解压项目
```

### 2. 安装依赖

```bash
npm install
```

这将安装所有必要的依赖包，包括：
- React 和相关库
- Electron
- Electron Builder
- Tailwind CSS
- Vite

### 3. 构建 Web 应用

```bash
npm run build
```

这将在 `dist` 目录生成 Web 应用文件。

### 4. 编译 Electron 源代码

```bash
npm run build:electron
```

这将：
- 再次构建 Web 应用
- 编译 `electron/` 目录下的 TypeScript 代码
- 生成 `dist-electron/` 目录

### 5. 打包桌面应用

#### Windows

```bash
# 构建 Windows 安装包 (NSIS)
npm run dist:win

# 或者只构建便携版（无需安装）
npm run dist:win -- --win portable
```

构建产物：
- `release/歌词工坊-Setup.exe` - Windows 安装包
- `release/歌词工坊.exe` - 便携版可执行文件

#### macOS

```bash
npm run dist:mac
```

构建产物：
- `release/歌词工坊.dmg` - macOS 安装包

#### Linux

```bash
npm run dist:linux
```

构建产物：
- `release/歌词工坊.AppImage` - Linux AppImage 包

### 6. 查看构建产物

构建完成后，可以在 `release` 目录找到所有构建产物：

```bash
ls -la release/
```

## 常用命令

### 开发模式

```bash
# 启动开发服务器（仅 Web 版本）
npm run dev

# 在 Electron 中运行（桌面版本开发）
npx electron .
```

### 构建命令汇总

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建 Web 应用 |
| `npm run build:electron` | 构建 Web + 编译 Electron |
| `npm run dist` | 构建所有平台安装包 |
| `npm run dist:win` | 构建 Windows 安装包 |
| `npm run dist:mac` | 构建 macOS 安装包 |
| `npm run dist:linux` | 构建 Linux 安装包 |

## 运行已构建的应用

### Windows

1. 打开 `release/歌词工坊-Setup.exe`
2. 按照安装向导完成安装
3. 从开始菜单或桌面快捷方式启动应用

或者运行便携版：
1. 双击 `release/歌词工坊.exe`

### macOS

1. 打开 `release/歌词工坊.dmg`
2. 将应用拖到应用程序文件夹
3. 从 Launchpad 或应用程序文件夹启动

### Linux

#### AppImage 格式

```bash
chmod +x release/歌词工坊.AppImage
./release/歌词工坊.AppImage
```

## 常见问题

### Q: 构建失败，提示找不到模块

**A**: 尝试删除 `node_modules` 和 `package-lock.json`，然后重新安装：

```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: Windows 构建失败

**A**: 确保已安装 Visual Studio Build Tools 或 Visual Studio。

### Q: macOS 构建失败

**A**: 确保已安装 Xcode 命令行工具：

```bash
xcode-select --install
```

### Q: 应用图标不显示

**A**: 确保 `public/icon.png` 文件存在且格式正确。推荐使用 512x512 像素的 PNG 图片。

### Q: 下载 Electron 失败

**A**: 由于网络限制，可以设置镜像源：

```bash
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm run dist:win
```

或在中国可以使用淘宝镜像：

```bash
export ELECTRON_BUILDER_BINARIES_MIRROR="https://npm.taobao.org/mirrors/electron-builder-binaries/"
```

## 高级配置

### 修改应用图标

1. 准备一个 512x512 像素的 PNG 图片
2. 保存为 `public/icon.png`
3. 重新构建应用

### 修改应用信息

编辑 `package.json` 中的 `build` 配置：

```json
"build": {
  "appId": "com.lyricstudio.app",
  "productName": "歌词工坊",
  "directories": {
    "output": "release"
  }
}
```

### 构建特定架构版本

```bash
# Windows x64
npm run dist:win -- --win --x64

# Windows ia32
npm run dist:win -- --win --ia32

# macOS Universal (Intel + Apple Silicon)
npm run dist:mac -- --mac universal
```

## 技术架构

### 核心技术栈

- **前端框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **桌面框架**: Electron
- **打包工具**: Electron Builder
- **构建工具**: Vite
- **状态管理**: Zustand

### 项目结构

```
lyrics-studio/
├── src/                    # React 源代码
│   ├── components/         # UI 组件
│   ├── pages/             # 页面组件
│   ├── services/           # 服务层
│   ├── store/             # 状态管理
│   └── types/             # TypeScript 类型
├── electron/              # Electron 主进程代码
│   ├── main.ts            # 主进程入口
│   └── preload.ts         # 预加载脚本
├── dist/                  # 构建后的 Web 应用
├── dist-electron/         # 编译后的 Electron 代码
├── release/               # 打包后的桌面应用
└── public/                # 静态资源
```

## 获取帮助

如果在构建过程中遇到问题：

1. 查看错误信息
2. 检查环境配置
3. 查看 [Electron Builder 文档](https://www.electron.build/)
4. 查看 [Vite 文档](https://vitejs.dev/)

## 许可证

本项目遵循相关开源许可证。
