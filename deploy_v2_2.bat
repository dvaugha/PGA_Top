@echo off
echo ==========================================
echo PGA_Top Deployer (Hard CSS Fix)
echo ==========================================

:: 1. Force Clean Build Env
echo [INFO] Cleaning...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite

:: 2. Build - WITH ERROR CHECKING
echo [INFO] Building project...
call npm run build

if %errorlevel% neq 0 (
    echo [ERROR] Build FAILED. Aborting deploy to prevent broken site.
    echo [ERROR] Check the output above.
    exit /b 1
)

:: 3. Prepare Root Deployment
echo [INFO] Preparing Root...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

:: 4. Git Push
echo [INFO] Pushing v2.2...
git add .
git commit -m "Update v2.2 (Hardcoded CSS Grid fallbacks)"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Site Link: https://dvaugha.github.io/PGA_Top/
echo ==========================================
exit /b 0
