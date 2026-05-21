---
name: push-to-vercel-before-playwright-verification
description: "For portfolio CSS/print changes, push to Vercel first, then verify on the live deployed site with Playwright — don't simulate via injected CSS before pushing."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7cac75eb-d2cd-48d2-a208-ec695ef6faa1
---

When making portfolio changes that need visual/print verification (CSS, resume/CV print layout, page-fit), **push to Vercel first, then verify with Playwright against the live deployed site** — do not verify by injecting simulated CSS onto the old deployed site before pushing.

**Why:** User explicitly corrected this. Injected-CSS simulation can have specificity mismatches vs the real stylesheet (hit this during the resume ATS work — injected styles didn't fully apply). Testing the actual deployed build is reliable; simulating it is not.

**How to apply:**
- Make the change → commit → push to `main` (+ sync `feature`) → wait ~1–2 min for Vercel auto-deploy → Playwright-navigate the live `hanzdlc-portfolio.vercel.app` URL → verify the real rendering.
- Acceptable to do quick local math/Playwright sanity checks while iterating, but the authoritative verification is always on the deployed site after push.
- Relates to [[feedback_no_autopush]] (still get push approval) and [[project_portfolio]].
