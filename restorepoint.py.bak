import os
import shutil

# === SETTINGS ===
# File types to protect
EXTENSIONS = ['.tsx', '.js', '.py']

def make_restore_points(folder='.'):
    """Backup all code files in this folder as .bak (if not already present)."""
    for fname in os.listdir(folder):
        if not any(fname.endswith(ext) for ext in EXTENSIONS):
            continue
        bak = fname + '.bak'
        if os.path.exists(os.path.join(folder, bak)):
            continue
        shutil.copy2(os.path.join(folder, fname), os.path.join(folder, bak))
        print(f"Backup created: {bak}")

def list_restore_points(folder='.'):
    """List all .bak files available."""
    baks = [f for f in os.listdir(folder) if f.endswith('.bak')]
    if baks:
        print("Restore points found:")
        for f in baks:
            print("  ", f)
    else:
        print("No restore points found.")

def restore_all(folder='.'):
    """Restore all .bak files (overwrite originals)."""
    count = 0
    for fname in os.listdir(folder):
        if fname.endswith('.bak'):
            orig = fname[:-4]
            shutil.copy2(os.path.join(folder, fname), os.path.join(folder, orig))
            print(f"Restored: {orig}")
            count += 1
    if count == 0:
        print("No .bak files found to restore.")

if __name__ == "__main__":
    print("Choose an action:\n 1: Backup all code files\n 2: List restore points\n 3: Restore all .bak files")
    choice = input("Type 1/2/3: ").strip()
    if choice == "1":
        make_restore_points()
    elif choice == "2":
        list_restore_points()
    elif choice == "3":
        restore_all()
    else:
        print("No action taken.")
