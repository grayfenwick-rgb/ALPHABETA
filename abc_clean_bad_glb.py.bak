import os
from pathlib import Path
import shutil

MODELS = Path(__file__).resolve().parent / "public" / "models"
BAD_BACKUP = MODELS / "_bad_glb_backup"
BAD_BACKUP.mkdir(exist_ok=True)

def is_valid_glb(path):
    try:
        with open(path, "rb") as f:
            magic = f.read(4)
            return magic == b'glTF'
    except Exception as e:
        print(f"⚠️ Error reading {path.name}: {e}")
        return False

removed = []
print(f"\n🔎 Scanning: {MODELS}\n")
for file in MODELS.glob("*.glb"):
    if not file.is_file() or file.stat().st_size == 0:
        print(f"❌ Empty or missing file: {file.name}")
        shutil.move(str(file), BAD_BACKUP / file.name)
        removed.append(file.name)
        continue
    if not is_valid_glb(file):
        print(f"❌ Not a valid GLB: {file.name} (moving to backup)")
        shutil.move(str(file), BAD_BACKUP / file.name)
        removed.append(file.name)
    else:
        print(f"✅ {file.name} is a valid GLB.")

if not removed:
    print("\n🎉 All .glb files in /public/models/ passed integrity check.")
else:
    print("\n🛑 The following bad/corrupt files were moved to _bad_glb_backup and removed from main folder:")
    for f in removed:
        print("   -", f)
