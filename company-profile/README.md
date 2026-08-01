# Alhisan Alriyadi (Athletic Horse) — Bilingual Company Profile

## Files in this folder

| File | What it is |
|---|---|
| `Alhisan-Alriyadi-Company-Profile.pptx` | The 26-page premium bilingual (English + Arabic) company profile deck. Open directly in PowerPoint, Keynote, Google Slides, or import into Canva/InDesign. |
| `DESIGN-SPEC.md` | Page-by-page creative brief: objective, layout, imagery, icons, palette, typography, infographic and CTA notes for every page — for a designer to extend the deck with real photography. |
| `README.md` | This file. |

## Important — grounded in the real business, not the original brief

The original creative brief described an Egypt-based B2B company running sports academies, event management and manufacturing/OEM production for governments. That does not match the actual business: **Alhisan Alriyadi / Athletic Horse is a retail e-commerce sporting-goods store operating in Saudi Arabia** (SAR pricing, Mada/Visa/Apple Pay, delivery "across the Kingdom", VAT 15%, social handles `@athletic_horse`, WhatsApp +966...), confirmed from both the live site (athletic-horse.com) and the store's own Shopify theme repository.

Per direction, this profile is built entirely around the **real Saudi Arabia business, in SAR, with no Egypt content**. Academies / events / manufacturing are **not** presented as current services — they appear once, on the "Future Vision & Growth" page, explicitly labeled as forward-looking strategic direction rather than fact.

## Placeholders that need the client's real figures

Marked directly in the deck (search `[` in the file) and flagged here for visibility:

- Executive name/title for the Welcome Message signature
- Exact founding date and growth milestones (Our Story page)
- Number of cities covered by delivery (Logistics page — currently `[X]+`)
- Business email address (Contact page)
- Actual logo artwork (the deck uses a text/icon lockup in brand colors; no logo image file exists in the repo — only a Shopify CDN reference — so drop in the real logo file when available)
- All "Suggested image" boxes are placeholders describing the recommended photography; swap in real product/lifestyle photography from the brand's shoot library or website before printing

## Brand system used (extracted from `shopify-theme/`)

- **Colors:** Background `#FFFFFF` / alt `#FAFAFA`, Ink `#171717`, Ink-soft `#404040`, Ink-muted `#737373`, Border `#E5E5E5`, **Accent Green `#14532D`**, Accent Dark `#0F3D22`, Accent Soft `#E7F0EA`
- **Typography (brand):** Display — Bebas Neue; Body (English) — Source Sans Pro; Body (Arabic) — Tajawal. *(The .pptx itself uses Arial/Calibri as safe stand-ins so the file renders identically on any machine; swap in the brand fonts once opened in PowerPoint if they're installed.)*
- **Logo:** referenced in theme settings as `alhisan-alriyadi-logo-transparent.png` / emblem favicon — not present as a file in this repo, so the deck uses a placeholder lockup
- **Visual motif:** rounded cards, circular icon badges, generous white space, no accent stripes/underlines (matches the "Minimalism & Swiss Style" direction noted in `theme.css`)

## Using / editing the deck

- **PowerPoint / Keynote / Google Slides:** open the `.pptx` directly.
- **Canva:** Canva can import `.pptx` (File → Import). Re-link the placeholder image boxes to real photography from Canva's library or uploads.
- **Adobe InDesign:** InDesign doesn't open `.pptx` natively — export each slide to PDF/PNG from PowerPoint first, or rebuild the grid using the specs in `DESIGN-SPEC.md` (all measurements are on a 13.33" × 7.5" widescreen canvas with 0.8" side margins, so they map directly onto an InDesign page grid).
- **Print:** the deck is built at 13.33" × 7.5" (16:9). For a printed brochure, resize to A4/Letter portrait or a square trim in your layout tool, using `DESIGN-SPEC.md` as the content/hierarchy reference rather than the literal pixel positions.

## QR code placement

Add a QR code linking to `athletic-horse.com` (or the WhatsApp chat link) in the bottom-right corner of the **Back Cover** and the **Contact Us** page, sized ~1" square with a 0.3" quiet margin, on the white/light areas so it stays scannable against the green background.
