---
name: GitHub account gotcha
description: User has multiple GitHub accounts; verify the active one before pushing
type: reference
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
The portfolio repo lives under the user's **HanzDLC** GitHub account (`HanzDLC/MyPortfolio`, now public). The user also has an `internz2026-sys` account active on this machine at times — a prior push failed with `remote: Repository not found` because the wrong account was signed in.

**Known identities:**
- HanzDLC — owns the portfolio repo + Vercel. Noreply: `144861507+HanzDLC@users.noreply.github.com`. Primary email `hdlcruz03@gmail.com` (marked private).
- internz2026-sys — associated with `internz.2026@gmail.com`. Do NOT author commits with this email; Vercel will reject.

Before pushing, confirm `git remote -v` points at `HanzDLC/MyPortfolio` and `git config user.email` is the HanzDLC noreply. If a push fails with "Repository not found", do not retry — surface the error so the user can switch accounts.
