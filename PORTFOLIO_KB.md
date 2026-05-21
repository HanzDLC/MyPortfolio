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
| Work Email (REDACTED) | hanz@weREDACTED.com |
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

### AI Specialist — REDACTED AI (May 2026 – Present, Remote)
- Onboarded May 2026 with REDACTED (CEO) and the REDACTED team
- Focus: AI-driven workflows, automation, and prompt systems for the business
- Work email provisioned: hanz@weREDACTED.com

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
| `/` (Home) | Hero, Skills v2, Services, Certifications carousel, Tools showcase | `index_data.py`, `tools_data.py` |
| `/about` | Intro + photo, Stats strip, Chips marquee, Spotlight cards, Guitar pull-quote, CTA | `index_data.py` → `get_about_content()` |
| `/projects` | Project cards + modals | `projects_data.py` |
| `/documents` | CV (Oxford) + Resume (ATS) tabs, Save/Print PDF | `cv_document.html`, `resume_document.html` |

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
- **Verify live with Playwright** after every deploy — push first, then check live URL
- **Mobile CSS**: append at END of `styles.css`, never edit desktop rules
- **Account note**: GitHub push must use HanzDLC noreply email. User has multiple GitHub accounts — confirm before push.

---

**Last Updated**: 2026-05-22
**Portfolio Status**: Active — chat with Claude Code on this folder for updates
