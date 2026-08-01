const fs = require('fs');
const path = require('path');
const { CSS } = require('./styles');
const { buildAll } = require('./pages');

const pagesHtml = buildAll().join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Alhisan Alriyadi — Company Profile</title>
<style>${CSS}</style>
</head>
<body>
<div class="pages">
${pagesHtml}
</div>
</body>
</html>`;

const outPath = path.join(__dirname, 'profile.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Wrote', outPath, `(${(html.length / 1024 / 1024).toFixed(2)} MB)`);
