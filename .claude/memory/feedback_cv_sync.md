---
name: Keep projects_data, CV, and resume in sync
description: Any project-level fact change must be reflected in all three content surfaces
type: feedback
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
When a project fact changes (agent count, stack, key metric, project name), update **all three** files in the same turn:
1. `projects_data.py` (card + modal)
2. `templates/cv_document.html`
3. `templates/resume_document.html`

**Why:** Past divergence bit us — CV still said "5 agents" after portfolio was updated to 6 for ARIA. The three surfaces are read by different audiences (portfolio site, printed CV, printed resume) so drift is invisible until a recruiter sees it.

**How to apply:** Before reporting any project update as done, grep all three files for the old value (e.g. "5 agents") and confirm zero matches remain. Also update `PORTFOLIO_KB.md`'s relevant section and append a PORTFOLIO_LOGS.md entry.
