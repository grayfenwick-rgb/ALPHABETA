import os

# Panels list: (ComponentName, FileName, allowFullscreen)
panels = [
    ("ToolsPanel", "ToolsPanel.tsx", True),
    ("LayerPanel", "LayerPanel.tsx", False),
    ("ThreeViewer", "ThreeViewer.tsx", True),
    ("TextureBrowser", "TextureBrowser.tsx", True),
    ("UndoRedoPanel", "UndoRedoPanel.tsx", False),
    ("ExportPanel", "ExportPanel.tsx", False),
    ("PresetPanel", "PresetPanel.tsx", False),
    ("StyleSelector", "StyleSelector.tsx", True),
    ("Keyboard", "Keyboard.tsx", False),
    ("ResetLayoutPanel", "ResetLayoutPanel.tsx", False)
]

# Boilerplate code per panel
def generate_panel_code(name):
    return f"""'use client';
import React from 'react';

export default function {name}({{ panelState, setPanelState }}) {{
  return (
    <div>
      <h4>{name.replace("Panel", " Panel")}</h4>
      <p>This is the {name} component.</p>
    </div>
  );
}}
"""

# Generate WorkspaceStudio.tsx content
def generate_workspace_studio(panels):
    imports = "\n".join([f"import {name} from './{filename.replace('.tsx', '')}';" for name, filename, _ in panels])
    blocks = "\n".join([
        f"""      <FloatingPanel id="{name}" title="{name.replace('Panel',' Panel')}" allowFullscreen={{ {str(fullscreen).lower()} }} defaultPos={{ {{ x: {100+i*220}, y: 60 }} }}>
        <{name} />
      </FloatingPanel>""" for i, (name, _, fullscreen) in enumerate(panels)
    ])

    return f"""'use client';
import React from 'react';
import FloatingPanel from './FloatingPanel';
{imports}

export default function WorkspaceStudio() {{
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a', overflow: 'hidden' }}>
{blocks}
    </div>
  );
}}
"""

# Main script
def main():
    components_dir = os.path.join(os.getcwd(), "components")
    os.makedirs(components_dir, exist_ok=True)

    # Create each panel component
    for name, filename, _ in panels:
        filepath = os.path.join(components_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(generate_panel_code(name))
        print(f"✔ Created {filename}")

    # Create WorkspaceStudio.tsx
    studio_path = os.path.join(components_dir, "WorkspaceStudio.tsx")
    with open(studio_path, "w", encoding="utf-8") as f:
        f.write(generate_workspace_studio(panels))
    print("✅ Created WorkspaceStudio.tsx")

if __name__ == "__main__":
    main()
