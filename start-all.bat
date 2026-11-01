@echo off
title Activity Tracker - Starter
echo ========================================================
echo   Launching Activity Tracker Full-Stack Application
echo ========================================================
echo.
echo Starting Backend (Port 5000) and Frontend (Port 5173)...
echo.

start "Activity Tracker Backend" "%~dp0start-backend.bat"
timeout /t 3 /nobreak >nul
start "Activity Tracker Frontend" "%~dp0start-frontend.bat"

echo ========================================================
echo Servers are launching in separate windows!
echo Open your browser at: http://localhost:5173
echo ========================================================
timeout /t 5
