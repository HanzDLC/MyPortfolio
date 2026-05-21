#!/usr/bin/env python3
"""
Runs after 5 minutes of idle (called by update-kb-on-idle.ps1).
Does three things:
  1. Refreshes PORTFOLIO_KB.md (Last Updated + Recent Changes section)
  2. Cleans up Playwright screenshots from the project root
  3. Backs up Claude memory files to .claude/memory/ (git-tracked)
"""
import re
import shutil
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent  # Flask Python Portfolio/
MEMORY_SRC = Path.home() / ".claude" / "projects" / "c--Users-Admin-Documents-Flask-Python-Portfolio" / "memory"
MEMORY_BACKUP = ROOT / ".claude" / "memory"


# ── 1. KB REFRESH ─────────────────────────────────────────────────────────────

def get_recent_logs(n=5):
    logs_path = ROOT / "PORTFOLIO_LOGS.md"
    if not logs_path.exists():
        return "_No log entries found._"
    content = logs_path.read_text(encoding="utf-8")
    entries = re.split(r'\n(?=## \d{4}-\d{2}-\d{2})', content)
    entries = [e.strip() for e in entries if re.match(r'^## \d{4}-\d{2}-\d{2}', e.strip())]
    recent = entries[:n]
    return "\n\n".join(recent) if recent else "_No dated log entries found._"


def update_kb():
    kb_path = ROOT / "PORTFOLIO_KB.md"
    if not kb_path.exists():
        print("[update_kb] PORTFOLIO_KB.md not found — skipping.")
        return

    content = kb_path.read_text(encoding="utf-8")
    today = datetime.now().strftime("%Y-%m-%d")

    content = re.sub(
        r'\*\*Last Updated\*\*:.*',
        f'**Last Updated**: {today} (auto-refreshed on idle)',
        content
    )

    recent = get_recent_logs(5)
    new_section = (
        f"## Recent Changes (Auto-Updated)\n\n"
        f"_Pulled from PORTFOLIO_LOGS.md on idle — last 5 entries._\n\n"
        f"{recent}\n"
    )

    marker = "\n## Recent Changes (Auto-Updated)"
    if marker in content:
        cut = content.index(marker)
        content = content[:cut].rstrip() + "\n\n" + new_section
    else:
        content = content.rstrip() + "\n\n---\n\n" + new_section

    kb_path.write_text(content, encoding="utf-8")
    print(f"[update_kb] PORTFOLIO_KB.md refreshed — {today}")


# ── 2. SCREENSHOT CLEANUP ──────────────────────────────────────────────────────

def cleanup_screenshots():
    """Delete Playwright screenshots from the project root (not subdirectories)."""
    deleted = []
    for pattern in ("*.png", "*.jpeg", "*.jpg"):
        for f in ROOT.glob(pattern):
            # Only delete root-level files, not static/images/ etc.
            if f.parent == ROOT:
                f.unlink()
                deleted.append(f.name)

    # Also wipe .playwright-mcp snapshot/console files (keep directory)
    playwright_dir = ROOT / ".playwright-mcp"
    if playwright_dir.exists():
        for f in playwright_dir.iterdir():
            if f.is_file():
                f.unlink()
                deleted.append(f".playwright-mcp/{f.name}")

    if deleted:
        print(f"[update_kb] Cleaned {len(deleted)} screenshot/snapshot file(s).")
    else:
        print("[update_kb] No screenshots to clean.")


# ── 3. MEMORY BACKUP ──────────────────────────────────────────────────────────

def backup_memory():
    """Copy Claude memory files to .claude/memory/ so they're git-tracked."""
    if not MEMORY_SRC.exists():
        print("[update_kb] Memory source not found — skipping backup.")
        return

    MEMORY_BACKUP.mkdir(parents=True, exist_ok=True)
    count = 0
    for src_file in MEMORY_SRC.glob("*.md"):
        dst_file = MEMORY_BACKUP / src_file.name
        shutil.copy2(src_file, dst_file)
        count += 1

    print(f"[update_kb] Backed up {count} memory file(s) to .claude/memory/")


# ── MAIN ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    update_kb()
    cleanup_screenshots()
    backup_memory()
