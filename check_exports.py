import os
import re

components_dir = 'components'

for fname in os.listdir(components_dir):
    if fname.endswith('.tsx'):
        path = os.path.join(components_dir, fname)
        with open(path, encoding='utf-8') as f:
            code = f.read()
            if not re.search(r'export\s+default\s+', code):
                print(f"❌ {fname} is missing a default export!")
