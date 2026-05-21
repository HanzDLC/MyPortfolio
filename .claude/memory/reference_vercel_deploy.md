---
name: Vercel deploy — commit author requirements
description: Commit email requirements to avoid Vercel "contributing access" blocks on Hobby plan
type: reference
originSessionId: df2ecee4-914a-4fc5-b188-ba070d2552d9
---
For Vercel to accept a deploy on the HanzDLC portfolio, the **commit author email** must resolve to the HanzDLC GitHub user ID. Because "Keep my email addresses private" is ON at github.com/settings/emails, the only email that reliably attributes commits to HanzDLC externally is the noreply:

```
144861507+HanzDLC@users.noreply.github.com
```

Local git is configured with this (`user.name=HanzDLC`, `user.email=144861507+HanzDLC@users.noreply.github.com`). Do not change it.

**Past failures to watch for:**
- Author email `internz.2026@gmail.com` → maps to `internz2026-sys` (wrong account) → Vercel blocks with "commit author does not have contributing access."
- Author email `hdlcruz03@gmail.com` → private on HanzDLC, inconsistent attribution on some external tools.

**If Vercel still blocks after commit author is correct and repo is public**, the cause is Vercel project ownership, not the commit. Fix: delete the Vercel project and re-import under the HanzDLC-linked Vercel login (incognito window, sign in with HanzDLC GitHub). Re-add custom domain and env vars after import.

**GitHub repo**: `HanzDLC/MyPortfolio` (now public as of 2026-04-15).
