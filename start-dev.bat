@echo off
chcp 65001 > nul
echo ========================================
echo     歌词工坊 - 开发模式启动器
echo ========================================
echo.

:: 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js 版本:
node --version
echo.

:: 检查是否在项目目录
if not exist "package.json" (
    echo [错误] 未找到 package.json
    echo 请确保在项目根目录运行此脚本
    pause
    exit /b 1
)

:: 检查依赖
if not exist "node_modules" (
    echo [提示] 未检测到 node_modules
    echo 正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
)

:: 启动开发服务器
echo [✓] 正在启动开发服务器...
echo.
echo 请稍候，浏览器将自动打开...
echo 如未自动打开，请手动访问: http://localhost:5173
echo.
echo 按 Ctrl+C 停止服务器
echo.

start http://localhost:5173
npm run dev

pause
