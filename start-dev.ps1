param(
    [string]$Port = '5000'
)

$ErrorActionPreference = 'Stop'

Write-Host "Make sure you've run 'npm install' in the project root before starting."

$env:NODE_ENV = 'development'
$env:PORT = $Port

Write-Host "Starting dev server (NODE_ENV=development, PORT=$Port)..."
npx tsx server/index.ts
