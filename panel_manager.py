import os
import shutil
import datetime

# === EDIT THESE ===
FILES = {
    "components/WorkspaceStudio.tsx": """
// --- Paste your full WorkspaceStudio.tsx code here ---
""",
    "components/FloatingPanel.tsx": """
// --- Paste your full FloatingPanel.tsx code here ---
""",
    "components/FontSelector.tsx": """
// --- Paste your full FontSelector.tsx code here ---
""",
    "components/LayerPanel.tsx": """
// --- Paste your full LayerPanel.tsx code here ---
""",
    "components/SceneEditor.tsx": """
// --- Paste your full SceneEditor.tsx code here ---
""",
    # Add other files as needed!
}

BACKUP_DIR = "restore_points"

def backup():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    snap_dir = os.path.join(BACKUP_DIR, timestamp)
    os.makedirs(snap_dir)
    for fname in FILES:
        src = fname
        dst = os.path.join(snap_dir, os.path.basename(fname))
        if os.path.exists(src):
            shutil.copy2(src, dst)
    print(f"Backup complete: {snap_dir}")

def install():
    for fname, code in FILES.items():
        os.makedirs(os.path.dirname(fname), exist_ok=True)
        with open(fname, "w", encoding="utf-8") as f:
            f.write(code.strip() + "\n")
        print(f"Wrote: {fname}")
    print("Install complete.")

def restore():
    snaps = sorted(os.listdir(BACKUP_DIR))
    if not snaps:
        print("No restore points found.")
        return
    print("Available restore points:")
    for i, snap in enumerate(snaps):
        print(f"{i+1}: {snap}")
    choice = input("Restore which? (number): ")
    try:
        idx = int(choice) - 1
        snap_dir = os.path.join(BACKUP_DIR, snaps[idx])
        for fname in FILES:
            src = os.path.join(snap_dir, os.path.basename(fname))
            if os.path.exists(src):
                shutil.copy2(src, fname)
                print(f"Restored: {fname}")
        print("Restore complete.")
    except Exception as e:
        print(f"Restore failed: {e}")

if __name__ == "__main__":
    print("[1] Install new code & backup previous")
    print("[2] Restore from a previous backup")
    action = input("Select action: ")
    if action.strip() == "1":
        backup()
        install()
    elif action.strip() == "2":
        restore()
    else:
        print("No action taken.")
