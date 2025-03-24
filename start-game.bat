@echo off
echo Starting Trae Game Development Environment...

:: Start the Go backend server
echo Starting Go backend server...
start "Trae Game Backend" cmd /k "cd backend && go run main.go"

:: Wait a moment to ensure backend is ready
timeout /t 2 /nobreak >nul

:: Start the frontend development server
echo Starting frontend development server...
start "Trae Game Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Trae Game servers are starting up...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:5173
echo.