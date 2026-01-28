@echo off
echo ==========================================
echo PGA Analytics Updater (v1.8 Script Fix)
echo ==========================================

:: 1. Clean
if exist dist rmdir /s /q dist

:: 2. Build
echo [INFO] Building project...
call npm run build

:: Check if build actually produced files
if not exist dist\index.html (
    echo [ERROR] Build failed to produce index.html
    exit /b 1
)

:: 3. Prepare Root Deployment
echo [INFO] Overwriting root...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

:: 4. Git Push
echo [INFO] Pushing v1.8...
git add .
git commit -m "Update v1.8 (Fix Blank Screen - Restore Main Script)"
git push origin main

echo.
echo ==========================================
echo  DONE.
echo  Tab Title: PGA Analytics v1.8
echo ==========================================
exit /b 0
