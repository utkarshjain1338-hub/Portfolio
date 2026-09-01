import os
import re

sections_dir = '/home/uzumaki/Documents/Portfolio/src/sections'
files = [f for f in os.listdir(sections_dir) if f.endswith('.tsx')]

for file in files:
    file_path = os.path.join(sections_dir, file)
    with open(file_path, 'r', encoding='utf8') as f:
        content = f.read()

    # Remove import
    content = re.sub(r"import\s*\{\s*StickyCard\s*\}\s*from\s*['\"]\.\./components/ui/StickyCard['\"];\n?", '', content)

    # Replace <StickyCard ...> with <section ...>
    def replacer(match):
        attrs = match.group(1)
        # Remove scrollWidth={...} if present
        attrs = re.sub(r'scrollWidth=\{[^}]+\}', '', attrs).strip()
        return f'<section{" " + attrs if attrs else ""}>'

    content = re.sub(r'<StickyCard([^>]*)>', replacer, content)

    # Replace </StickyCard> with </section>
    content = content.replace('</StickyCard>', '</section>')

    with open(file_path, 'w', encoding='utf8') as f:
        f.write(content)

    print('Reverted', file)
