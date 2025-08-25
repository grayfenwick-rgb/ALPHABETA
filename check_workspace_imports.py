import re, os

fn = "components/WorkspaceStudio.tsx"
if not os.path.exists(fn):
    print("❌ WorkspaceStudio.tsx not found.")
    exit(1)

with open(fn, encoding="utf-8") as f:
    code = f.read()
imports = re.findall(r"import\s+\w+\s+from\s+'\.\/([^']+)'", code)
missing = [imp for imp in imports if not os.path.exists(f"components/{imp}.tsx")]

if missing:
    print("❌ Missing components:", missing)
else:
    print("✔️ All imports found.")
