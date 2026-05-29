@echo off
chcp 65001 >nul
echo ========================================
echo   歌词工坊 - 桌面版构建脚本
echo ========================================
echo.

echo [1/4] 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ✗ 依赖安装失败
    pause
    exit /b 1
)
echo ✓ 依赖安装完成
echo.

echo [2/4] 正在构建 Web 应用和 Electron...
call npm run build:electron
if %errorlevel% neq 0 (
    echo ✗ 构建失败
    pause
    exit /b 1
)
echo ✓ Web 应用和 Electron 构建完成
echo.

echo [3/4] 正在选择构建平台...
echo.
echo 请选择要构建的平台：
echo   1. Windows (推荐)
echo   2. macOS
echo   3. Linux
echo   4. 所有平台
echo   5. 仅构建便携版 (Windows)
echo.
set /p choice=请输入选择 (1-5): 

if "%choice%"=="1" goto build_win
if "%choice%"=="2" goto build_mac
if "%choice%"=="3" goto build_linux
if "%choice%"=="4" goto build_all
if "%choice%"=="5" goto build_portable

:build_win
echo.
echo [3/4] 正在构建 Windows 安装包...
call npm run dist:win
goto check_result

:build_mac
echo.
echo [3/4] 正在构建 macOS 安装包...
call npm run dist:mac
goto check_result

:build_linux
echo.
echo [3/4] 正在构建 Linux 安装包...
call npm run dist:linux
goto check_result

:build_all
echo.
echo [3/4] 正在构建所有平台安装包...
call npm run dist
goto check_result

:build_portable
echo.
echo [3/4] 正在构建 Windows 便携版...
call npm run dist:win -- --win portable
goto check_result

:check_result
if %errorlevel% neq 0 (
    echo ✗ 构建失败
    pause
    exit /b 1
)

echo.
echo [4/4] 构建完成！
echo.
echo ========================================
echo   构建产物位于 release 目录
echo ========================================
echo.
echo 生成的文件：
if "%choice%"=="1" (
    dir /b release\*.exe 2>nul || echo   无 .exe 文件
) else if "%choice%"=="2" (
    dir /b release\*.dmg 2>nul || echo   无 .dmg 文件
) else if "%choice%"=="3" (
    dir /b release\*.AppImage 2>nul || echo   无 .AppImage 文件
) else (
    dir /b release\* 2>nul || echo   无构建产物
)
echo.
echo 下一步：
echo 1. 打开 release 目录查看构建产物
echo 2. 双击安装包进行安装
echo 3. 或者运行便携版（无需安装）
echo.
pause
