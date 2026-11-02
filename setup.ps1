$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$dirs = @(
    "storage\framework\cache\data",
    "storage\framework\sessions",
    "storage\framework\views",
    "storage\framework\testing",
    "storage\logs",
    "storage\app\public\projects",
    "storage\app\private",
    "bootstrap\cache"
)
foreach ($dir in $dirs) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
if (-not (Test-Path "database\database.sqlite")) { New-Item -ItemType File -Path "database\database.sqlite" | Out-Null }

composer install
php artisan key:generate
php artisan migrate:fresh --seed --force
php artisan storage:link
npm install
npm run build

Write-Host ""
Write-Host "Ready. Start it with:  php artisan serve"
Write-Host "Then open http://127.0.0.1:8000"
