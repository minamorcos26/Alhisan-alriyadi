# Rebuilding the print PDF

Source for `../Alhisan-Alriyadi-Company-Profile.pdf`. HTML/CSS + Chromium print, not PowerPoint — this is what lets it use the real brand fonts (Bebas Neue, Tajawal, Source Sans 3) and diagonal/full-bleed layouts that PowerPoint can't render reliably.

## Layout

- `editorial/content.js` — all bilingual (EN/AR) product-category copy
- `editorial/pages.js` — the 26 page templates (cover, TOC, split pages, category spreads, stats, etc.) — **edit page copy and layout here**
- `editorial/parts.js` / `editorial/styles.js` — shared components (icon badges, diagonal panels, motion-line graphics) and the design-system CSS (brand colors/type in `styles.js`)
- `editorial/assets.js` — loads and base64-embeds fonts/logos/icons into the HTML so the file is fully self-contained
- `logo/` — processed brand logo (horse mark + full lockups, green/white/black, transparent PNGs) extracted from the client-supplied artwork; `process_logo.py` regenerates them from raw source files if needed
- `icons/` — one consistent icon set (react-icons, rendered to PNG); `gen_icons.js` regenerates it — edit the `icons` map in that file to add/swap icons
- `fonts/fonts-embedded.css` — pre-fetched, base64-embedded Google Fonts (Bebas Neue, Source Sans 3, Tajawal) so no network access is needed at build time; `build_fonts_css.py` regenerates it if fonts change

## Rebuild steps

```bash
cd editorial
npm install pptxgenjs react-icons react react-dom sharp playwright   # first time only; pptxgenjs/react-icons/sharp are only needed if you also touch gen_icons.js
node ../gen_icons.js      # only if you changed the icon set
node build.js             # assembles profile.html from the templates
node render.js            # renders profile.html -> ../Alhisan-Alriyadi-Company-Profile.pdf (+ previews/*.png)
```

`render.js` launches Chromium directly from the Playwright browser cache — if `playwright install` was never run in your environment, point `executablePath` in `render.js` at your local Chromium instead.

## Rebuilding the .pptx

The PowerPoint version is generated *from* the same render — it composites the 26 `previews/page-NN.png` images (produced by `render.js` above) onto full-bleed slides at a matching custom A4+bleed slide size. Run it after `render.js`:

```bash
node build_pptx.js   # -> ../../Alhisan-Alriyadi-Company-Profile.pptx
```

This keeps the .pptx pixel-identical to the PDF, but its text is flattened into the slide image (not editable in PowerPoint). To change copy, edit `pages.js`, then rerun `build.js` → `render.js` → `build_pptx.js` in that order.

## Where to drop in real photography

Every diagonal color panel currently shows a faint icon watermark + a small caption reading "Photography — ... to be added". Search `pages.js` for `diagPanel(` and `caption:` to find each spot — replace the panel's icon/texture with a real `<img>` (see `diagPanel()` in `pages.js`) once brand photography is available.

## Print specs

- Page size: 216mm × 303mm = A4 (210×297mm) + 3mm bleed on all sides. Trim to 210×297mm after printing.
- Colors are authored in sRGB; convert to CMYK in your print workflow (`#14532D` ≈ C77 M35 Y75 K33).
- Fonts are embedded as vector text (not flattened images), so the PDF stays crisp at any size and is searchable/selectable.
