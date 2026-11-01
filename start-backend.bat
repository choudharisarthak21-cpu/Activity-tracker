@echo off
title Activity Tracker - Backend API
echo ========================================================
echo Starting Activity Tracker Backend API on Port 5000...
echo ========================================================

REM Add Node.js to PATH if not already present
set "PATH=%PATH%;C:\Program Files\nodejs"

cd /d "%~dp0backend"
node src/server.js
pause
