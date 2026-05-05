$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$kbPath   = Join-Path $projectRoot 'PORTFOLIO_KB.md'
$logsPath = Join-Path $projectRoot 'PORTFOLIO_LOGS.md'

$parts = @()

if (Test-Path -LiteralPath $kbPath) {
    $kb = Get-Content -Raw -LiteralPath $kbPath
    $parts += "# PORTFOLIO_KB.md (auto-loaded at session start)`n`n$kb"
}

if (Test-Path -LiteralPath $logsPath) {
    $logsRaw = Get-Content -Raw -LiteralPath $logsPath

    $entries = [regex]::Split($logsRaw, '(?m)^(?=## \d{4}-\d{2}-\d{2})')
    $header  = $entries[0]
    $items   = $entries | Select-Object -Skip 1
    $recent  = $items | Select-Object -First 5
    $logs    = ($header.TrimEnd() + "`n`n" + ($recent -join "")).TrimEnd()

    $parts += "# PORTFOLIO_LOGS.md (5 most recent entries, auto-loaded)`n`n$logs"
}

$context = $parts -join "`n`n---`n`n"

$payload = @{
    hookSpecificOutput = @{
        hookEventName     = 'SessionStart'
        additionalContext = $context
    }
}

$payload | ConvertTo-Json -Depth 10 -Compress
