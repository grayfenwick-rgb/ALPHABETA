import os

COMPONENTS = [
    "FloatingPanel",
    "FontSelector",
    "LayerPanel",
    "SceneEditor",
    "ThemeContext",
    "WorkspaceStudio",
]

folder = "components"
if not os.path.isdir(folder):
    folder = os.path.join(os.getcwd(), "components")
    if not os.path.isdir(folder):
        print("❌ Could not find components folder.")
        exit(1)

for cname in COMPONENTS:
    fpath = os.path.join(folder, f"{cname}.tsx")
    if not os.path.isfile(fpath):
        print(f"❌ {cname}.tsx not found")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        code = f.read().strip()
    
    # If it's empty or just a useless comment, replace it
    if (
        code == "" or
        "// --- Paste your full" in code or
        "Paste your full" in code or
        code.count("export default") == 0
    ):
        component_code = f"""'use client';
import React from 'react';

const {cname} = () => (
  <div style={{padding:24, color:'#eee', background:'#222'}}>
    <b>{cname}</b> (auto-restored panel)
  </div>
);

export default {cname};
"""
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(component_code)
        print(f"✔️ Fixed {cname}.tsx")
    else:
        print(f"✔️ {cname}.tsx already looks okay")

print("All done. Try npm run dev again!")
