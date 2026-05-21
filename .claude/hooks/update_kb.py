#!/usr/bin/env python3
"""
Auto-updates PORTFOLIO_KB.md after 5 minutes of idle.
Called by update-kb-on-idle.ps1 only when the user has been idle long enough.
Updates: "Last Updated" date + "Recent Changes" section at the bottom.
"""
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent  # Flask Python Portfolio/


def get_recent_logs(n=5):
    logs_path = ROOT / "PORTFOLIO_LOGS.md"
    if not logs_path.exists():
        return "_No log entries found._"
    content = logs_path.read_text(encoding="utf-8")
    # Split on ## YYYY-MM-DD headers
    entries = re.split(r'\n(?=## \d{4}-\d{2}-\d{2})', content)
    entries = [e.strip() for e in entries if re.match(r'^## \d{4}-\d{2}-\d{2}', e.strip())]
    recent = entries[:n]
    return "\n\n".join(recent) if recent else "_No dated log entries found._"


def update_kb():
    kb_path = ROOT / "PORTFOLIO_KB.md"
    if not kb_path.exists():
        print("[update_kb.py] PORTFOLIO_KB.md not found — skipping.")
        return

    content = kb_path.read_text(encoding="utf-8")
    today = datetime.now().strftime("%Y-%m-%d")

    # Update Last Updated line
    content = re.sub(
        r'\*\*Last Updated\*\*:.*',
        f'**Last Updated**: {today} (auto-refreshed on idle)',
        content
    )

    # Build new Recent Changes section
    recent = get_recent_logs(5)
    new_section = (
        f"## Recent Changes (Auto-Updated)\n\n"
        f"_Pulled from PORTFOLIO_LOGS.md on idle — last 5 entries._\n\n"
        f"{recent}\n"
    )

    # Replace existing section or append
    marker = "\n## Recent Changes (Auto-Updated)"
    if marker in content:
        cut = content.index(marker)
        content = content[:cut].rstrip() + "\n\n" + new_section
    else:
        content = content.rstrip() + "\n\n---\n\n" + new_section

    kb_path.write_text(content, encoding="utf-8")
    print(f"[update_kb.py] PORTFOLIO_KB.md refreshed at {today}.")


if __name__ == "__main__":
    update_kb()
