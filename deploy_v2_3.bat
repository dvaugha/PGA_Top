@echo off
echo ==========================================
echo PGA_Top Deployer (v2.3 Compact)
echo ==========================================

:: 1. Clean
if exist dist rmdir /s /q dist

:: 2. Build
echo [INFO] Building project...
call npm run build

:: 3. Deploy
echo [INFO] Pushing v2.3...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

git add .
git commit -m "Update v2.3 (Compact Grid & Course Info)"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Check for Compact 5-Col Grid.
echo ==========================================
exit /b 0
