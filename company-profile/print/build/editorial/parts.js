const { LOGO, ICON } = require('./assets');

function esc(s) { return String(s); }

// Sweeping "speed line" texture, used inside dark/colored panels for motion energy.
function speedLines({ color = 'FFFFFF', opacity = 0.14, seed = 0 } = {}) {
  const sets = [
    [
      'M -20 260 C 80 220, 160 200, 420 90',
      'M -20 300 C 90 260, 180 235, 420 140',
      'M -20 340 C 100 300, 190 275, 420 190',
    ],
    [
      'M -20 60 C 100 40, 220 90, 420 260',
      'M -20 20 C 110 10, 230 55, 420 210',
      'M -20 100 C 90 90, 210 130, 420 300',
    ],
  ];
  const paths = sets[seed % sets.length];
  const strokes = paths.map((d, i) => `<path d="${d}" stroke="#${color}" stroke-width="${2.2 - i * 0.4}" fill="none" opacity="${opacity - i * 0.03}"/>`).join('');
  return `<svg class="motion" viewBox="0 0 400 320" preserveAspectRatio="none" width="100%" height="100%" style="position:absolute;inset:0;">${strokes}</svg>`;
}

function ghostIcon(iconKey, { size = 90, opacity = 0.16, color = 'white', x, y }) {
  const src = color === 'white' ? ICON[`${iconKey}_white`] || ICON[iconKey] : ICON[iconKey];
  return `<img src="${src}" style="position:absolute; left:${x}mm; top:${y}mm; width:${size}mm; height:${size}mm; opacity:${opacity};" />`;
}

function iconBadge(iconKey, { size = 16, bg = '#14532D', iconColor = 'white', pad = 0.32 } = {}) {
  const src = iconColor === 'white' ? (ICON[`${iconKey}_white`] || ICON[iconKey]) : ICON[iconKey];
  const inner = size * (1 - pad * 2);
  return `<div class="badge" style="width:${size}mm; height:${size}mm; background:${bg};"><img src="${src}" style="width:${inner}mm; height:${inner}mm;"/></div>`;
}

function ghostNumber(text, { top, left, right, color = 'white', dark = false }) {
  const pos = left != null ? `left:${left}mm;` : `right:${right}mm;`;
  const cls = dark ? 'ghost-num dark' : 'ghost-num';
  const stroke = color === 'white' ? 'rgba(255,255,255,0.16)' : 'rgba(20,83,45,0.12)';
  return `<div class="${cls}" style="top:${top}mm; ${pos} -webkit-text-stroke:1.6px ${stroke};">${text}</div>`;
}

function footer(pageNum, total, sectionEn, sectionAr, opts = {}) {
  const color = opts.dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)';
  return `
    <div class="footer-tag" style="left:3mm; bottom:3mm; color:${color};">${sectionEn || ''}${sectionEn ? ' &nbsp;/&nbsp; ' : ''}${sectionAr || ''}</div>
    <div class="footer-num" style="right:3mm; bottom:3mm; color:${color};">${String(pageNum).padStart(2, '0')} / ${total}</div>
  `;
}

function pills(items) {
  return items.map((it) => `<span class="pill"><span class="dot"></span>${it.en} &nbsp;·&nbsp; ${it.ar}</span>`).join(' ');
}

function page(innerHtml, { bg = 'var(--white)' } = {}) {
  return `<section class="page" style="background:${bg};">${innerHtml}</section>`;
}

module.exports = { speedLines, ghostIcon, iconBadge, ghostNumber, footer, pills, page, LOGO, ICON };
