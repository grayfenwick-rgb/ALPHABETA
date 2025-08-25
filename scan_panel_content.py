import os

folder = "components"
panels = ["WorkspaceStudio.tsx", "FloatingPanel.tsx", "FontSelector.tsx", "LayerPanel.tsx", "SceneEditor.tsx"]
for p in panels:
    path = os.path.join(folder, p)
    if not os.path.exists(path):
        print(f"❌ {p} is missing")
        continue
    with open(path, encoding="utf-8") as f:
        code = f.read()
    if "auto-restored panel" in code or "Paste your full" in code or "placeholder" in code or len(code.strip()) < 50:
        print(f"⚠️ {p} appears to be a placeholder/stub.")
    else:
        print(f"✔️ {p} looks real (may have functional code).")
