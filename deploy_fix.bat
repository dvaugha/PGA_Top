@echo off
echo ==========================================
echo PGA_Top Deployer (Tailwind Fix)
echo ==========================================

:: 1. Clean Dist
if exist dist rmdir /s /q dist

:: 2. Build
echo [INFO] Building project...
call npm run build

:: Check for index.css output to confirm Tailwind ran
if not exist dist\assets\*.css (
    echo [WARNING] No CSS file generated!?
)

:: 3. Prepare Root Deployment
echo [INFO] Preparing Root...
copy /Y dist\index.html index.html >nul
if not exist assets mkdir assets
xcopy /E /I /Y dist\assets assets >nul

:: 4. Git Push
echo [INFO] Pushing v2.1...
git add .
git commit -m "Update v2.1 (Add Missing Tailwind Config)"
git push origin main

echo.
echo ==========================================
echo  DONE!
echo  Check for Horizontal Grid.
echo ==========================================
exit /b 0
