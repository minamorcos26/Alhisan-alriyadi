const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const PREVIEW_DIR = path.join(__dirname, 'previews');
const OUT = path.join(__dirname, 'Alhisan-Alriyadi-Company-Profile.pptx');

// 216mm x 303mm (A4 + 3mm bleed) in inches
const W = 216 / 25.4;
const H = 303 / 25.4;

const pres = new pptxgen();
pres.defineLayout({ name: 'A4_BLEED', width: W, height: H });
pres.layout = 'A4_BLEED';

const files = fs.readdirSync(PREVIEW_DIR)
  .filter((f) => /^page-\d+\.png$/.test(f))
  .sort();

if (files.length !== 26) {
  console.error('Expected 26 page images, found', files.length);
  process.exit(1);
}

for (const f of files) {
  const slide = pres.addSlide();
  slide.background = { path: path.join(PREVIEW_DIR, f) };
}

pres.writeFile({ fileName: OUT })
  .then(() => console.log('Wrote', OUT))
  .catch((e) => { console.error(e); process.exit(1); });
