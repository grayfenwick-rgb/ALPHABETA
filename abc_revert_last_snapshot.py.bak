import os, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SNAPS = ROOT / "__snapshots__"

def main():
    if not SNAPS.exists():
        print("No snapshots found.")
        return
    dirs = sorted([d for d in SNAPS.iterdir() if d.is_dir()], reverse=True)
    if not dirs:
        print("No snapshots found.")
        return
    latest = dirs[0]
    print(f"Restoring snapshot: {latest.name}")
    for snap_file in latest.rglob("*"):
        if snap_file.is_dir():
            continue
        rel = snap_file.relative_to(latest)
        target = ROOT / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(snap_file, target)
        print("  restored:", rel.as_posix())
    print("✔ Done.")

if __name__ == "__main__":
    main()
