@echo off
echo ==========================================
echo PGA_Top Deployer (v2.4 Calendar)
echo ==========================================

:: 1. Clean
if exist dist rmdir /s /q dist

:: 2. Build
echo [INFO] Building project...
call npm run build

:: Check build
if not exist dist\index.html (
    echo [ERROR] Build Failed!
    exit /b 1
)

:: 3. Deploy
echo [INFO] Pushing v2.4...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

git add .
git commit -m "Update v2.4 (Calendar View & Fixed Assets)"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Check for Calendar Cards + Course Links.
echo ==========================================
exit /b 0
