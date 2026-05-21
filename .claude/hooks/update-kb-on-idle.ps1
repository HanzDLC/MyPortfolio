# update-kb-on-idle.ps1
# Runs on every Stop event (Claude finishes a response).
# Writes a unique timestamp stamp. Launches a 5-minute background job.
# The job checks if the stamp is unchanged (user still idle) before updating KB.

$stampFile = "$env:USERPROFILE\.claude\portfolio-idle-stamp.txt"
$myStamp   = [System.DateTime]::Now.ToString("yyyyMMddHHmmss")
$projectDir = "c:\Users\Admin\Documents\Flask Python Portfolio"
$updateScript = "$projectDir\.claude\hooks\update_kb.py"

# Write this turn's stamp
$myStamp | Out-File -FilePath $stampFile -Encoding utf8 -Force

# Clean up completed/failed idle jobs from prior turns
Get-Job -Name "PortfolioKBIdle" -ErrorAction SilentlyContinue |
    Where-Object { $_.State -in @("Completed","Failed","Stopped") } |
    Remove-Job -Force -ErrorAction SilentlyContinue

# Launch 5-min watcher (runs in background, does not block Claude)
Start-Job -Name "PortfolioKBIdle" -ScriptBlock {
    param($stampFile, $myStamp, $updateScript)
    Start-Sleep 300   # 5 minutes
    $current = (Get-Content -Path $stampFile -Raw -ErrorAction SilentlyContinue).Trim()
    if ($current -eq $myStamp) {
        # Stamp unchanged = no new Claude activity = user is idle
        & python $updateScript
    }
    # else: a newer turn fired, that job will take over
} -ArgumentList $stampFile, $myStamp, $updateScript | Out-Null
