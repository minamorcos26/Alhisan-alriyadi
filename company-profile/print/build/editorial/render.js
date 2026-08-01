const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const HTML_PATH = path.join(__dirname, 'profile.html');
const PDF_PATH = path.join(__dirname, 'Alhisan-Alriyadi-Company-Profile.pdf');
const PREVIEW_DIR = path.join(__dirname, 'previews');

async function main() {
  if (!fs.existsSync(PREVIEW_DIR)) fs.mkdirSync(PREVIEW_DIR);
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto('file://' + HTML_PATH, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Full print-ready PDF (page size = 216mm x 303mm to include 3mm bleed on all sides)
  await page.pdf({
    path: PDF_PATH,
    width: '216mm',
    height: '303mm',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    preferCSSPageSize: false,
  });
  console.log('Wrote', PDF_PATH);

  // Per-page PNG previews for visual QA (screenshot each .page element directly)
  const sections = await page.$$('.page');
  console.log('Found', sections.length, 'pages');
  for (let i = 0; i < sections.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await sections[i].screenshot({ path: path.join(PREVIEW_DIR, `page-${num}.png`) });
  }
  console.log('Wrote previews to', PREVIEW_DIR);

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
