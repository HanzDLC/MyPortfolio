---
name: ARIA canonical spec
description: Current ARIA description used across portfolio, CV, and resume
type: project
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
**ARIA (AI Runs It All)** — Full-stack AI marketing platform with **6 specialized autonomous agents**:
1. CEO
2. Content Writer
3. Email Marketer
4. Social Manager
5. Ad Strategist
6. Media

**Stack**: Next.js 14, FastAPI, Supabase, Paperclip AI orchestration, Socket.IO real-time updates.

**Recent wins (as of 2026-03-29)**:
- Paperclip overhaul cut CEO chat latency ~3x (10–30s → 1–4s) by bypassing Paperclip for conversational turns.
- Hardened sub-agent delegation with per-issue adaptive watcher (1–4s poll), placeholder inbox rows, updates on reply.
- Structured email drafting for Gmail sending.
- Self-healing Claude CLI config (atomic restore from backups on auth file rotation).

**Source of truth**: `C:\Users\Admin\Documents\ARIA` (README lists 18 agents across 6 departments for the broader SaaS vision; the portfolio-facing description focuses on the 6 marketing agents currently running in `backend/agents/`).

**Why:** This is the exact wording currently reflected in projects_data.py, cv_document.html, and resume_document.html. **How to apply:** If ARIA changes, update this memory and all three content surfaces together.
