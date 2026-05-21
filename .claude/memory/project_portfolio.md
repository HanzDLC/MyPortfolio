---
name: Flask portfolio project context
description: Repo layout, branches, deploy target, and key content files for the portfolio
type: project
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
- **Repo root**: `c:\Users\Admin\Documents\Flask Python Portfolio`
- **Stack**: Flask (Python) + Jinja2 templates, static assets, deployed on Vercel via `vercel.json`.
- **Branches**: `main` (deploy), `feature` (working). Both currently at `3a30a3a` after the 2026-05-06 redesign cycle.
- **Live URL**: https://hanzdlc-portfolio.vercel.app/
- **Key content files**:
  - `app.py` — Flask routes (`/`, `/about`, `/projects`, `/cv`/`/documents`, `/contact` POST).
  - `projects_data.py` — all project cards/modals (large file — read with offset/limit).
  - `index_data.py` — skills, about, services, certifications.
  - `tools_data.py` — tools section. Specific name branches must come before generic ones (e.g. `claude code` before `claude`).
  - `templates/cv_document.html`, `templates/resume_document.html` — printable CV/resume.
  - `static/images/<Project>/` — project images (e.g. `Hermes/`, `About/`, `DriveXP/`).
- **Knowledge base**: `PORTFOLIO_KB.md` (canonical, includes a "Portfolio Site Infrastructure" section with route map and current design-system notes).
- **Change log**: `PORTFOLIO_LOGS.md` — append an entry every time portfolio content changes.
- **Session instructions**: `CLAUDE.md` at repo root.
- **Active projects** (as of 2026-05-06): ARIA (6 marketing agents, prod), DriveXP (formerly CarBnb — repo still at internz2026-sys/CarBNB, rebrand is portfolio-side only), OpenClaw, Hermes SuperAgent.
- **Skills v2 system**: each skill in `get_skills()` carries `icon`, `accent`, `tools`, `proficiency`, `years`. Card uses `--skill-accent` CSS var + `color-mix()`. Don't strip these fields if editing skills.
- **Contact form**: `/contact` POST uses Gmail SMTP. Required env vars `GMAIL_USER` + `GMAIL_APP_PASSWORD` (Gmail app password, not regular password — needs 2FA on the Google account). Set in Vercel dashboard for prod, in local `.env` (gitignored) for dev.
- **Hero**: April 15 layout (commit `c7ae82b`) was restored at user request. Uses `myimage.jpg`, blobs + spotlight + hero-effects.js. Don't replace this with a minimalist redesign without explicit approval — the user explicitly said it was "more beautiful" than the alternative.
- **Pending redesign**: User wants a redesign inspired by Alex Chen-style minimalist serif portfolios (huge typography, generous whitespace) BUT keeping the dark navy + #4361ee color theme. Phase 1 plan: hero typography upgrade + animations, Phase 2: Selected Works preview, Phase 3: other pages. User wants Playwright MCP preview before any push.

**Why:** This file map avoids re-exploring the repo on every session. **How to apply:** When asked to update portfolio content, go straight to the relevant file above and also update `PORTFOLIO_KB.md` + append to `PORTFOLIO_LOGS.md` in the same turn.
