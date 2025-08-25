import os
import re

folder = "components"
for fname in os.listdir(folder):
    if fname.endswith(".tsx"):
        fpath = os.path.join(folder, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            code = f.read()
        # Fix common style syntax: style={a:1,b:2} -> style={{a:1,b:2}}
        new_code = re.sub(
            r"style=\{([^{}]+)\}", 
            r"style={{\1}}", 
            code
        )
        if new_code != code:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_code)
            print(f"✔️ Fixed style in {fname}")
        else:
            print(f"✔️ {fname} had no bad style prop")
print("All style props fixed.")
