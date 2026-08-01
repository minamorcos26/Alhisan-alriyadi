const { FONTS_CSS } = require('./assets');

const CSS = `
${FONTS_CSS}

:root{
  --green:#14532D; --green-dark:#0F3D22; --green-soft:#E7F0EA; --energy:#34D399;
  --ink:#121212; --ink-soft:#3F3F3F; --muted:#767676; --white:#FFFFFF; --offwhite:#F5F5F3;
  --line:#E4E4E1;
}
*{box-sizing:border-box; margin:0; padding:0;}
html,body{ background:#ccc; }
body{ font-family:'Source Sans 3',Arial,sans-serif; color:var(--ink); }
.pages{ }
.page{
  position:relative; width:216mm; height:303mm; overflow:hidden; background:var(--white);
  break-after:page; page-break-after:always;
}
.page:last-child{ break-after:auto; page-break-after:auto; }
.safe{ position:absolute; inset:3mm; }
.bleed{ position:absolute; inset:0; }

h1,h2,h3,h4{ font-weight:400; line-height:0.95; }
.f-display{ font-family:'Bebas Neue',Arial,sans-serif; text-transform:uppercase; }
.f-display-ar{ font-family:'Tajawal',sans-serif; font-weight:900; }
.f-body{ font-family:'Source Sans 3',Arial,sans-serif; }
.f-body-ar{ font-family:'Tajawal',sans-serif; }

.eyebrow{ font-family:'Source Sans 3',sans-serif; font-weight:700; font-size:10.5pt; letter-spacing:3px; text-transform:uppercase; }
.rtl{ direction:rtl; text-align:right; }
.ltr{ direction:ltr; text-align:left; }

.ghost-num{
  position:absolute; font-family:'Bebas Neue',sans-serif; font-size:210mm; line-height:1; color:transparent;
  -webkit-text-stroke:1.4px rgba(255,255,255,0.14);
  z-index:0; user-select:none; pointer-events:none;
}
.ghost-num.dark{ -webkit-text-stroke:1.4px rgba(20,83,45,0.10); }

.badge{
  border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.badge img{ display:block; }

.pill{
  display:inline-flex; align-items:center; gap:2.2mm; border-radius:8mm; padding:2.6mm 4.5mm;
  background:var(--offwhite); font-size:9.3pt; color:var(--ink); font-family:'Source Sans 3',sans-serif;
}
.pill .dot{ width:1.6mm; height:1.6mm; border-radius:50%; background:var(--green); flex-shrink:0; }

.footer-num{ position:absolute; font-family:'Source Sans 3',sans-serif; font-weight:700; font-size:9pt; letter-spacing:1px; }
.footer-tag{ position:absolute; font-family:'Source Sans 3',sans-serif; font-weight:700; font-size:8pt; letter-spacing:2.5px; text-transform:uppercase; }

.stat-num{ font-family:'Bebas Neue',sans-serif; font-size:52pt; line-height:1; color:var(--green); }
.stat-label{ font-family:'Source Sans 3',sans-serif; font-weight:700; font-size:9.5pt; }
.stat-label-ar{ font-family:'Tajawal',sans-serif; font-weight:500; font-size:9.5pt; }

svg.motion{ position:absolute; z-index:0; }
`;

module.exports = { CSS };
