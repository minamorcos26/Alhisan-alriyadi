const { speedLines, ghostIcon, iconBadge, ghostNumber, footer, pills, page, LOGO, ICON } = require('./parts');
const { categories } = require('./content');

const TOTAL = 26;
const GREEN = '#14532D', GREEN_DARK = '#0F3D22', GREEN_SOFT = '#E7F0EA', ENERGY = '#34D399', BLACK = '#0A0A0A', OFFWHITE = '#F5F5F3';

function diagPanel({ side, width = 96, color = GREEN, no, icon, caption }) {
  const isLeft = side === 'left';
  const clip = isLeft
    ? 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
    : 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)';
  const posStyle = isLeft ? `left:0;` : `right:0;`;
  return `
    <div style="position:absolute; top:0; ${posStyle} width:${width}mm; height:303mm; background:${color}; clip-path:${clip}; overflow:hidden;">
      ${speedLines({ opacity: 0.16, seed: isLeft ? 0 : 1 })}
      <div class="f-display" style="position:absolute; ${isLeft ? 'left:10mm;' : 'right:14mm;'} top:14mm; font-size:20pt; color:rgba(255,255,255,0.55);">${no}</div>
      ${ghostIcon(icon, { size: 62, opacity: 0.22, x: isLeft ? width / 2 - 31 : width / 2 - 27, y: 118 })}
      <div class="f-body" style="position:absolute; ${isLeft ? 'left:10mm; width:58mm;' : 'left:26mm; right:14mm;'} bottom:10mm; font-size:6.6pt; letter-spacing:1px; color:rgba(255,255,255,0.55); text-transform:uppercase;">${caption}</div>
    </div>`;
}

function splitPage({ no, icon, labelEn, labelAr, titleEn, titleAr, bodyEn, bodyAr, note, panelSide = 'right', panelColor = GREEN, caption, pageNum, sectionEn, sectionAr, statement = false }) {
  const panelW = 92;
  const contentX = panelSide === 'left' ? panelW + 14 : 14;
  const contentW = 216 - panelW - 14 - 14;
  const bodyEnHtml = statement
    ? `<div class="f-body" style="position:absolute; left:${contentX}mm; top:120mm; width:${contentW}mm; font-size:19pt; font-weight:700; line-height:1.3; color:var(--ink);">&ldquo;${bodyEn}&rdquo;</div>`
    : `<div class="f-body" style="position:absolute; left:${contentX}mm; top:95mm; width:${contentW}mm; font-size:11.5pt; line-height:1.55; color:var(--ink-soft);">${bodyEn}</div>`;
  const bodyArHtml = statement
    ? `<div class="f-body-ar rtl" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:200mm; font-size:15pt; font-weight:700; line-height:1.7; color:${GREEN};">${bodyAr}</div>`
    : `<div class="f-body-ar rtl" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:135mm; font-size:11pt; line-height:1.75; color:var(--ink-soft);">${bodyAr}</div>`;
  return page(`
    ${diagPanel({ side: panelSide, width: panelW, color: panelColor, no, icon, caption })}
    <div class="eyebrow" style="position:absolute; left:${contentX}mm; top:20mm; color:${GREEN};">${labelEn.toUpperCase()} &nbsp;·&nbsp; ${labelAr}</div>
    <div class="f-display" style="position:absolute; left:${contentX}mm; top:32mm; width:${contentW}mm; font-size:40pt; line-height:0.94; color:var(--ink);">${titleEn}</div>
    <div class="f-display-ar rtl" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:${32 + estimateHeadlineLines(titleEn, contentW) * 15 + 8}mm; font-size:22pt; color:${GREEN};">${titleAr}</div>
    ${bodyEnHtml}
    ${bodyArHtml}
    ${note ? `<div class="f-body" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:178mm; font-size:8pt; font-style:italic; color:var(--muted); line-height:1.4;">${note}</div>` : ''}
    ${footer(pageNum, TOTAL, sectionEn, sectionAr)}
  `);
}

function estimateHeadlineLines(text, widthMm) {
  const charsPerLine = widthMm / 5.6; // rough @ 40pt Bebas
  return Math.max(1, Math.ceil(text.length / charsPerLine));
}

// ---------------------------------------------------------------- 1. COVER
function coverPage() {
  return page(`
    <div class="bleed" style="background:${GREEN_DARK};"></div>
    <div class="bleed" style="clip-path:polygon(0 60%, 38% 100%, 0% 100%); background:${BLACK};"></div>
    <div style="position:absolute; right:-10mm; top:-10mm; width:150mm; height:170mm;">${speedLines({ opacity: 0.14 })}</div>
    <img src="${LOGO.markWhite}" style="position:absolute; right:16mm; top:22mm; width:88mm; height:auto;" />
    <div class="eyebrow" style="position:absolute; left:14mm; top:16mm; color:#CFE3D6;">COMPANY PROFILE &nbsp;—&nbsp; الملف التعريفي للشركة</div>
    <div class="f-display" style="position:absolute; left:13mm; top:186mm; font-size:74pt; line-height:0.9; color:#FFFFFF; letter-spacing:0.5px;">ALHISAN<br/>ALRIYADI</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:250mm; font-size:32pt; color:#FFFFFF;">الحصان الرياضي</div>
    <div class="f-body" style="position:absolute; left:14mm; top:271mm; width:160mm; font-size:12pt; color:#CFE3D6;">ATHLETIC HORSE — Performance Sportswear &amp; Equipment</div>
    <div class="f-body-ar rtl" style="position:absolute; left:14mm; right:14mm; top:283mm; font-size:11pt; color:#CFE3D6;">ملابس ومعدات رياضية احترافية — المملكة العربية السعودية</div>
    <div class="f-body" style="position:absolute; right:14mm; bottom:11mm; font-size:9.5pt; color:#FFFFFF; letter-spacing:0.5px;">athletic-horse.com</div>
  `);
}

// ---------------------------------------------------------------- 2. TOC
function tocPage() {
  const items = [
    ['03', 'Welcome Message', 'رسالة ترحيبية'], ['04', 'Who We Are', 'من نحن'],
    ['05', 'Our Story', 'قصتنا'], ['06', 'Vision', 'رؤيتنا'],
    ['07', 'Mission', 'رسالتنا'], ['08', 'Core Values', 'قيمنا الأساسية'],
    ['09', 'Why Alhisan Alriyadi', 'لماذا الحصان الرياضي'], ['10', 'Our Product Universe', 'عالم منتجاتنا'],
    ['11', 'Football', 'كرة القدم'], ['12', 'Gym & Fitness', 'الجيم واللياقة'],
    ['13', 'Water Sports & Swimming', 'الرياضات المائية'], ['14', 'Martial Arts', 'الفنون القتالية'],
    ['15', 'Racket Sports', 'الرياضات المضربية'], ['16', 'Team Sports', 'الرياضات الجماعية'],
    ['17', 'Kids & Family', 'الأطفال والعائلة'], ['18', 'Camping & Outdoor', 'المخيمات'],
    ['19', 'Sportswear', 'الملابس الرياضية'], ['20', 'Accessories & Equipment', 'الإكسسوارات'],
    ['21', 'Quality & Authenticity', 'الجودة والأصالة'], ['22', 'Logistics & Delivery', 'الخدمات اللوجستية'],
    ['23', 'Digital Experience', 'التجربة الرقمية'], ['24', 'Future Vision & Growth', 'رؤيتنا المستقبلية'],
    ['25', 'Contact Us', 'تواصل معنا'], ['26', 'Back Cover', 'الغلاف الخلفي'],
  ];
  const colX = [14, 112], rowH = 18.3, startY = 82;
  const rows = items.map((it, i) => {
    const col = i < 12 ? 0 : 1, idx = i < 12 ? i : i - 12;
    const x = colX[col], y = startY + idx * rowH;
    return `
      <div style="position:absolute; left:${x}mm; top:${y}mm; width:90mm; height:${rowH - 3}mm; border-bottom:0.5px solid var(--line); display:flex; align-items:center; justify-content:space-between; gap:2mm;">
        <div style="display:flex; align-items:center; gap:3mm; overflow:hidden;">
          <span class="f-display" style="font-size:16pt; color:transparent; -webkit-text-stroke:0.6px ${GREEN}; flex-shrink:0;">${it[0]}</span>
          <span class="f-body" style="font-size:10.2pt; font-weight:600; white-space:nowrap;">${it[1]}</span>
        </div>
        <span class="f-body-ar" style="font-size:9.5pt; color:var(--muted); direction:rtl; flex-shrink:0;">${it[2]}</span>
      </div>`;
  }).join('');
  return page(`
    <div class="bleed" style="clip-path:polygon(100% 100%, 60% 100%, 100% 65%); background:${GREEN_SOFT};"></div>
    <div class="eyebrow" style="position:absolute; left:14mm; top:20mm; color:${GREEN};">02 &nbsp;·&nbsp; NAVIGATION</div>
    <div class="f-display" style="position:absolute; left:13mm; top:30mm; font-size:46pt; color:var(--ink);">INDEX</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:58mm; font-size:22pt; color:${GREEN};">الفهرس</div>
    ${rows}
    ${footer(2, TOTAL, 'الفهرس', 'Index')}
  `);
}

// ---------------------------------------------------------------- 8. CORE VALUES
function valuesPage() {
  const values = [
    ['shieldcheck', 'Authenticity', 'الأصالة', '100% genuine products, every time.', 'منتجات أصلية 100٪ في كل مرة.'],
    ['handshake', 'Trust', 'الثقة', 'Built with every order we fulfil.', 'نبنيها مع كل طلب ننفذه.'],
    ['bolt', 'Speed', 'السرعة', 'Fast dispatch, fast delivery.', 'تجهيز وتوصيل سريعان.'],
    ['globe', 'Accessibility', 'إتاحة للجميع', 'Reaching every city in the Kingdom.', 'نصل إلى كل مدن المملكة.'],
    ['users', 'Community', 'المجتمع', 'For every athlete, every family.', 'لكل رياضي ولكل أسرة.'],
    ['star', 'Quality', 'الجودة', 'Checked before it reaches you.', 'مفحوصة قبل أن تصل إليك.'],
  ];
  const cardW = 60, cardH = 78, gapX = 4, gapY = 6, startX = 14, startY = 92;
  const cards = values.map((v, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = startX + col * (cardW + gapX), y = startY + row * (cardH + gapY) + (col === 1 ? -6 : 0);
    return `
      <div style="position:absolute; left:${x}mm; top:${y}mm; width:${cardW}mm; height:${cardH}mm; background:rgba(255,255,255,0.06); border:0.6px solid rgba(255,255,255,0.18); border-radius:3mm; padding:6mm;">
        ${iconBadge(v[0], { size: 15, bg: 'rgba(52,211,153,0.18)', iconColor: 'white' })}
        <div class="f-display" style="margin-top:5mm; font-size:15pt; color:#FFFFFF;">${v[1]}</div>
        <div class="f-body-ar rtl" style="font-size:11pt; color:${ENERGY}; margin-top:1mm;">${v[2]}</div>
        <div class="f-body" style="margin-top:4mm; font-size:8.3pt; color:rgba(255,255,255,0.75); line-height:1.4;">${v[3]}</div>
        <div class="f-body-ar rtl" style="font-size:8pt; color:rgba(255,255,255,0.6); margin-top:1.5mm; line-height:1.5;">${v[4]}</div>
      </div>`;
  }).join('');
  return page(`
    <div class="bleed" style="background:${GREEN_DARK};"></div>
    ${ghostIcon('star', { size: 150, opacity: 0.05, x: 60, y: 130 })}
    <div class="eyebrow" style="position:absolute; left:14mm; top:20mm; color:${ENERGY};">08 &nbsp;·&nbsp; WHAT WE STAND FOR</div>
    <div class="f-display" style="position:absolute; left:13mm; top:30mm; font-size:46pt; color:#FFFFFF;">CORE VALUES</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:58mm; font-size:22pt; color:${ENERGY};">قيمنا الأساسية</div>
    ${cards}
    ${footer(8, TOTAL, 'قيمنا الأساسية', 'Core Values', { dark: true })}
  `);
}

// ---------------------------------------------------------------- 9. WHY US
function whyPage() {
  const adv = [
    ['shieldcheck', '100% Authentic Products', 'منتجات أصلية 100٪'],
    ['truck', 'Fast Delivery Across the Kingdom', 'توصيل سريع لجميع مدن المملكة'],
    ['boxes', '9+ Sport Categories in One Store', 'أكثر من 9 فئات رياضية في متجر واحد'],
    ['lock', 'Secure Payment: Mada, Visa, Apple Pay', 'دفع آمن: مدى، فيزا، Apple Pay'],
    ['star', 'Easy 14-Day Returns', 'إرجاع سهل خلال 14 يومًا'],
    ['headset', 'Responsive WhatsApp Support', 'دعم عملاء سريع عبر واتساب'],
  ];
  const rowH = 27, startY = 88;
  const rowsHtml = adv.map((a, i) => {
    const y = startY + i * rowH;
    return `
      <div style="position:absolute; left:14mm; top:${y}mm; width:14mm; font-family:'Bebas Neue',sans-serif; font-size:24pt; color:transparent; -webkit-text-stroke:1px ${GREEN};">${String(i + 1).padStart(2, '0')}</div>
      <div style="position:absolute; left:32mm; top:${y + 1}mm;">${iconBadge(a[0], { size: 11, bg: GREEN, iconColor: 'white' })}</div>
      <div class="f-body" style="position:absolute; left:48mm; top:${y}mm; width:100mm; font-size:12pt; font-weight:700; color:var(--ink);">${a[1]}</div>
      <div class="f-body-ar rtl" style="position:absolute; left:48mm; top:${y + 8}mm; width:100mm; font-size:10.5pt; color:var(--muted);">${a[2]}</div>
      <div style="position:absolute; left:14mm; top:${y + rowH - 3}mm; width:134mm; border-bottom:0.5px solid var(--line);"></div>
    `;
  }).join('');

  return page(`
    <div style="position:absolute; right:0; top:0; width:60mm; height:303mm; background:${GREEN}; clip-path:polygon(30% 0, 100% 0, 100% 100%, 0 100%); overflow:hidden;">
      ${speedLines({ opacity: 0.18, seed: 1 })}
      <div class="f-display" style="position:absolute; left:8mm; right:8mm; top:120mm; font-size:64pt; color:#FFFFFF; text-align:center;">9+</div>
      <div class="f-body" style="position:absolute; left:6mm; right:6mm; top:158mm; font-size:9pt; color:#E8F1EC; text-align:center;">SPORT CATEGORIES<br/>IN ONE STORE</div>
      <div class="f-body-ar rtl" style="position:absolute; left:8mm; right:8mm; top:178mm; font-size:9.5pt; color:#E8F1EC; text-align:center;">فئات رياضية في متجر واحد</div>
    </div>
    <div class="eyebrow" style="position:absolute; left:14mm; top:20mm; color:${GREEN};">09 &nbsp;·&nbsp; THE ADVANTAGE</div>
    <div class="f-display" style="position:absolute; left:13mm; top:30mm; font-size:38pt; color:var(--ink); width:140mm;">WHY ALHISAN ALRIYADI</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; top:56mm; width:140mm; font-size:19pt; color:${GREEN};">لماذا الحصان الرياضي</div>
    ${rowsHtml}
    ${footer(9, TOTAL, 'لماذا الحصان الرياضي', 'Why Alhisan Alriyadi')}
  `);
}

// ---------------------------------------------------------------- 10. PRODUCT UNIVERSE
function universePage() {
  const cats10 = [
    ['football', 'Football', 'كرة القدم'], ['dumbbell', 'Gym & Fitness', 'الجيم واللياقة'],
    ['swim', 'Water Sports', 'الرياضات المائية'], ['martial', 'Martial Arts', 'الفنون القتالية'],
    ['racket', 'Racket Sports', 'المضربية'], ['basketball', 'Team Sports', 'الجماعية'],
    ['child', 'Kids & Family', 'الأطفال والعائلة'], ['tent', 'Camping', 'المخيمات'],
    ['tshirt', 'Sportswear', 'الملابس الرياضية'], ['bag', 'Accessories', 'الإكسسوارات'],
  ];
  const cardW = 37.6, cardH = 78, gap = 2, startX = 14, startY = 90;
  const tiles = cats10.map((c, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = startX + col * (cardW + gap), y = startY + row * (cardH + gap);
    const clip = (col % 2 === 0) ? 'polygon(0 0,100% 0,100% 92%,85% 100%,0 100%)' : 'polygon(0 0,100% 0,100% 100%,15% 100%,0 92%)';
    return `
      <div style="position:absolute; left:${x}mm; top:${y}mm; width:${cardW}mm; height:${cardH}mm; background:rgba(255,255,255,0.07); clip-path:${clip};">
        <div style="position:absolute; left:0; right:0; top:14mm; text-align:center;"><div style="display:inline-block;">${iconBadge(c[0], { size: 15, bg: 'rgba(52,211,153,0.2)', iconColor: 'white' })}</div></div>
        <div class="f-display" style="position:absolute; left:2mm; right:2mm; top:42mm; font-size:10.5pt; color:#FFFFFF; text-align:center;">${c[1]}</div>
        <div class="f-body-ar rtl" style="position:absolute; left:2mm; right:2mm; top:58mm; font-size:8pt; color:${ENERGY}; text-align:center; direction:rtl;">${c[2]}</div>
      </div>`;
  }).join('');
  return page(`
    <div class="bleed" style="background:${BLACK};"></div>
    ${ghostIcon('football', { size: 200, opacity: 0.04, x: 8, y: 60 })}
    <div class="eyebrow" style="position:absolute; left:14mm; top:20mm; color:${ENERGY};">10 &nbsp;·&nbsp; THE FULL RANGE</div>
    <div class="f-display" style="position:absolute; left:13mm; top:30mm; font-size:44pt; color:#FFFFFF;">OUR PRODUCT UNIVERSE</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:58mm; font-size:20pt; color:${ENERGY};">عالم منتجاتنا</div>
    ${tiles}
    ${footer(10, TOTAL, 'عالم منتجاتنا', 'Product Universe', { dark: true })}
  `);
}

// ---------------------------------------------------------------- 11-20 CATEGORY SPREADS
function categoryPage(cat, pageNum, panelSide) {
  const panelW = 92;
  const contentX = panelSide === 'left' ? panelW + 14 : 14;
  const contentW = 216 - panelW - 14 - 14;
  return page(`
    ${diagPanel({ side: panelSide, width: panelW, color: GREEN, no: cat.no, icon: cat.icon, caption: `Photography — ${cat.en} lifestyle / product shot, to be added` })}
    <div class="eyebrow" style="position:absolute; left:${contentX}mm; top:20mm; color:${GREEN};">CATEGORY ${cat.no} / 10</div>
    <div class="f-display" style="position:absolute; left:${contentX}mm; top:31mm; width:${contentW}mm; font-size:34pt; line-height:0.95; color:var(--ink);">${cat.en.toUpperCase()}</div>
    <div class="f-display-ar rtl" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:58mm; font-size:19pt; color:${GREEN};">${cat.ar}</div>
    <div class="f-body" style="position:absolute; left:${contentX}mm; top:70mm; width:${contentW}mm; font-size:10.8pt; line-height:1.5; color:var(--ink-soft);">${cat.descEn}</div>
    <div class="f-body-ar rtl" style="position:absolute; left:${contentX}mm; width:${contentW}mm; top:88mm; font-size:10pt; line-height:1.7; color:var(--ink-soft);">${cat.descAr}</div>
    <div class="eyebrow" style="position:absolute; left:${contentX}mm; top:112mm; color:var(--ink); font-size:9pt;">WHAT WE OFFER &nbsp;·&nbsp; ماذا نقدّم</div>
    <div style="position:absolute; left:${contentX}mm; top:120mm; width:${contentW}mm; display:flex; flex-wrap:wrap; gap:3mm;">${pills(cat.items)}</div>
    ${footer(pageNum, TOTAL, cat.ar, cat.en)}
  `);
}

// ---------------------------------------------------------------- 22. LOGISTICS
function logisticsPage() {
  const stats = [
    ['24H', 'Fast Dispatch', 'تجهيز سريع'],
    ['14', 'Day Easy Returns', 'يوم إرجاع سهل'],
    ['200', 'SAR Free-Ship Threshold', 'ريال حد الشحن المجاني'],
    ['X+', 'Cities Covered *', 'مدينة مغطاة *'],
  ];
  const cardW = 43, cardH = 52, gap = 4, startX = 14;
  const cards = stats.map((s, i) => {
    const y = 130 + (i % 2 === 1 ? -8 : 0);
    const x = startX + i * (cardW + gap);
    return `
      <div style="position:absolute; left:${x}mm; top:${y}mm; width:${cardW}mm; height:${cardH}mm; background:${GREEN_SOFT}; border-radius:2mm;">
        <div class="f-display" style="position:absolute; left:0; right:0; top:8mm; text-align:center; font-size:30pt; color:${GREEN};">${s[0]}</div>
        <div class="f-body" style="position:absolute; left:3mm; right:3mm; top:30mm; text-align:center; font-size:7.6pt; font-weight:700; color:var(--ink);">${s[1]}</div>
        <div class="f-body-ar rtl" style="position:absolute; left:3mm; right:3mm; top:40mm; text-align:center; font-size:7.4pt; color:var(--muted); direction:rtl;">${s[2]}</div>
      </div>`;
  }).join('');
  const steps = ['Order Placed', 'Dispatched in 24h', 'In Transit', 'At Your Door'];
  const stepsAr = ['تأكيد الطلب', 'تجهيز خلال 24 ساعة', 'قيد الشحن', 'وصول للباب'];
  const stepW = 46;
  const stepsHtml = steps.map((s, i) => {
    const x = 14 + i * (stepW + 2);
    return `
      <div style="position:absolute; left:${x}mm; top:210mm; width:6mm; height:6mm; border-radius:50%; background:${GREEN};"></div>
      ${i < 3 ? `<div style="position:absolute; left:${x + 6}mm; top:212.6mm; width:${stepW - 4}mm; border-top:1px dashed #B9CDBF;"></div>` : ''}
      <div class="f-body" style="position:absolute; left:${x - 6}mm; top:220mm; width:${stepW + 8}mm; text-align:center; font-size:8.3pt; font-weight:700;">${s}</div>
      <div class="f-body-ar rtl" style="position:absolute; left:${x - 6}mm; top:227mm; width:${stepW + 8}mm; text-align:center; font-size:7.6pt; color:var(--muted); direction:rtl;">${stepsAr[i]}</div>
    `;
  }).join('');
  return page(`
    <div style="position:absolute; right:0; top:0; width:60mm; height:70mm; background:${GREEN}; clip-path:polygon(100% 0, 100% 100%, 40% 0);"></div>
    <div style="position:absolute; left:14mm; top:20mm;">${iconBadge('truck', { size: 16, bg: GREEN, iconColor: 'white' })}</div>
    <div class="eyebrow" style="position:absolute; left:36mm; top:24mm; color:${GREEN};">22 &nbsp;·&nbsp; NATIONWIDE REACH</div>
    <div class="f-display" style="position:absolute; left:13mm; top:38mm; font-size:36pt; color:var(--ink); width:170mm;">LOGISTICS &amp; DELIVERY ACROSS THE KINGDOM</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:62mm; font-size:18pt; color:${GREEN};">الخدمات اللوجستية والتوصيل لجميع مدن المملكة</div>
    <div class="f-body" style="position:absolute; left:14mm; top:78mm; width:180mm; font-size:11pt; color:var(--ink-soft); line-height:1.55;">We reach customers across every city in Saudi Arabia — fast and reliably — with free shipping on orders over SAR 200 and a flexible 14-day return policy.</div>
    <div class="f-body-ar rtl" style="position:absolute; left:14mm; right:14mm; top:96mm; font-size:10.5pt; color:var(--ink-soft); line-height:1.7;">نصل إلى عملائنا في جميع مدن المملكة بسرعة وموثوقية، مع شحن مجاني للطلبات التي تتجاوز 200 ريال سعودي، وسياسة إرجاع مرنة خلال 14 يومًا.</div>
    ${cards}
    <div class="f-body" style="position:absolute; left:14mm; top:190mm; font-size:8pt; font-style:italic; color:var(--muted);">* Placeholder — exact number of cities covered pending confirmation.</div>
    ${stepsHtml}
    ${footer(22, TOTAL, 'الخدمات اللوجستية والتوصيل', 'Logistics & Delivery')}
  `);
}

// ---------------------------------------------------------------- 23. DIGITAL EXPERIENCE
function digitalPage() {
  const chans = [
    ['lock', 'Mada / Visa / Apple Pay', 'مدى / فيزا / Apple Pay'],
    ['whatsapp', 'WhatsApp Support', 'دعم عبر واتساب'],
    ['instagram', 'Instagram', 'إنستغرام'],
    ['tiktok', 'TikTok', 'تيك توك'],
    ['snapchat', 'Snapchat', 'سناب شات'],
    ['facebook', 'Facebook', 'فيسبوك'],
  ];
  const cardW = 45, cardH = 40, gapX = 4, gapY = 4, startX = 108, startY = 100;
  const cards = chans.map((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cardW + gapX), y = startY + row * (cardH + gapY);
    return `
      <div style="position:absolute; left:${x}mm; top:${y}mm; width:${cardW}mm; height:${cardH}mm; background:${OFFWHITE}; border-radius:2mm;">
        <div style="position:absolute; left:5mm; top:6mm;">${iconBadge(c[0], { size: 11, bg: GREEN, iconColor: 'white' })}</div>
        <div class="f-body" style="position:absolute; left:5mm; right:4mm; top:22mm; font-size:9pt; font-weight:700;">${c[1]}</div>
        <div class="f-body-ar rtl" style="position:absolute; left:5mm; right:4mm; top:32mm; font-size:8.3pt; color:var(--muted);">${c[2]}</div>
      </div>`;
  }).join('');
  return page(`
    ${diagPanel({ side: 'left', width: 92, color: GREEN, no: '23', icon: 'mobile', caption: 'Photography — app/phone in hand, lifestyle shot, to be added' })}
    <div class="eyebrow" style="position:absolute; left:108mm; top:20mm; color:${GREEN};">23 &nbsp;·&nbsp; ALWAYS ON</div>
    <div class="f-display" style="position:absolute; left:107mm; top:31mm; width:96mm; font-size:28pt; line-height:0.95; color:var(--ink);">DIGITAL EXPERIENCE &amp; CUSTOMER CARE</div>
    <div class="f-display-ar rtl" style="position:absolute; left:108mm; width:96mm; top:60mm; font-size:16pt; color:${GREEN};">التجربة الرقمية وخدمة العملاء</div>
    <div class="f-body" style="position:absolute; left:108mm; top:75mm; width:96mm; font-size:9.5pt; line-height:1.5; color:var(--ink-soft);">A seamless shopping experience through our website, secure payments, responsive WhatsApp support, and an active social presence.</div>
    <div class="f-body-ar rtl" style="position:absolute; left:108mm; width:96mm; top:90mm; font-size:9pt; line-height:1.65; color:var(--ink-soft);">تجربة تسوق سلسة عبر موقعنا، بخيارات دفع آمنة، ودعم سريع عبر واتساب، وحضور نشط على منصات التواصل.</div>
    ${cards}
    ${footer(23, TOTAL, 'التجربة الرقمية', 'Digital Experience')}
  `);
}

// ---------------------------------------------------------------- 24. FUTURE VISION
function futureVisionPage() {
  return page(`
    <div class="bleed" style="background:${BLACK};"></div>
    ${ghostIcon('rocket', { size: 190, opacity: 0.05, x: 20, y: 70 })}
    <div style="position:absolute; left:14mm; top:22mm;">${iconBadge('rocket', { size: 15, bg: ENERGY, iconColor: 'black' })}</div>
    <div class="eyebrow" style="position:absolute; left:34mm; top:26mm; color:${ENERGY};">24 &nbsp;·&nbsp; LOOKING AHEAD</div>
    <div class="f-display" style="position:absolute; left:13mm; top:44mm; width:190mm; font-size:44pt; color:#FFFFFF;">FUTURE VISION &amp; GROWTH</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; right:14mm; top:74mm; font-size:20pt; color:${ENERGY};">رؤيتنا المستقبلية للنمو</div>
    <div class="f-body" style="position:absolute; left:14mm; top:96mm; width:186mm; font-size:13pt; line-height:1.6; color:#E8E8E6;">Looking ahead, we aim to expand into wholesale and institutional supply partnerships, private-label capabilities, and potential future collaborations with sports academies and events — strengthening our position as a key player in Saudi Arabia's sports sector.</div>
    <div class="f-body-ar rtl" style="position:absolute; left:14mm; right:14mm; top:130mm; font-size:12pt; line-height:1.85; color:#D8D8D5;">نتطلع إلى توسيع نطاق أعمالنا ليشمل شراكات الجملة والتوريد المؤسسي، وإمكانيات العلامة الخاصة، وتعاونات مستقبلية محتملة مع الأكاديميات الرياضية والفعاليات — بما يعزز مكانتنا كلاعب رئيسي في قطاع الرياضة بالمملكة.</div>
    <div style="position:absolute; left:14mm; top:250mm; width:186mm; padding:6mm; border:0.7px solid rgba(52,211,153,0.5); border-radius:2mm;">
      <div class="f-body" style="font-size:9pt; font-style:italic; color:#CFCFCC;">Note: This section reflects future strategic direction and is not a currently active service.</div>
      <div class="f-body-ar rtl" style="font-size:8.6pt; font-style:italic; color:#CFCFCC; margin-top:2mm;">ملاحظة: يعرض هذا القسم توجهًا استراتيجيًا مستقبليًا وليس خدمة قائمة حاليًا.</div>
    </div>
    ${footer(24, TOTAL, 'رؤيتنا المستقبلية', 'Future Vision & Growth', { dark: true })}
  `);
}

// ---------------------------------------------------------------- 25. CONTACT
function contactPage() {
  const contacts = [
    ['whatsapp', 'WhatsApp', '+966 57 387 3497'],
    ['globe', 'Website', 'athletic-horse.com'],
    ['instagram', 'Social', '@athletic_horse'],
    ['envelope', 'Email', '[placeholder — to be confirmed]'],
  ];
  const rows = contacts.map((c, i) => {
    const y = 100 + i * 26;
    return `
      <div style="position:absolute; left:14mm; top:${y}mm;">${iconBadge(c[0], { size: 14, bg: GREEN, iconColor: 'white' })}</div>
      <div class="f-body" style="position:absolute; left:34mm; top:${y + 1}mm; font-size:9pt; color:var(--muted); font-weight:700;">${c[1].toUpperCase()}</div>
      <div class="f-display" style="position:absolute; left:34mm; top:${y + 6}mm; font-size:16pt; color:var(--ink);">${c[2]}</div>
    `;
  }).join('');
  return page(`
    ${diagPanel({ side: 'right', width: 92, color: GREEN, no: '25', icon: 'mappin', caption: 'Photography — KSA delivery-coverage map / storefront, to be added' })}
    <div style="position:absolute; left:145mm; top:130mm; width:36mm; height:36mm; background:#FFFFFF; border-radius:2mm;"></div>
    <div class="f-body" style="position:absolute; left:139mm; top:170mm; width:48mm; text-align:center; font-size:7.6pt; color:rgba(255,255,255,0.85);">SCAN TO VISIT<br/>athletic-horse.com</div>
    <div class="eyebrow" style="position:absolute; left:14mm; top:20mm; color:${GREEN};">25 &nbsp;·&nbsp; GET IN TOUCH</div>
    <div class="f-display" style="position:absolute; left:13mm; top:31mm; font-size:40pt; color:var(--ink);">CONTACT US</div>
    <div class="f-display-ar rtl" style="position:absolute; left:14mm; top:56mm; width:110mm; font-size:20pt; color:${GREEN};">تواصل معنا</div>
    ${rows}
    ${footer(25, TOTAL, 'تواصل معنا', 'Contact Us')}
  `);
}

// ---------------------------------------------------------------- 26. BACK COVER
function backCoverPage() {
  const socials = ['whatsapp', 'instagram', 'tiktok', 'snapchat', 'facebook'];
  const iw = 12, gap = 8, totalW = socials.length * iw + (socials.length - 1) * gap;
  const sx = (216 - totalW) / 2;
  const socialIcons = socials.map((s, i) => `<div style="position:absolute; left:${sx + i * (iw + gap)}mm; top:230mm;">${iconBadge(s, { size: iw, bg: 'rgba(255,255,255,0.12)', iconColor: 'white' })}</div>`).join('');
  return page(`
    <div class="bleed" style="background:${GREEN_DARK};"></div>
    <div class="bleed" style="clip-path:polygon(100% 40%, 100% 100%, 62% 100%); background:${BLACK};"></div>
    <div style="position:absolute; left:-20mm; bottom:-10mm; width:150mm; height:170mm; transform:scaleX(-1);">${speedLines({ opacity: 0.12, seed: 1 })}</div>
    <img src="${LOGO.markWhite}" style="position:absolute; left:50%; top:60mm; width:56mm; height:auto; transform:translateX(-50%);" />
    <div class="f-display" style="position:absolute; left:0; right:0; top:130mm; font-size:34pt; color:#FFFFFF; text-align:center; letter-spacing:1px;">ALHISAN ALRIYADI</div>
    <div class="f-display-ar rtl" style="position:absolute; left:0; right:0; top:150mm; font-size:18pt; color:#CFE3D6; text-align:center; direction:rtl;">الحصان الرياضي — ATHLETIC HORSE</div>
    <div class="f-body" style="position:absolute; left:0; right:0; top:168mm; font-size:11pt; color:#FFFFFF; text-align:center;">athletic-horse.com</div>
    ${socialIcons}
    <div class="f-body" style="position:absolute; left:0; right:0; top:250mm; font-size:9pt; color:#CFE3D6; text-align:center;">@athletic_horse</div>
  `);
}

function buildAll() {
  const pages = [];
  pages.push(coverPage()); // 1
  pages.push(tocPage()); // 2
  pages.push(splitPage({
    no: '03', icon: 'handshake', labelEn: 'Introduction', labelAr: 'مقدمة',
    titleEn: 'WELCOME MESSAGE', titleAr: 'رسالة ترحيبية', panelSide: 'right',
    caption: 'Photography — leadership portrait / brand moment, to be added',
    bodyEn: 'We are proud to introduce Alhisan Alriyadi — Athletic Horse — your trusted destination for authentic sporting goods across the Kingdom of Saudi Arabia. We believe sport is a way of life, and every day we work to make genuine, high-quality equipment more accessible for every individual and family in the Kingdom.',
    bodyAr: 'يسعدنا أن نقدّم لكم الحصان الرياضي، وجهتكم الموثوقة للمستلزمات الرياضية الأصلية في المملكة العربية السعودية. نؤمن بأن الرياضة أسلوب حياة، ونعمل كل يوم لنجعل الوصول إلى معدات رياضية أصلية وعالية الجودة أسهل لكل فرد وأسرة في المملكة.',
    note: '[Signature: Executive name — placeholder]  ·  [التوقيع: اسم المدير التنفيذي — عنصر نائب]',
    pageNum: 3, sectionEn: 'Welcome Message', sectionAr: 'رسالة ترحيبية',
  }));
  pages.push(splitPage({
    no: '04', icon: 'shieldcheck', labelEn: 'Company Overview', labelAr: 'نظرة عامة',
    titleEn: 'WHO WE ARE', titleAr: 'من نحن', panelSide: 'left',
    caption: 'Photography — multi-category product flat-lay, to be added',
    bodyEn: 'Alhisan Alriyadi — Athletic Horse — is a Saudi e-commerce company specializing in authentic sporting goods across football, gym & fitness, water sports, martial arts, racket sports, team sports, activewear for men, women and kids, and camping equipment.',
    bodyAr: 'الحصان الرياضي متجر إلكتروني سعودي متخصص في بيع المستلزمات الرياضية الأصلية لمختلف الألعاب: كرة القدم، الجيم واللياقة، الرياضات المائية، الفنون القتالية، الرياضات المضربية، الرياضات الجماعية، والملابس الرياضية.',
    pageNum: 4, sectionEn: 'Who We Are', sectionAr: 'من نحن',
  }));
  pages.push(splitPage({
    no: '05', icon: 'star', labelEn: 'Heritage', labelAr: 'المسيرة',
    titleEn: 'OUR STORY', titleAr: 'قصتنا', panelSide: 'right',
    caption: 'Photography — warehouse / packing operations, to be added',
    bodyEn: 'Our story began with a simple idea: make it easy for athletes and fitness enthusiasts across Saudi Arabia to access authentic sporting goods online, with confidence. Since launch, our category range has grown steadily, city by city.',
    bodyAr: 'انطلقت الحصان الرياضي من فكرة بسيطة: تسهيل وصول الرياضيين وعشاق اللياقة في المملكة إلى منتجات رياضية أصلية بثقة وسهولة عبر الإنترنت. منذ انطلاقتنا، نما تشكيلنا من الفئات الرياضية باستمرار، مدينة بعد مدينة.',
    note: 'Placeholder: exact founding date and growth milestones pending confirmation.  ·  عنصر نائب: تفاصيل التأسيس بانتظار التأكيد.',
    pageNum: 5, sectionEn: 'Our Story', sectionAr: 'قصتنا',
  }));
  pages.push(splitPage({
    no: '06', icon: 'compass', labelEn: 'Direction', labelAr: 'الاتجاه',
    titleEn: 'VISION', titleAr: 'رؤيتنا', panelSide: 'left',
    caption: 'Photography — wide lifestyle shot, athletes in motion, to be added',
    bodyEn: 'To be the most trusted sporting goods destination for individuals and families across the Kingdom of Saudi Arabia.',
    bodyAr: 'أن نكون الوجهة الرياضية الأولى والأكثر ثقة لدى الأفراد والأسر في المملكة العربية السعودية.',
    pageNum: 6, sectionEn: 'Vision', sectionAr: 'رؤيتنا', statement: true,
  }));
  pages.push(splitPage({
    no: '07', icon: 'bullseye', labelEn: 'Purpose', labelAr: 'الغاية',
    titleEn: 'MISSION', titleAr: 'رسالتنا', panelSide: 'right',
    caption: 'Photography — delivery / courier moment, to be added',
    bodyEn: 'To provide authentic, high-quality sporting goods for every sport and every age, delivered through a seamless shopping experience and fast delivery that reaches every city in the Kingdom.',
    bodyAr: 'نوفر مستلزمات رياضية أصلية وعالية الجودة لكل الألعاب والأعمار، بتجربة تسوق سلسة وتوصيل سريع يغطي جميع مدن المملكة.',
    pageNum: 7, sectionEn: 'Mission', sectionAr: 'رسالتنا', statement: true,
  }));
  pages.push(valuesPage()); // 8
  pages.push(whyPage()); // 9
  pages.push(universePage()); // 10
  categories.forEach((cat, i) => {
    const panelSide = i % 2 === 0 ? 'right' : 'left';
    pages.push(categoryPage(cat, 11 + i, panelSide));
  });
  pages.push(splitPage({
    no: '21', icon: 'shieldcheck', labelEn: 'Our Promise', labelAr: 'وعدنا',
    titleEn: 'QUALITY & AUTHENTICITY', titleAr: 'الجودة والأصالة', panelSide: 'left',
    caption: 'Photography — quality-check / packing close-up, to be added',
    bodyEn: 'We are committed to 100% authentic products sourced from trusted brands, with careful quality checks on every shipment before it reaches our customers — quality that lasts.',
    bodyAr: 'نلتزم بتوفير منتجات أصلية 100٪ من علامات تجارية موثوقة، مع فحص دقيق لكل شحنة قبل وصولها للعميل، لضمان جودة تدوم.',
    pageNum: 21, sectionEn: 'Quality & Authenticity', sectionAr: 'الجودة والأصالة',
  }));
  pages.push(logisticsPage()); // 22
  pages.push(digitalPage()); // 23
  pages.push(futureVisionPage()); // 24
  pages.push(contactPage()); // 25
  pages.push(backCoverPage()); // 26
  return pages;
}

module.exports = { buildAll, TOTAL };
