# Start both backend and frontend servers from the current project folder.

Write-Host "Starting AI Coach Fitness Platform..." -ForegroundColor Green
Write-Host ""

$projectRoot = $PSScriptRoot
$backendPath = Join-Path $projectRoot "ai_backend"
$frontendPath = $projectRoot

# Start backend in a hidden helper process.
Write-Host "[BACKEND] Starting Backend Server..." -ForegroundColor Cyan
Write-Host "URL: http://127.0.0.1:8002" -ForegroundColor Gray
$backendCmd = "Set-Location '$backendPath'; python -m uvicorn main:app --host 127.0.0.1 --port 8002"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -WindowStyle Hidden

# Wait briefly so backend can bind its port.
Start-Sleep -Seconds 5

# Start frontend in a hidden helper process.
Write-Host "[FRONTEND] Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "URL: http://127.0.0.1:8080" -ForegroundColor Gray
$frontendCmd = "Set-Location '$frontendPath'; npm run dev -- --host 127.0.0.1 --port 8080"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd -WindowStyle Hidden

Write-Host ""
Write-Host "SERVERS STARTED!" -ForegroundColor Green
Write-Host ""
Write-Host "Access your AI Coach at:" -ForegroundColor Yellow
Write-Host "  Frontend:  http://127.0.0.1:8080" -ForegroundColor White
Write-Host "  Backend:   http://127.0.0.1:8002" -ForegroundColor White
Write-Host "  API Docs:  http://127.0.0.1:8002/docs" -ForegroundColor White
