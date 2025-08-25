import os, shutil, datetime, sys

# === USER CONFIG ===
TARGETS = [
    "components",     # Directory to backup/restore (all .tsx)
    # Add other files if you wish, eg:
    # "pages/index.tsx", 
    # "lib/ThemeContext.tsx"
]

BACKUP_ROOT = "abc_backups"

def nowstamp():
    return datetime.datetime.now().strftime("%Y-%m-%d_%H%M%S")

def make_backup(backup_dir):
    os.makedirs(backup_dir, exist_ok=True)
    for t in TARGETS:
        if os.path.isdir(t):
            shutil.copytree(t, os.path.join(backup_dir, t))
        elif os.path.isfile(t):
            shutil.copy2(t, backup_dir)

def restore_backup(backup_dir):
    for t in TARGETS:
        src = os.path.join(backup_dir, t)
        if os.path.exists(src):
            if os.path.isdir(src):
                if os.path.exists(t): shutil.rmtree(t)
                shutil.copytree(src, t)
            else:
                shutil.copy2(src, t)
    print(f"Restored from backup: {backup_dir}")

def list_backups():
    if not os.path.isdir(BACKUP_ROOT): return []
    return sorted([f for f in os.listdir(BACKUP_ROOT) if os.path.isdir(os.path.join(BACKUP_ROOT, f))])

if __name__ == "__main__":
    os.makedirs(BACKUP_ROOT, exist_ok=True)
    if "--restore" in sys.argv:
        print("Available backups:")
        for i, b in enumerate(list_backups()):
            print(f" [{i}] {b}")
        idx = int(input("Enter backup number to restore: "))
        restore_backup(os.path.join(BACKUP_ROOT, list_backups()[idx]))
    else:
        backup_name = f"backup_{nowstamp()}"
        backup_dir = os.path.join(BACKUP_ROOT, backup_name)
        make_backup(backup_dir)
        print(f"Backup complete: {backup_dir}")
        print("Now apply your code changes.")
