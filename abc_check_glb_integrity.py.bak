import os
from pathlib import Path

MODELS = Path(__file__).resolve().parent / "public" / "models"
if not MODELS.exists():
    print(f"❌ Models folder not found: {MODELS}")
    exit(1)

def is_valid_glb(path):
    try:
        with open(path, "rb") as f:
            magic = f.read(4)
            return magic == b'glTF'
    except Exception as e:
        print(f"⚠️ Error reading {path.name}: {e}")
        return False

corrupt = []
print(f"\n🔎 Scanning: {MODELS}\n")
for file in MODELS.glob("*.glb"):
    if not file.is_file() or file.stat().st_size == 0:
        print(f"❌ Empty or missing file: {file.name}")
        corrupt.append(file.name)
        continue
    if not is_valid_glb(file):
        print(f"❌ Not a valid GLB: {file.name}")
        corrupt.append(file.name)
    else:
        print(f"✅ {file.name} is a valid GLB.")

if not corrupt:
    print("\n🎉 All .glb files in /public/models/ passed integrity check.")
else:
    print("\n🛑 The following files failed integrity checks:")
    for f in corrupt:
        print("   -", f)
