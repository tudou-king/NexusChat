@echo off
REM NexusChat - Quick Deploy Script for Windows
REM Usage: deploy.bat [port]

set PORT=%1
if "%PORT%"=="" set PORT=8080

echo =========================================
echo   NexusChat - Deploy to your server
echo =========================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting NexusChat on port %PORT%...
    echo Open http://localhost:%PORT% in your browser
    echo.
    echo Press Ctrl+C to stop
    python -m http.server %PORT%
) else (
    where python3 >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Starting NexusChat on port %PORT%...
        echo Open http://localhost:%PORT% in your browser
        echo.
        echo Press Ctrl+C to stop
        python3 -m http.server %PORT%
    ) else (
        echo Error: Python not found
        echo.
        echo Alternative options:
        echo   1. Use Node.js: npx serve . -p %PORT%
        echo   2. Use PHP: php -S localhost:%PORT%
        echo   3. Open index.html directly in your browser
        pause
        exit /b 1
    )
)
