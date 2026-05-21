---
name: Hermes AI Agent canonical spec
description: Current Hermes description used across portfolio, CV, and resume
type: project
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
**Hermes Agent (Nous Research)** — Self-improving AI agent hub, deployed by the user at Zilla Media.

**Key facts**:
- Migrated all OpenClaw agents into Hermes via `hermes claw migrate`.
- Persistent cross-session memory, built-in cron automations (skills loop).
- Multi-platform messaging gateway: Telegram, Discord, Slack.
- Hermes WebUI set up for browser-based access.

**Source locations on disk**:
- `C:\Users\Admin\hermes-agent-src` — core agent source.
- `C:\Users\Admin\hermes-webui` — WebUI.

**Portfolio images**: `static/images/Hermes/` — `hermes-banner.png`, `hermes-sessions.png`, `hermes-workspace.png`, `hermes1.png`.

**Portfolio category_id**: `agentic-ai-hermes`, modal id `hermes-modal`.

**Why:** Added 2026-03-29, commit `29d53f6`. **How to apply:** Keep in sync with projects_data.py Hermes entry and the Hermes bullet in CV/resume. If source folder or capabilities change, update this memory.
