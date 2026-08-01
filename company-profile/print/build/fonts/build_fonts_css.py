import re, base64, urllib.request, os

BASE = os.path.dirname(__file__)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

def parse_blocks(css_text):
    # split into @font-face blocks, each preceded by a comment like "/* latin */"
    blocks = re.findall(r'/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})', css_text)
    return blocks  # list of (subset_name, block_text)

def get_weight(block):
    m = re.search(r'font-weight:\s*(\d+)', block)
    return m.group(1) if m else '400'

def get_family(block):
    m = re.search(r"font-family:\s*'([^']+)'", block)
    return m.group(1) if m else 'Unknown'

def get_url(block):
    m = re.search(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", block)
    return m.group(1) if m else None

def download(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

jobs = [
    ('bebas.css.raw', ['latin'], None),          # take all weights available in 'latin'
    ('sourcesans.css.raw', ['latin'], None),
    ('tajawal.css.raw', ['arabic'], None),
    ('anton.css.raw', ['latin'], None),
]

out_css = []
for fname, wanted_subsets, _ in jobs:
    path = os.path.join(BASE, fname)
    text = open(path, encoding='utf-8').read()
    blocks = parse_blocks(text)
    seen = set()
    for subset, block in blocks:
        if subset not in wanted_subsets:
            continue
        family = get_family(block)
        weight = get_weight(block)
        key = (family, weight)
        if key in seen:
            continue
        url = get_url(block)
        if not url:
            continue
        data = download(url)
        b64 = base64.b64encode(data).decode('ascii')
        out_css.append(f"@font-face {{\n  font-family: '{family}';\n  font-style: normal;\n  font-weight: {weight};\n  font-display: swap;\n  src: url(data:font/woff2;base64,{b64}) format('woff2');\n}}")
        seen.add(key)
        print(f"embedded {family} {weight} ({len(data)} bytes)")

with open(os.path.join(BASE, 'fonts-embedded.css'), 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(out_css))
print('done ->', os.path.join(BASE, 'fonts-embedded.css'))
