import objaverse
import os
import json
import shutil

QUERY = os.environ.get("OBJAVERSE_QUERY", "paint tube").lower()
DEST_FOLDER = "public/models/"
RESULT_FILE = "public/search_results.json"

uids = objaverse.load_uids()
annotations = objaverse.load_annotations(uids[:500])

results = []
for ann in annotations:
    if QUERY in ann["name"].lower() and ann["asset_type"] == "glb":
        out_path = os.path.join(DEST_FOLDER, f"{ann['uid']}.glb")
        if not os.path.exists(out_path):
            objaverse.download_objects([ann['uid']], download_dir=DEST_FOLDER)
        results.append({
            "name": ann["name"],
            "path": f"/models/{ann['uid']}.glb"
        })
        if len(results) >= 5:
            break

with open(RESULT_FILE, "w") as f:
    json.dump(results, f, indent=2)

print(f"✅ Downloaded {len(results)} model(s) matching '{QUERY}'")