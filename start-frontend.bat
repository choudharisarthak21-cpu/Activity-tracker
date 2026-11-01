@echo off
title Activity Tracker - Frontend Web App
echo ========================================================
echo Starting Activity Tracker Frontend on Port 5173...
echo ========================================================

REM Add Node.js to PATH if not already present
set "PATH=%PATH%;C:\Program Files\nodejs"

cd /d "%~dp0frontend"
npm.cmd run dev
pause
