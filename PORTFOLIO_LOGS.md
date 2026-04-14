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
