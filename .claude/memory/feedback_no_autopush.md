---
name: Never push or merge without explicit approval
description: Git push, merge-to-main, and force operations require an explicit user go-ahead
type: feedback
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
Do not run `git push`, `git merge` into `main`, or any force/destructive git operation without the user saying so explicitly in the current turn.

**Why:** The portfolio deploys from `main` on Vercel — a wrong push ships live. There was also a past incident where the user was signed into the wrong GitHub account and the push failed with "Repository not found"; pushing blindly compounds that kind of confusion.

**How to apply:** Commit freely on `feature` after content changes. For anything that leaves the local repo, ask first ("Push to origin/feature?" / "Merge feature into main and push?"). If the user pre-authorized the full sequence ("commit, push, and merge"), the approval stands only for that request.
