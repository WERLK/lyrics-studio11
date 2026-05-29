@echo off
chcp 65001 >nul
echo ========================================
echo   歌词工坊 - 移动应用构建脚本
echo ========================================
echo.

echo [1/6] 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ✗ 依赖安装失败
    pause
    exit /b 1
)
echo ✓ 依赖安装完成
echo.

echo [2/6] 正在构建 Web 应用...
call npm run build
if %errorlevel% neq 0 (
    echo ✗ Web 应用构建失败
    pause
    exit /b 1
)
echo ✓ Web 应用构建完成
echo.

echo [3/6] 正在同步到移动平台...
call npm run cap:sync
if %errorlevel% neq 0 (
    echo ✗ 同步失败
    pause
    exit /b 1
)
echo ✓ 同步完成
echo.

echo [4/6] 请选择要构建的平台：
echo.
echo   1. Android APK（推荐，直接安装到手机）
echo   2. 查看构建产物位置
echo.
set /p choice=请输入选择 (1-2): 

if "%choice%"=="1" goto build_android
if "%choice%"=="2" goto show_location
goto end

:build_android
echo.
echo [5/6] 正在构建 Android 应用...
echo.

if not exist "android" (
    echo ✗ Android 平台未添加
    echo 请先运行: npm run cap:add:android
    pause
    exit /b 1
)

cd android
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo ✗ Android 构建失败
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ✓ Android APK 构建成功！
echo.
goto show_location

:show_location
echo [6/6] 构建完成！
echo.
echo ========================================
echo   歌词工坊 - 构建产物
echo ========================================
echo.

if exist "android\app\build\outputs\apk\debug" (
    echo 📱 Android APK:
    for %%f in (android\app\build\outputs\apk\debug\*.apk) do (
        echo    %%~nxf
        for %%a in ("%%~zf") do set size=%%a
    )
    echo.
    echo APK 文件路径：
    dir /b /s android\*.apk 2>nul
    echo.
)

echo.
echo 下一步：
echo 1. 将 APK 文件传输到手机
echo 2. 在手机上安装 APK（可能需要允许未知来源）
echo 3. 打开歌词工坊 App 开始使用
echo.
echo 或者使用 Android Studio 打开 android 目录进行进一步构建
echo.

:end
pause
