# Hanz de la Cruz — Portfolio Knowledge Base
<!-- Auto-maintained by .claude/hooks/update_kb.py. Manual edits are safe. -->

---

## 1. Identity & Contact

| Field | Value |
|---|---|
| Full Name | Hanz Uriel A. de la Cruz |
| Alias / Handle | hdlcruz03 |
| Location | Landheights Ville, Tagbak, Jaro, Iloilo City, PH |
| Personal Email | hdlcruz03@gmail.com |
| Portfolio | https://hanzdlc-portfolio.vercel.app/ |
| GitHub (portfolio) | HanzDLC / MyPortfolio |
| LinkedIn | https://www.linkedin.com/in/hanz-uriel-de-la-cruz-46495a2b6 |

**Hobbies**: Guitar (multiple Battle of the Bands wins — Champion at Sigabong XXXIV, ISACOM, Iloilo Bike Fest)
**Philosophy**: Make processes clearer, easier, and more useful. Build things that reduce manual work and turn raw data into actionable stories.

---

## 2. Current Roles

### Lead Full-Stack Developer — Zilla Media (2026 – Present, Remote)
- Right hand of CTO; leads development of ARIA, DriveXP, OpenClaw, Hermes
- Helping certify Filipino Virtual Professionals as part of company mission

### AI Specialist — US commercial flooring company (May 2026 – Present, Remote · NDA)
- Public description (resume / LinkedIn only): "AI Specialist building lead-response and proposal automations for a US commercial flooring company."
- ⚠️ Under NDA: do NOT disclose the client's name, people, workflows, prompts, systems, or source code in any portfolio, video, public post, or marketing material without written approval. Only the one-line description above is cleared for public use.

---

## 3. Flask Portfolio Infrastructure

### Overview
- **Framework**: Flask (Python) + Jinja2 templates + vanilla JS + plain CSS
- **Deployed**: Vercel via `@vercel/python` (see `vercel.json`)
- **Repo**: HanzDLC/MyPortfolio (public; push needs HanzDLC noreply email + token)
- **Branches**: `main` (deployed to Vercel), `feature` (working/preview)
- **URL**: https://hanzdlc-portfolio.vercel.app/

### Key Files
| File | Purpose |
|---|---|
| `app.py` | Flask routes — `/`, `/about`, `/projects`, `/documents`, `/contact` POST |
| `projects_data.py` | All project cards + modal content (large; read with offset/limit) |
| `index_data.py` | Skills v2, About content, Services, Certifications |
| `tools_data.py` | Tool icon/color map; `get_tool_info()`, `get_all_tools_with_icons()` |
| `templates/base.html` | Global layout, nav, footer, contact modal, cache-buster version |
| `templates/about.html` | About page — intro grid, stats strip, chips marquee, spotlight cards, guitar pull-quote, CTA |
| `templates/cv_document.html` | CV (Oxford format — Education first, action-verb bullets, single-column skills) |
| `templates/resume_document.html` | Resume (ATS-safe — linear layout, ≥10pt, comma-separated skills) |
| `static/styles.css` | All CSS; mobile overrides appended at END of file for cascade priority |
| `PORTFOLIO_LOGS.md` | Chronological change log — append entry on every content change |
| `PORTFOLIO_KB.md` | This file — canonical knowledge base |
| `.claude/settings.json` | Claude Code hooks (SessionStart loads KB; Stop triggers idle KB refresh) |
| `.claude/hooks/load-portfolio-context.ps1` | SessionStart hook — injects KB + recent logs as additionalContext |
| `.claude/hooks/update_kb.py` | Idle KB updater — refreshes Last Updated + Recent Changes section |
| `.claude/hooks/update-kb-on-idle.ps1` | Stop hook — stamps timestamp, launches 5-min idle watcher job |

### Coding Conventions
- **Mobile CSS**: Always append overrides at END of `styles.css` — never edit desktop rules; override only
- **Cache-buster**: `styles.css?v=X.X` in `base.html` — bump version on every CSS deploy
- **Tools**: `tools_data.py` uses first-match branching; specific names MUST come before generic substrings (e.g., `fastapi` before `api`, `claude code` before `claude`)
- **CV ↔ Resume sync**: Agent counts, project names, key metrics must match across `projects_data.py`, `cv_document.html`, and `resume_document.html`
- **No push without user approval** — always confirm before `git push`
- **Verify after deploy** — push first, then Playwright-verify the live URL; never simulate CSS locally

### Contact Form
- Route: `POST /contact` in `app.py` (Gmail SMTP via smtplib)
- Env vars needed: `GMAIL_USER=hdlcruz03@gmail.com`, `GMAIL_APP_PASSWORD=<app-password>`
- Must be set in Vercel dashboard (Production scope) **and** local `.env` (gitignored)
- Returns 503 if env vars missing, 502 on SMTP error, 200 on success
- If Vercel blocks outbound SMTP → fallback: convert to Resend HTTP API

---

## 4. Active Projects

### ARIA — AI Runs It All
- **Status**: Deployed (production, real clients)
- **Stack**: Next.js 14, FastAPI, Claude AI, Paperclip AI orchestration, Supabase, Socket.IO, Python, TypeScript
- **Purpose**: Multi-tenant B2B SaaS with 6 autonomous AI marketing agents (CEO, Content Writer, Email Marketer, Social Manager, Ad Strategist, Media) for developer founders
- **Key 2026 improvements**: Paperclip overhaul (~3x CEO latency cut), hardened sub-agent delegation, Gmail sending pipeline, self-healing Claude CLI config, Socket.IO real-time monitoring

### DriveXP — Car Rental Platform
- **Status**: Prototype (was CarBnb, renamed DriveXP)
- **Stack**: Next.js 16, React 19, TypeScript, Prisma 7 ORM, PostgreSQL, Tailwind CSS 4, Docker, Supabase
- **Scope**: 16 admin pages, 9 interconnected database models; owner verification, booking management, availability engine, payout accounting
- **Repo**: github.com/internz2026-sys/CarBNB (old repo name; portfolio shows "DriveXP")

### OpenClaw — Agentic AI Orchestration
- **Status**: Deployed
- **Stack**: OpenClaw, Agentic AI, Ollama, Workflow Management
- **Purpose**: Autonomous workflow orchestration handling task automation and real-time monitoring

### Hermes SuperAgent — Self-Improving Agent Hub
- **Status**: Deployed
- **Stack**: Hermes (Nous Research), Python, Cron Scheduler, Telegram/Discord/Slack gateway, Hermes WebUI
- **Purpose**: Migrated all OpenClaw agents via `hermes claw migrate`; adds persistent cross-session memory, native cron automations, multi-platform messaging, self-improving skill capture
- **Access**: Hermes WebUI via SSH tunnel; three-panel browser interface

---

## 5. Completed / Past Projects

### School MIS & ECR System
- **Status**: Completed / Delivered
- **Stack**: Base44, ChatGPT, n8n, MongoDB
- **Impact**: Centralized school management with accounting transparency, Electronic Class Record (ECR) with DepEd-aligned grading, automated QA logging via n8n

### MatrixMatch — BSIT Capstone
- **Status**: Academic (ISAT U)
- **Stack**: Python, SBERT semantic similarity
- **Purpose**: Automated matrix comparison of theses/capstone projects to support research idea creation

### Data & ML Projects
- Reddit Scraping (PRAW API), ML Model Evaluation, Customer Segmentation (K-Means)
- Freelance thesis data visualisation support (Pandas, Matplotlib, Seaborn)

### Spreadsheet Projects
- Advanced VLOOKUP/QUERY formulas, QA Bug Logs structure

---

## 6. Skills & Tech Stack

### Languages
Python, JavaScript, TypeScript, HTML, CSS, SQL, VBA

### Frontend
React, Next.js, Tailwind CSS, TypeScript, JavaScript

### Backend
Flask, FastAPI, Node.js, Python

### Databases
PostgreSQL, MongoDB, MySQL, Supabase, Prisma ORM

### AI & Automation
Claude, ChatGPT, Gemini, Paperclip AI, OpenRouter, DeepSeek, n8n, OpenClaw, Hermes, Ollama, Claude Code, Codex

### Data & Analysis
Pandas, NumPy, Matplotlib, Seaborn — EDA, data visualisation, statistical analysis

### DevOps & Tools
Git, GitHub, Docker, Vercel, Hostinger, VS Code, Base44, Google Sheets, Excel, Power Query

### QA
Manual testing, bug documentation, test workflow design, n8n QA automation

### Soft Skills
Leadership, communication, analytical thinking, initiative, adaptable, coachable, open to feedback

---

## 7. Certifications (7 total)

1. **Civil Service Examination Passer — Professional** (2024)
2. **Google AI Essentials** — Coursera (2026)
3. **Cisco — Data Science Essentials with Python**
4. **Cisco — Python Essentials 1**
5. **Cisco — Apply AI: Analyse Customer Reviews**
6. **Cisco — Introduction to Cybersecurity**
7. **DICT — Cloud and DevOps Basics**

---

## 8. Education

| Degree | Institution | Period |
|---|---|---|
| BS Information Technology | Iloilo Science and Technology University (ISAT U) | Aug 2022 – Present |
| Senior High School — STEM, With High Honors | University of San Agustin | 2020 – 2022 |

**Activities**: ISAT U Performing Arts — Lead Guitarist and Band Leader (2022 – Present)
**Dean's Lister**: A.Y. 2022-2023 and A.Y. 2023-2024

---

## 9. Services Offered

1. **Full-Stack Development** — Next.js, React, FastAPI, Node.js production systems
2. **Agentic AI Systems** — LLM integration, autonomous agent design, AI orchestration
3. **Web Solutions** — Responsive, scalable web applications with modern tech stacks
4. **Quality Assurance** — Software testing, bug tracking, workflow optimization
5. **Process Automation** — n8n workflows, AI-driven systems, OpenClaw orchestration
6. **Data Solutions** — Analytics, visualisation, and data storytelling

---

## 10. Portfolio Page Sections (reference for edits)

| Page | Sections | Data Source |
|---|---|---|
| `/` (Home) | Hero, Showreel (autoplay video), Skills v2, Services, Certifications carousel, Tools showcase | `index_data.py`, `tools_data.py`, `static/Videos/portfolio-showreel.mp4` |
| `/about` | Intro + photo, Stats strip, Chips marquee, Spotlight cards, Guitar pull-quote, CTA | `index_data.py` → `get_about_content()` |
| `/projects` | Project cards + modals | `projects_data.py` |
| `/documents` | CV (Oxford) + Resume (ATS) tabs, Save/Print PDF | `cv_document.html`, `resume_document.html` |

### Landing Showreel (2026-05-25)
- 30s autoplay / muted / loop video on `/`, placed between the Hero and the tool marquee. Markup: `<section class="showreel">` in [templates/index.html](templates/index.html); styles `.showreel__frame` / `.showreel__video` in [static/styles.css](static/styles.css) (16:9, glass frame, glow — mirrors `.hero-v3__photo-wrap`).
- Assets: [static/Videos/portfolio-showreel.mp4](static/Videos/portfolio-showreel.mp4) + poster [static/images/showreel-poster.jpg](static/images/showreel-poster.jpg).
- **Source project**: `remotion-landing/` (Remotion + React + TypeScript; not deployed, source only). Composition id `PortfolioShowreel` (1920×1080, 30fps, 900 frames). 5 scenes: Intro → Title → Projects (ARIA · Hermes · DriveXP · OpenClaw, browser-framed) → Stack (marquee + stat counters) → CTA (portrait). Design tokens mirror the site (Kameron font, `#08090d` bg, `#4361ee → #a584ff → #f5b14a` gradient). Re-render: `cd remotion-landing && npx remotion render PortfolioShowreel out/portfolio-showreel.mp4`, then copy to `static/Videos/`.

### Skills v2 Card System
Each skill in `get_skills()` carries: `title`, `description`, `icon` (lucide key), `accent` (hex), `tools` (list), `proficiency` (1–5), `years` (string). Card uses `--skill-accent` CSS var + `color-mix()` for icon bg, dots, chip hover.

### About Page (current design — 2026-05-20)
- Section 5 "Beyond Tech": two-column editorial layout — `guitar.jpg` (left, styled photo card with `.about-v3__photo-tag` pill "Guitarist · Multiple contest wins") + pull-quote/byline (right)
- Mobile ≤768px: stacks single-column, photo centered max-width 360px

### CV (current design — 2026-05-22, Oxford format)
- Section order: Header → Professional Summary → Education → Relevant Experience → Projects → Skills → Certifications → Awards → Training
- Skills: single-column `.cv-skills-inline` rows with bold category labels
- Dates: right-aligned (`.cv-edu-right`), role/org left-aligned (`.cv-edu-left`)

---

## 11. Workflow Guardrails

- **Always update KB + PORTFOLIO_LOGS.md** on the same turn as any content change
- **CV and resume stay in sync** with `projects_data.py` — agent counts, project names, key metrics must match
- **Commit style**: `feat:`, `fix:`, `refactor:` conventional commits
- **Never push without user approval** — ask every time
- **Never commit `.env`** — GMAIL credentials are gitignored
- **Verify live with Playwright** after every deploy — push first, then check live URL; never simulate CSS locally before pushing
- **Mobile CSS**: append at END of `styles.css`, never edit desktop rules

### Seniority Rule (IMPORTANT)
Hanz is **mid-level**, not senior. Do NOT use "senior", "senior-level", or equivalent in cover letters, applications, LinkedIn copy, or salary anchoring. Use "mid-level", "experienced full-stack developer", "hands-on builder", or just describe shipped work. His title "Lead Full-Stack Developer" is a role name at Zilla Media, not a seniority claim.

### GitHub Accounts (IMPORTANT)
Two accounts exist on this machine:
- **HanzDLC** — owns the portfolio repo (`HanzDLC/MyPortfolio`, public). Noreply: `144861507+HanzDLC@users.noreply.github.com`. **This is the correct account.**
- **internz2026-sys** — associated with `internz.2026@gmail.com`. Do NOT author commits with this email — Vercel will reject.

Before every push: confirm `git remote -v` points to `HanzDLC/MyPortfolio` and `git config user.email` is the HanzDLC noreply. If push fails with "Repository not found", surface the error — do NOT retry blindly.

### Vercel Commit Email (IMPORTANT)
Commit author email MUST be `144861507+HanzDLC@users.noreply.github.com` for Vercel to accept the deploy. Local git is already configured this way — do NOT change it. If Vercel still blocks after correct author email and public repo, the fix is: delete the Vercel project and re-import under the HanzDLC-linked Vercel login (incognito window → sign in with HanzDLC GitHub → re-add custom domain + env vars).

---

**Last Updated**: 2026-05-22 (auto-refreshed on idle)
**Portfolio Status**: Active — chat with Claude Code on this folder for updates

---

## Recent Changes (Auto-Updated)

_Pulled from PORTFOLIO_LOGS.md on idle — last 5 entries._

## 2026-05-20 — About page: guitar photo + editorial pull-quote redesign
- Files: [templates/about.html](templates/about.html), [static/styles.css](static/styles.css), [templates/base.html](templates/base.html), new `static/images/About/guitar.jpg`.
- "Beyond Tech" section (section 5) was a plain centered pull-quote with no image. Rebuilt it as a two-column editorial layout: `guitar.jpg` on the left in a styled photo card (rounded 18px, bordered, 4/5 ratio, shadow, hover lift + slight rotate, reused `.about-v3__photo-tag` pill = "Guitarist · Multiple contest wins"), quote + byline on the right, left-aligned with the oversized quote mark.
- No `data-parallax` on the new media (about.html doesn't load redesign-fx.js anyway) — avoids the hero-style transform/overlap risk.
- Mobile (`@media ≤768px`): stacks single-column, photo centered max-width 360px, text/eyebrow re-centered, quote mark re-centered. 480px inherits.
- Cache-buster `v=2.7` → `v=2.8`.
- Commit: pending.

## 2026-05-20 — Mobile: kill hero photo parallax that covered the text
- Files: [static/styles.css](static/styles.css), [templates/base.html](templates/base.html).
- Playwright confirmed `.hero-v3__visual` had `transform: matrix(1,0,0,1,0,-563.2)` — the JS scroll-parallax (`redesign-fx.js` reading `data-parallax="0.08"`) translating the photo UP ~563px so it overlapped `.hero-v3__content` at every scroll position on the stacked mobile layout (equal z-index:5, photo later in DOM → painted over the text).
- Fix (CSS-only, no JS change): in `@media (max-width:768px)` set `.hero-v3__visual / [data-parallax] / .hero-v3__photo-wrap(.is-floating) { transform:none !important; animation:none !important; }` (CSS `!important` overrides the JS inline transform). Hardened stacking: content `z-index:6`, visual `z-index:1`. Photo now stays in normal flow below the text.
- Cache-buster `v=2.6` → `v=2.7`. Desktop parallax untouched.
- Commit: pending.

## 2026-05-20 — Mobile: stop sticky header covering content + icon resolution
- Files: [static/styles.css](static/styles.css), [tools_data.py](tools_data.py), [templates/base.html](templates/base.html).
- **Scroll-covering fix:** Playwright `elementsFromPoint` confirmed the sticky `.site-header` (z-index 1000, 66px, bg rgba(8,9,13,0.92) + blur(20px) backdrop) overlays content (hero photo + sections below) as you scroll on mobile. Added `header,.site-header,.site-header.is-scrolled { position: static !important; }` inside the existing `@media (max-width:768px)` block — header scrolls away with the page on phones; desktop sticky nav untouched. CSS-only, no JS/markup change.
- **FastAPI icon:** root cause was the generic `if "api" in name_lower` branch matching "fastapi" first (substring) → moved a `fastapi` check above it; removed the dead duplicate. Now `cdn.simpleicons.org/fastapi/009688`, verified rendering live.
- **Codex icon:** simpleicons removed the `openai` slug; lobehub's openai.svg is a `currentColor`/`1em` glyph (invisible in `<img>`). Switched to the ChatGPT blossom Wikimedia SVG already proven rendering on the site (Codex is an OpenAI product). 
- Cache-buster `v=2.5` → `v=2.6`.
- Approach (answer to "refactor mobile without touching desktop/logic"): all changes are CSS overrides scoped to `@media (max-width:768/480px)` appended at end of styles.css; no HTML/JS edits; verified on the live Vercel deploy via Playwright DOM measurement.
- Commit: pending.

## 2026-05-20 — Fix FastAPI icon + wrap long tool names
- Files: [tools_data.py](tools_data.py), [static/styles.css](static/styles.css), [templates/base.html](templates/base.html).
- FastAPI showcase icon was broken in-browser (devicon jsdelivr SVG not rendering). Swapped to `https://cdn.simpleicons.org/fastapi/009688` (Simple Icons — reliable single-path SVG for `<img>` embedding).
- `.tool-logo-name` was truncating long names ("Hermes Su…") via `white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:90px`. Changed to `white-space:normal; overflow-wrap/word-break:break-word; max-width:100%` so names wrap to multiple lines under the icon. Mobile override `max-width:72px` → `100%`. Both duplicate rule instances updated.
- Cache-buster `v=2.4` → `v=2.5`.
- Commit: pending.

## 2026-05-19 — Mobile responsive overhaul (v3 sections) + content updates
- Files: [static/styles.css](static/styles.css), [templates/base.html](templates/base.html), [projects_data.py](projects_data.py), [tools_data.py](tools_data.py), [PORTFOLIO_KB.md](PORTFOLIO_KB.md).
- **Mobile fix:** the v3 editorial sections (hero-v3, marquee, Selected Works, projects-hero-v3, project cards, certifications sticky-scroll, about-v3) had NO mobile breakpoint. Root cause: `.hero-v3` is a fixed grid `minmax(0,560px) minmax(0,414px)` with `gap:250px`, so on a 375px phone the content block was ~563px and clipped on both sides (Playwright-measured: `.hero-v3__content` left:-94 right:469 at vw 375). Appended a consolidated `@media (max-width:768px)` + `@media (max-width:480px)` block at the END of styles.css (wins equal-specificity cascade over old @media blocks). Built via 3 parallel selector-lane agents (hero / works+marquee+sections / projects+about+certs) returning CSS text; orchestrator assembled + wrote once (no file conflicts).
- Hero now single-column (text over photo), display heading clamps down to ~28–40px, meta row wraps then stacks, buttons full-width on ≤480px, chip cluster hidden, drift blobs shrunk. Works grid → 1 col. Certs sticky-scroll neutralized into a native swipe carousel on mobile (kills the 300vh horizontal-overflow risk). Project cards → full width. About-v3 fully single-column.
- Cache-buster bumped `styles.css?v=2.3` → `?v=2.4` so the new CSS isn't served stale.
- **School MIS status:** changed from "Ongoing MVP / Ongoing Development" to "Completed / Delivered" in projects_data.py (title, card/modal descriptions, impact chips) and PORTFOLIO_KB.md — user confirmed the school system is finished, not an ongoing MVP.
- **Tools showcase:** added FastAPI (icon mapping already existed) and Codex (new OpenAI-mark icon branch) to `get_all_tools_with_icons()`; added Codex + FastAPI to the KB Tools & Platforms list.
- Verification: pushed first, then Playwright-checks the live deployed site at 375px (per the verify-after-deploy workflow).
- Commit: pending.
