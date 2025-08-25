# autofix_clean.py
import os, re, subprocess, sys, shutil

ROOT = os.path.abspath(os.getcwd())

def sh(args):
    r = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"[!] {' '.join(args)}\n{r.stdout}\n{r.stderr}")
        sys.exit(r.returncode)
    return r.stdout.strip()

def read(p):
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def write(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s)

def exists(p): return os.path.exists(p)
def rm(p):
    try:
        if os.path.isdir(p) and not os.path.islink(p):
            shutil.rmtree(p, ignore_errors=True)
        elif os.path.exists(p):
            os.remove(p)
    except: pass

def resolve_conflicts_keep_first(text:str)->str:
    # keep the block between <<<<<<< and ======= ; drop the rest
    lines = text.splitlines(True)
    out, i, n = [], 0, len(lines)
    while i < n:
        if lines[i].startswith('<<<<<<<'):
            i += 1
            top = []
            while i < n and not lines[i].startswith('======='):
                top.append(lines[i]); i += 1
            while i < n and not lines[i].startswith('>>>>>>>'):
                i += 1
            if i < n: i += 1  # skip >>>>>>>
            out.extend(top)
        else:
            out.append(lines[i]); i += 1
    return ''.join(out)

def fix_file_conflicts(paths):
    for p in paths:
        fp = os.path.join(ROOT, p)
        if not exists(fp): continue
        txt = read(fp)
        if '<<<<<<<' in txt and '=======' in txt and '>>>>>>>' in txt:
            write(fp, resolve_conflicts_keep_first(txt))
            print(f"[fix] conflict markers cleaned: {p}")

def replace_exact(p, before, after):
    fp = os.path.join(ROOT, p)
    if not exists(fp): return
    txt = read(fp)
    if before in txt:
        write(fp, txt.replace(before, after))
        print(f"[fix] replaced in {p}: '{before}' -> '{after}'")

def regex_sub(p, pattern, repl, flags=re.S):
    fp = os.path.join(ROOT, p)
    if not exists(fp): return
    txt = read(fp)
    new = re.sub(pattern, repl, txt, flags=flags)
    if new != txt:
        write(fp, new)
        print(f"[fix] regex updated: {p} ({pattern})")

def ensure_git_clean_repo():
    try:
        sh(["git", "rev-parse", "--is-inside-work-tree"])
    except SystemExit:
        print("[!] Not in a git repo. Run from your project root.")
        sys.exit(1)

def main():
    ensure_git_clean_repo()

    # branch
    current = sh(["git", "rev-parse", "--abbrev-ref", "HEAD"])
    if current != "hotfix/auto-fix":
        sh(["git", "checkout", "-b", "hotfix/auto-fix"])

    # remove junk
    for p in [
        r"pages\api\New Text Document.txt",
        r"pages\api\pagesapifetch.ts",
        r"public\models\desktop.ini",
    ]:
        rm(os.path.join(ROOT, p))
        print(f"[rm] {p}")

    # canonical .gitignore
    write(os.path.join(ROOT, ".gitignore"), "\n".join([
        "node_modules/",
        ".next/",
        ".env*",
        "out/",
        "coverage/",
        ".DS_Store",
        "npm-debug.log",
        "__snapshots__/",
        "_restore_*/",
        "_backup_*/",
        "abc_backups/",
        "backup_*/",
        "*.log",
        ""
    ]))
    print("[fix] .gitignore rewritten")

    # clean conflict markers where present
    conflict_files = [
        r"components\ExportPanel.tsx",
        r"components\PresetPanel.tsx",
        r"components\ResetLayoutPanel.tsx",
        r"components\StyleSelector.tsx",
        r"components\TextureBrowser.tsx",
        r"components\UndoRedoPanel.tsx",
        r"components\FontSelector.tsx",
        r"components\LayerPanel.tsx",
        r".gitignore",
    ]
    fix_file_conflicts(conflict_files)

    # DeskCovers.tsx: remove stray ')}' duplicate before closing fragment
    regex_sub(r"components\DeskCovers.tsx",
              r"\)\}\s*\r?\n\s*\)\}\s*\r?\n\s*</>",
              r")}\n</>")

    # pages/api/desk_place.js: None -> null
    replace_exact(r"pages\api\desk_place.js",
                  "JSON.stringify(registry, None, 2)",
                  "JSON.stringify(registry, null, 2)")

    # WorkspaceStudio.tsx: normalize FloatingPanel props
    regex_sub(r"components\WorkspaceStudio.tsx",
              r"defaultPos\s*=\s*\{\s*x:\s*120\s*,\s*y:\s*100\s*\}\s*[\r\n]+\s*defaultSize\s*=\s*\{\s*w:\s*1180\s*,\s*h:\s*720\s*\}\s*[\r\n]+\s*darkMode\s*=\s*\{true\}",
              r"default={{ x: 120, y: 100, width: 1180, height: 720 }}")

    # ARViewer.tsx: remove useLoader/FontLoader and use URL string
    fp = os.path.join(ROOT, r"components\ARViewer.tsx")
    if exists(fp):
        txt = read(fp)
        txt2 = txt
        # imports
        txt2 = re.sub(r"import\s*\{\s*Canvas\s*,\s*useLoader\s*\}\s*from\s*'@react-three/fiber';",
                      "import { Canvas } from '@react-three/fiber';", txt2)
        txt2 = re.sub(r"import\s*\{\s*FontLoader.*?\}\s*from\s*'three/examples/jsm/loaders/FontLoader\.js';\s*\r?\n", "", txt2)
        # remove useLoader line
        txt2 = re.sub(r"const\s+font_data\s*=\s*useLoader\(FontLoader\s*,\s*font_url\);\s*\r?\n", "", txt2)
        # use url
        txt2 = txt2.replace("font={font_data as unknown as string}", "font={font_url}")
        if txt2 != txt:
            write(fp, txt2)
            print("[fix] ARViewer.tsx imports/font usage normalized")

    # Optional: Keyboard/FontSelector as controlled components — skip code rewrites unless conflicts existed.
    # Commit
    sh(["git", "add", "-A"])
    try:
        sh(["git", "commit", "-m", "autofix: clean markers, normalize panels/APIs, remove junk, fix ARViewer/DeskCovers/desk_place"])
        print("[ok] committed to hotfix/auto-fix")
    except SystemExit:
        print("[i] nothing to commit")

    print("\nDone. To push:\n  git push -u origin hotfix/auto-fix")

if __name__ == "__main__":
    main()
