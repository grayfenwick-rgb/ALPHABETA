import os

PATH = os.path.join('pages', 'index.tsx')
if not os.path.exists(PATH):
    print('❌ Could not find pages/index.tsx')
    exit(1)

with open(PATH, 'r', encoding='utf-8') as f:
    code = f.read()

if 'FloatingPanel' not in code:
    code = "import FloatingPanel from '../components/FloatingPanel';\n" + code

# Simple replace for 3 panels as demo (edit if you have more)
replacements = [
    ('<div className="panel layers">', '<FloatingPanel default={{ x: 30, y: 60, width: 260, height: 300 }}>'),
    ('<div className="panel scene-editor">', '<FloatingPanel default={{ x: 320, y: 80, width: 720, height: 440 }}>'),
    ('<div className="panel font-selector">', '<FloatingPanel default={{ x: 1080, y: 110, width: 270, height: 200 }}>'),
    ('</div>', '</FloatingPanel>'),
]

for old, new in replacements:
    code = code.replace(old, new)

with open(PATH + '.bak', 'w', encoding='utf-8') as f:
    f.write(code)

print(f'✔️ panels in index.tsx now wrapped with <FloatingPanel>. Original backed up as index.tsx.bak')
