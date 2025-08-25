import shutil, os, datetime

SRC = "components"
DEST = f"_restore_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
if os.path.exists(SRC):
    shutil.copytree(SRC, DEST)
    print(f"✔️ Backup complete: {DEST}")
else:
    print(f"❌ No '{SRC}' folder found!")
