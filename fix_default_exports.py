import os
import re

components = [
    "FloatingPanel.tsx",
    "FontSelector.tsx",
    "LayerPanel.tsx",
    "SceneEditor.tsx",
    "ThemeContext.tsx",
    "WorkspaceStudio.tsx",
]
for fname in components:
    if not os.path.exists(fname): continue
    with open(fname, "r", encoding="utf-8") as f:
        code = f.read()
    # If there's NO default export, add one at the end
    if "export default" not in code:
        # Try to find the main function or class name
        match = re.search(r'(function|class)\s+([A-Za-z0-9_]+)', code)
        if match:
            cname = match.group(2)
            code += f"\n\nexport default {cname};\n"
            with open(fname, "w", encoding="utf-8") as f:
                f.write(code)
            print(f"✅ Added default export to {fname}")
        else:
            print(f"❌ Could not detect main component in {fname}, skipped.")
    else:
        print(f"✔️ Already has default export: {fname}")
print("All done.")
