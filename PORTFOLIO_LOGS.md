# Portfolio Change Logs

Chronological record of portfolio updates. Newest entries on top. Append a new entry every time portfolio content is modified.

Format:
```
## YYYY-MM-DD — Short title
- What changed (files + summary)
- Why (motivation / user intent)
- Commit hash (if committed)
```

---

## 2026-05-06 — Let's Talk contact form (Flask + Gmail SMTP)
- Files: [app.py](app.py), [requirements.txt](requirements.txt), [templates/base.html](templates/base.html), [static/js/contact-modal.js](static/js/contact-modal.js), [static/styles.css](static/styles.css), [.env.example](.env.example).
- New `/contact` POST route: validates subject/message, builds an `EmailMessage`, sends via `smtplib.SMTP_SSL('smtp.gmail.com', 465)` using `GMAIL_USER` + `GMAIL_APP_PASSWORD` from env. Returns JSON `{ok: true}` or descriptive error.
- "Let's Talk" nav button now opens a dark-themed modal (matches the screenshot's TO/SUBJECT/MESSAGE structure) with TO pre-filled to `hdlcruz03@gmail.com`. ESC/backdrop/Cancel close it; Send Email POSTs JSON to `/contact` and shows inline status (info/success/error).
- Required env vars (must be set in Vercel dashboard for production): `GMAIL_USER`, `GMAIL_APP_PASSWORD` (Gmail app password — needs 2FA on the Google account first; generate at https://myaccount.google.com/apppasswords). Locally, drop them in `.env` (gitignored). `python-dotenv` added to requirements for local loading.
- Why: User chose Gmail SMTP (option 2 from a 3-option pitch covering Web3Forms / SMTP / mailto). Wanted form submissions to land directly in Hanz's Gmail inbox.

## 2026-05-06 — Renamed CarBnb → DriveXP across portfolio
- Files: [projects_data.py](projects_data.py), [PORTFOLIO_KB.md](PORTFOLIO_KB.md), [CLAUDE.md](CLAUDE.md), [vectordb.py](vectordb.py), [templates/cv_document.html](templates/cv_document.html), [templates/resume_document.html](templates/resume_document.html), folder rename `static/images/CarBnb/` → `static/images/DriveXP/`, plus memory entry `user_profile.md`.
- Updated project title, modal id (`carbnb-modal` → `drivexp-modal`), category id (`carbnb` → `drivexp`), image paths, and gallery alt text. Updated CV/resume professional summary and experience bullets. Memory note keeps "(formerly CarBnb)" tag for continuity.
- The GitHub repo at internz2026-sys/CarBNB still uses the old name; this rebrand is portfolio-side only until the repo is renamed.
- Why: User rebranded the project from CarBnb to DriveXP and replaced the landing image.
- Note: historical log entry from 2026-03-29 still says "ARIA, CarBnb, OpenClaw & Hermes" — left intact as a record of what was true at that time.

## 2026-05-06 — Skills section creative redesign (v2)
- Files: [index_data.py](index_data.py), [app.py](app.py), [templates/index.html](templates/index.html), [static/styles.css](static/styles.css).
- Re-added Skills section to homepage (was removed in earlier uncommitted index.html cleanup) with three visual upgrades: per-card icon + accent color, hover-reveal tool chips, and proficiency dots + years badge.
- `index_data.py`: each skill now carries `icon` (lucide-style key), `accent` (hex), `tools` (array), `proficiency` (1–5), `years` (string). Renamed "n8n Workflow Automation" → "Automation & Agentic AI" to cover n8n + OpenClaw + Hermes SuperAgent.
- `app.py`: imported `get_skills`, passed to `index.html`.
- `templates/index.html`: new `<section class="skills-v2-section">` with inline SVG icon switch by `skill.icon`.
- `static/styles.css`: added ~210 lines for `.skill-card-v2` system — uses CSS `color-mix()` with the per-card `--skill-accent` so accents drive icon background, border, dots, and chip hover color.
- Mobile: tool chips always show (no hover available); single-column grid below 720px.
- Why: User asked to make the Skills tab more creative; greenlit options 1+2+3 from a 3-option pitch.

## 2026-05-06 — Added Claude Code + Hermes SuperAgent to tools showcase
- Files: [tools_data.py](tools_data.py), [PORTFOLIO_KB.md](PORTFOLIO_KB.md).
- `tools_data.py`: added a `claude code` branch (lobehub claude-color icon) before the generic `claude` fallback so "Claude Code" matches first; also gave the generic `claude` branch a real icon. Added a `hermes` branch using `/static/images/Hermes/hermes1.png`. Appended `"Claude Code"` and `"Hermes SuperAgent"` to the showcase list.
- `PORTFOLIO_KB.md`: added Hermes SuperAgent and Claude Code to the Tools & Platforms list.
- Why: User asked to surface his actual daily AI dev tools (Claude Code, Hermes) in the homepage tools grid.

## 2026-05-06 — SessionStart hook auto-loads PORTFOLIO_KB + recent logs
- Files: [.claude/settings.json](.claude/settings.json), [.claude/hooks/load-portfolio-context.ps1](.claude/hooks/load-portfolio-context.ps1).
- Added a SessionStart hook (PowerShell) that emits `hookSpecificOutput.additionalContext` containing the full PORTFOLIO_KB.md and the 5 most recent PORTFOLIO_LOGS.md entries, so each new Portfolio Agent session opens with the latest KB+logs already in context.
- Pipe-tested: script produced ~11.7K chars of valid JSON; settings.json validated against schema.
- Note: if Claude Code doesn't pick the hook up live, open `/hooks` once or restart the CLI — the settings watcher only re-reads `.claude/` if the file existed at session start.

## 2026-04-23 — Added Hostinger to skills KB
- File: [PORTFOLIO_KB.md](PORTFOLIO_KB.md).
- Added Hostinger under DevOps skills and to Tools & Platforms list alongside Vercel.
- Why: User confirmed Hostinger is part of his deployment/hosting toolkit; including it in KB so future applications and portfolio updates pick it up automatically.

## 2026-04-15 — Resume print v3 (readable sizing + balanced margins)
- File: [static/styles.css](static/styles.css).
- v2 was too aggressive (8.8pt lists looked cramped) and margins were asymmetric (0.35in top / 0.25in bottom / 10mm sides).
- Balanced `@page margin` to uniform `0.4in 0.5in` and bumped resume fonts: base 9.5→10pt, lists 8.8→9.5pt, name 14→15pt, section titles 11.5→12.5pt. Kept the `page-break-inside: auto` override from v2.
- Note: User's print dialog was set to Legal paper. Must select **Letter** to match `@page size: letter`.

## 2026-04-15 — Resume print fit v2 (override page-break-inside)
- File: [static/styles.css](static/styles.css).
- First pass (font/margin shrink) didn't fully fix 2-page issue: Education section was getting pushed to page 2 by `page-break-inside: avoid` on `.cv-edu-entry` even though content had room.
- Added resume-scoped override setting `page-break-inside: auto` on `.cv-edu-entry`, `.cv-skills-grid`, `.cv-section`, `.cv-header`. Also trimmed `.cv-section` margin 3px→2px and `.cv-edu-entry` margin 3px→2px, padding 2px→1px.
- Why: User confirmed PDF download still spilled to 2 pages. Goal: force single-page resume.
- Note for user: In Chrome print dialog, set **Margins: Minimum or None** if it still spills — `@page` rules can be overridden by browser "Default" margins.

## 2026-04-15 — Resume print compaction (force 1-page fit)
- File: [static/styles.css](static/styles.css) — `@media print` block.
- Shrank `@page` margins (0.6in/5mm → 0.35in/0.25in) and tightened resume-scoped overrides: base font 10.5pt → 9.5pt, line-height 1.35 → 1.22, section/entry margins halved, list `padding/margin` zeroed, skills grid padding reduced.
- Why: User reported resume downloading as 2 pages (Education + Certifications overflowed). Goal: fit on one letter page.
- CV print styles untouched (still tuned for 2-page fit); smaller `@page` margins only give CV more room, won't push it past 2 pages.
- Not committed yet — verify print preview before commit.

## 2026-04-15 — Initialized Portfolio Agent memory system + Vercel deploy unblock
- Created [CLAUDE.md](CLAUDE.md), [PORTFOLIO_LOGS.md](PORTFOLIO_LOGS.md), and seeded `memory/` with user, project, feedback, and reference memories. Opening handshake: "I am your Portfolio Agent. What do we need to update?"
- Vercel deploy was blocked with "commit author does not have contributing access" / "Hobby teams do not support collaboration." Root cause: earlier commits were authored with `internz.2026@gmail.com` (maps to a different GitHub account, `internz2026-sys`). Fixed by:
  1. Set local `git config user.email` to `144861507+HanzDLC@users.noreply.github.com` (HanzDLC's GitHub noreply — required because "Keep my email addresses private" is ON under github.com/settings/emails).
  2. Rebased last 2 commits with `--reset-author` to rewrite author.
  3. Force-pushed `main`.
- Also made the repo public to remove the Hobby-plan private-repo collaboration restriction.
- Commits on `main`: `dc68d19` (Hermes + ARIA-6) and `2623dfd` (Portfolio Agent instructions + logs), both authored by `HanzDLC <144861507+HanzDLC@users.noreply.github.com>`.
- If Vercel still blocks after this, root cause shifts to Vercel project ownership (project was imported under a non-HanzDLC Vercel account) — fix = delete and re-import under the HanzDLC Vercel login.

## 2026-03-29 — Added Hermes AI Agent + updated ARIA to 6 agents
- Files: [projects_data.py](projects_data.py), [templates/cv_document.html](templates/cv_document.html), [templates/resume_document.html](templates/resume_document.html), new `static/images/Hermes/` (banner, sessions, workspace, hermes1).
- ARIA: card/modal descriptions updated from "5 AI marketing agents" to "6 AI marketing agents" (added Media Agent); added Paperclip overhaul (~3x faster CEO chat), sub-agent delegation watcher, structured email drafting, self-healing Claude CLI. Workflow steps 5→6, features 6→10, impact metrics updated to "6 Agents / ~3x Faster / Self-Healing".
- Hermes: new project entry (agentic-ai-hermes category) covering migration from OpenClaw, persistent memory, cron automations, multi-platform messaging (Telegram/Discord/Slack), Hermes WebUI.
- CV + resume: professional summary and experience bullets updated; experience section title now "ARIA, CarBnb, OpenClaw & Hermes Agentic AI Projects".
- Why: Keep portfolio/CV/resume accurate after Hermes deployment and ARIA Paperclip overhaul.
- Commit: `29d53f6` — "feat: Add Hermes AI agent project and update ARIA to 6 agents" (merged to `main`).

## 2026-03-26 — CV print compaction (2-page fit)
- Commits: `c497af2` (CV print compaction), `cda5ae0` (letter page size), `27ef6a9` (consolidate CV to 2 pages), `17100d4` (resume single-page print), `daf11bf` (remove vector DB deps from prod requirements).
- Why: Ensure CV prints on exactly 2 pages and resume on 1 page (letter size).
