@echo off
echo ==========================================
echo PGA_Top Deployer (Fresh Start)
echo ==========================================

:: 1. Clean & Restore Source
if exist dist rmdir /s /q dist
copy /Y index.source.html index.html >nul

:: 2. Build
echo [INFO] Building project...
call npm run build

:: 3. Prepare Root Deployment (The "NFL_60" Way)
echo [INFO] Preparing Root Directory...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

:: 4. Git Push
echo [INFO] Pushing to GitHub...
git add .
git commit -m "v3.7 - Bag Analysis & Yardages"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Site Link: https://dvaugha.github.io/PGA_Top/
echo ==========================================
exit /b 0
