const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const Fa = require('react-icons/fa');
const Md = require('react-icons/md');
const Gi = require('react-icons/gi');

const OUT = path.join(__dirname, 'icons');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// name -> [library component, color]
const GREEN = '14532D';
const WHITE = 'FFFFFF';

const icons = {
  // core values / brand
  eye: [Fa.FaEye, GREEN],
  compass: [Fa.FaCompass, GREEN],
  bullseye: [Fa.FaBullseye, GREEN],
  handshake: [Fa.FaHandshake, GREEN],
  shieldcheck: [Fa.FaShieldAlt, GREEN],
  bolt: [Fa.FaBolt, GREEN],
  users: [Fa.FaUsers, GREEN],
  star: [Fa.FaStar, GREEN],
  // categories
  football: [Fa.FaFutbol, GREEN],
  dumbbell: [Fa.FaDumbbell, GREEN],
  swim: [Fa.FaSwimmer, GREEN],
  martial: [Gi.GiKimono, GREEN],
  racket: [Fa.FaTableTennis, GREEN],
  basketball: [Fa.FaBasketballBall, GREEN],
  child: [Fa.FaChild, GREEN],
  tent: [Gi.GiCampingTent, GREEN],
  tshirt: [Fa.FaTshirt, GREEN],
  bag: [Fa.FaShoppingBag, GREEN],
  medkit: [Fa.FaMedkit, GREEN],
  trophy: [Fa.FaTrophy, GREEN],
  flag: [Fa.FaFlag, GREEN],
  // services / footer
  truck: [Fa.FaTruck, GREEN],
  headset: [Fa.FaHeadset, GREEN],
  lock: [Fa.FaLock, GREEN],
  mobile: [Fa.FaMobileAlt, GREEN],
  whatsapp: [Fa.FaWhatsapp, GREEN],
  instagram: [Fa.FaInstagram, GREEN],
  tiktok: [Fa.FaTiktok, GREEN],
  snapchat: [Fa.FaSnapchatGhost, GREEN],
  facebook: [Fa.FaFacebook, GREEN],
  mappin: [Fa.FaMapMarkerAlt, GREEN],
  envelope: [Fa.FaEnvelope, GREEN],
  camera: [Fa.FaCamera, GREEN],
  rocket: [Fa.FaRocket, GREEN],
  chartline: [Fa.FaChartLine, GREEN],
  boxes: [Fa.FaBoxes, GREEN],
  globe: [Fa.FaGlobe, GREEN],
};

// White variants for use on dark/green backgrounds — generate for every icon
const whiteVariants = Object.keys(icons);

async function renderIcon(Component, color, size, filepath) {
  const svgMarkup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Component, { size, color: `#${color}` })
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">${svgMarkup.replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>`;
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(filepath);
}

(async () => {
  for (const [name, [Component, color]] of Object.entries(icons)) {
    await renderIcon(Component, color, 256, path.join(OUT, `${name}.png`));
  }
  for (const name of whiteVariants) {
    const [Component] = icons[name];
    await renderIcon(Component, WHITE, 256, path.join(OUT, `${name}_white.png`));
  }
  console.log('Icons generated:', Object.keys(icons).length, '+', whiteVariants.length, 'white variants');
})();
