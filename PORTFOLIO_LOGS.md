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
