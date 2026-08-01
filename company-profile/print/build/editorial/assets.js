const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function b64(relPath) {
  const p = path.join(ROOT, relPath);
  const buf = fs.readFileSync(p);
  const ext = path.extname(p).slice(1);
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  return `data:image/${mime};base64,${buf.toString('base64')}`;
}

const FONTS_CSS = fs.readFileSync(path.join(ROOT, 'fonts', 'fonts-embedded.css'), 'utf-8');

const LOGO = {
  markGreen: b64('logo/horse_mark_green.png'),
  markWhite: b64('logo/horse_mark_white.png'),
  markDark: b64('logo/horse_mark_darkgreen.png'),
  lockupGreen: b64('logo/lockup_green_cropped.png'),
  lockupBlack: b64('logo/lockup_black_cropped.png'),
  lockupWhite: b64('logo/lockup_white_cropped.png'),
};

const ICON_NAMES = [
  'eye','compass','bullseye','handshake','shieldcheck','bolt','users','star',
  'football','dumbbell','swim','martial','racket','basketball','child','tent','tshirt','bag','medkit','trophy','flag',
  'truck','headset','lock','mobile','whatsapp','instagram','tiktok','snapchat','facebook','mappin','envelope','camera',
  'rocket','chartline','boxes','globe',
];

const ICON = {};
for (const name of ICON_NAMES) {
  ICON[name] = b64(`icons/${name}.png`);
  const whitePath = path.join(ROOT, 'icons', `${name}_white.png`);
  if (fs.existsSync(whitePath)) ICON[`${name}_white`] = b64(`icons/${name}_white.png`);
}

module.exports = { FONTS_CSS, LOGO, ICON };
