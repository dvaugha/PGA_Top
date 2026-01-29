@echo off
echo ==========================================
echo PGA_Top Deployer (v2.8 Mini Grid)
echo ==========================================

:: 1. Clean
if exist dist rmdir /s /q dist

:: 2. Build
echo [INFO] Building...
call npm run build

:: 3. Deploy
echo [INFO] Pushing v2.8...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

git add .
git commit -m "Update v2.8 (Ultra Mini Grid + Tournament Detail)"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Check for Ultra Mini Cards & Tournament Page.
echo ==========================================
exit /b 0
