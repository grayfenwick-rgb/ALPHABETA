import os
import re
import shutil
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent
COMP = ROOT / "components"
PUB  = ROOT / "public"
DESK = PUB / "desk"
STYLES = ROOT / "styles"
GLOBAL_CSS = STYLES / "global.css"
WS = COMP / "WorkspaceStudio.tsx"

SNAP_ROOT = ROOT / "__snapshots__"
STAMP = datetime.now().strftime("%Y%m%d-%H%M%S")
SNAP_DIR = SNAP_ROOT / STAMP

def snap_file(p: Path):
    """Save a timestamped backup of file p (keeping its relative path)."""
    if not p.exists():
        return
    rel = p.relative_to(ROOT)
    dest = SNAP_DIR / rel.parent
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copy2(p, dest / rel.name)

def write_file(p: Path, content: str):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.strip() + "\n", encoding="utf-8")

def safe_replace_in_file(p: Path, pattern: re.Pattern, repl: str) -> bool:
    """Regex replace (first match). Returns True if changed."""
    text = p.read_text(encoding="utf-8")
    m = pattern.search(text)
    if not m:
        return False
    snap_file(p)
    new_text = pattern.sub(repl, text, count=1)
    p.write_text(new_text, encoding="utf-8")
    return True

def ensure_import_and_mount_desk_covers():
    """
    Inject:
      import DeskCovers from './DeskCovers';
    …and mount <DeskCovers /> inside top-level container of WorkspaceStudio.
    We try a few robust patterns; always backup before touching.
    """
    if not WS.exists():
        raise SystemExit(f"Workspace file not found: {WS}")

    src = WS.read_text(encoding="utf-8")

    # 1) Ensure import
    if "from './DeskCovers'" not in src:
        snap_file(WS)
        # insert after FloatingPanel import line if found, else after first import block
        if "from './FloatingPanel'" in src:
            src = src.replace("from './FloatingPanel';", "from './FloatingPanel';\nimport DeskCovers from './DeskCovers';")
        else:
            # insert after last import line
            lines = src.splitlines()
            idx = 0
            for i, line in enumerate(lines):
                if line.strip().startswith("import "):
                    idx = i
            lines.insert(idx + 1, "import DeskCovers from './DeskCovers';")
            src = "\n".join(lines)
        WS.write_text(src, encoding="utf-8")

    # 2) Mount <DeskCovers /> near the end of the root container
    src = WS.read_text(encoding="utf-8")
    if "<DeskCovers />" in src:
        return  # already mounted

    # Try to inject before the last closing </div> in the return tree
    # Find the main return block
    m = re.search(r"return\s*\(\s*(.*?)\s*\);\s*\}", src, flags=re.S)
    if not m:
        # fallback: append at end (still functional)
        snap_file(WS)
        src = src.rstrip() + "\n\n// Auto-mounted by abc_desk_objects_setup\n// If this is not inside the main root, move it manually.\n<DeskCovers />\n"
        WS.write_text(src, encoding="utf-8")
        return

    block = m.group(1)
    # Place <DeskCovers /> before the last </div> in the return block
    if "</div>" in block:
        snap_file(WS)
        last_close = block.rfind("</div>")
        injected = block[:last_close] + "  \n      <DeskCovers />\n" + block[last_close:]
        new_src = src[:m.start(1)] + injected + src[m.end(1):]
        WS.write_text(new_src, encoding="utf-8")
    else:
        # fallback append (rare)
        snap_file(WS)
        new_src = src.replace(block, block + "\n      <DeskCovers />\n")
        WS.write_text(new_src, encoding="utf-8")

def ensure_css():
    """Add subtle hover/peel styles (once) into global.css."""
    css_snippet = """
/* === Desk Object styles (ABC) === */
.abc-desk-object {
  position: absolute;
  width: 96px;
  image-rendering: auto;
  cursor: pointer;
  transition: transform 140ms ease, filter 120ms ease, opacity 150ms ease;
  will-change: transform, filter, opacity;
}

.abc-desk-object:hover {
  transform: translateY(-1px) scale(1.02);
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
}

/* subtle peel/reveal animation after click */
@keyframes abc-peel {
  0%   { transform: rotateX(0) translateY(0); opacity: 1; }
  60%  { transform: rotateX(20deg) translateY(-6px); opacity: .7; }
  100% { transform: rotateX(45deg) translateY(-12px); opacity: 0; }
}

.abc-peel-out {
  animation: abc-peel 260ms ease forwards;
}
"""
    if not GLOBAL_CSS.exists():
        return  # don't create file if project handles CSS elsewhere
    text = GLOBAL_CSS.read_text(encoding="utf-8")
    if "/* === Desk Object styles (ABC) === */" in text:
        return
    snap_file(GLOBAL_CSS)
    GLOBAL_CSS.write_text(text.rstrip() + "\n\n" + css_snippet.strip() + "\n", encoding="utf-8")

def write_components():
    # DeskObject.tsx
    desk_object = r"""
'use client';
import React, { useRef } from 'react';

type Props = {
  imageSrc: string;
  alt: string;
  onActivate: () => void;
  style?: React.CSSProperties;
};

export default function DeskObject({ imageSrc, alt, onActivate, style }: Props) {
  const ref = useRef<HTMLImageElement | null>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.classList.add('abc-peel-out');
      // Let the animation run, then activate
      setTimeout(() => {
        onActivate();
      }, 220);
    } else {
      onActivate();
    }
  };

  return (
    <img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className="abc-desk-object"
      onClick={handleClick}
      style={style}
      draggable={false}
    />
  );
}
""".strip()

    # DeskCovers.tsx
    desk_covers = r"""
'use client';
import React, { useEffect, useState } from 'react';
import FloatingPanel from './FloatingPanel';
import ToolsPanel from './ToolsPanel';
import ThreeViewer from './ThreeViewer';
import DeskObject from './DeskObject';

const LS_KEY = 'abc-desk-covers';

type CoversState = {
  showTools: boolean;
  showViewer: boolean;
};

const defaultState: CoversState = { showTools: false, showViewer: false };

export default function DeskCovers() {
  const [state, setState] = useState<CoversState>(defaultState);

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CoversState;
        setState({ ...defaultState, ...parsed });
      }
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <>
      {!state.showTools && (
        <DeskObject
          imageSrc="/desk/cup.png"
          alt="Coffee Mug"
          onActivate={() => setState(s => ({ ...s, showTools: true }))}
          style={{ bottom: 80, left: 100, zIndex: 5 }}
        />
      )}

      {!state.showViewer && (
        <DeskObject
          imageSrc="/desk/postit.png"
          alt="Post-it Note"
          onActivate={() => setState(s => ({ ...s, showViewer: true }))}
          style={{ bottom: 110, left: 230, zIndex: 5 }}
        />
      )}

      {state.showTools && (
        <FloatingPanel
          id="ToolsPanel"
          title="Tools Panel"
          defaultPos={{ x: 120, y: 80 }}
          defaultSize={{ width: 360, height: 320 }}
          allowFullscreen={true}
        >
          <ToolsPanel />
        </FloatingPanel>
      )}

      {state.showViewer && (
        <FloatingPanel
          id="ThreeViewer"
          title="Three Viewer"
          defaultPos={{ x: 520, y: 100 }}
          defaultSize={{ width: 540, height: 420 }}
          allowFullscreen={true}
        >
          <ThreeViewer />
        </FloatingPanel>
      )}
    </>
  );
}
""".strip()

    # write files (with snapshots if they already exist)
    for rel, content in {
        "DeskObject.tsx": desk_object,
        "DeskCovers.tsx": desk_covers,
    }.items():
        dest = COMP / rel
        if dest.exists():
            snap_file(dest)
        write_file(dest, content)

def copy_images():
    """Copy cup.png & postit.png from script directory into /public/desk/"""
    DESK.mkdir(parents=True, exist_ok=True)
    for name in ["cup.png", "postit.png"]:
        src = ROOT / name
        if not src.exists():
            print(f"⚠  Missing image next to script: {name}  (Put your cleaned PNG here)")
            continue
        dest = DESK / name
        snap_file(dest)
        shutil.copy2(src, dest)
        print(f"✅ Copied {name} -> {dest.relative_to(ROOT)}")

def write_revert_script():
    """Write a helper script that restores the latest snapshot directory."""
    dest = ROOT / "abc_revert_last_snapshot.py"
    if dest.exists():
        snap_file(dest)
    code = r'''
import os, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SNAPS = ROOT / "__snapshots__"

def main():
    if not SNAPS.exists():
        print("No snapshots found.")
        return
    dirs = sorted([d for d in SNAPS.iterdir() if d.is_dir()], reverse=True)
    if not dirs:
        print("No snapshots found.")
        return
    latest = dirs[0]
    print(f"Restoring snapshot: {latest.name}")
    for snap_file in latest.rglob("*"):
        if snap_file.is_dir():
            continue
        rel = snap_file.relative_to(latest)
        target = ROOT / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(snap_file, target)
        print("  restored:", rel.as_posix())
    print("✔ Done.")

if __name__ == "__main__":
    main()
'''.strip()
    write_file(dest, code)

def main():
    SNAP_DIR.mkdir(parents=True, exist_ok=True)
    write_components()
    ensure_import_and_mount_desk_covers()
    ensure_css()
    copy_images()
    write_revert_script()

    print("\n=== ABC Desk Objects Setup ===")
    print(f"Snapshot saved to: {SNAP_DIR.relative_to(ROOT)}")
    print("Created/updated:")
    print("  components/DeskObject.tsx")
    print("  components/DeskCovers.tsx")
    print("  (wired) components/WorkspaceStudio.tsx  ->  + import/mount <DeskCovers />")
    if GLOBAL_CSS.exists():
        print("  styles/global.css  ->  + desk object styles")
    print("  public/desk/cup.png   (if provided)")
    print("  public/desk/postit.png (if provided)")
    print("\nRollback any time:\n  python abc_revert_last_snapshot.py\n")

if __name__ == "__main__":
    main()
