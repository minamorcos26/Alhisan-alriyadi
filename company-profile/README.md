# Alhisan Alriyadi (Athletic Horse) — Bilingual Company Profile

## Files in this folder

| File | What it is |
|---|---|
| `print/Alhisan-Alriyadi-Company-Profile.pdf` | **Primary deliverable.** 26-page premium, bilingual (EN/AR), print-ready editorial company profile — A4 + 3mm bleed, full-bleed diagonal brand panels, real brand logo, real embedded fonts (Bebas Neue / Tajawal / Source Sans 3), vector text. Sports-brand-catalogue style (Nike/Adidas/Decathlon energy), not a slide deck. |
| `print/build/` | Full source for the PDF above (HTML/CSS + a Node/Playwright render pipeline) — see `print/build/README.md` to edit copy or rebuild. |
| `Alhisan-Alriyadi-Company-Profile.pptx` | Earlier 16:9 slide-deck version of the same 26-page structure. Kept for quick digital/PowerPoint viewing; the PDF above is the current, more premium deliverable. |
| `DESIGN-SPEC.md` | Page-by-page creative brief (objective/layout/imagery/icons/CTA) written for the earlier .pptx version — still useful as a content reference, but the print PDF's own design (diagonal panels, motion lines, pull-quotes) supersedes its literal layout notes. |
| `README.md` | This file. |

## Important — grounded in the real business, not the original brief

The original creative brief described an Egypt-based B2B company running sports academies, event management and manufacturing/OEM production for governments. That does not match the actual business: **Alhisan Alriyadi / Athletic Horse is a retail e-commerce sporting-goods store operating in Saudi Arabia** (SAR pricing, Mada/Visa/Apple Pay, delivery "across the Kingdom", VAT 15%, social handles `@athletic_horse`, WhatsApp +966...), confirmed from both the live site (athletic-horse.com) and the store's own Shopify theme repository.

Per direction, this profile is built entirely around the **real Saudi Arabia business, in SAR, with no Egypt content**. Academies / events / manufacturing are **not** presented as current services — they appear once, on the "Future Vision & Growth" page, explicitly labeled as forward-looking strategic direction rather than fact.

## Logo

Real brand artwork (supplied) is used throughout: the horse-mark emblem and full EN/AR lockup, in green, white and black variants, extracted with transparent backgrounds from the supplied files. No placeholder logo remains.

## No photography — by design, for now

The image-generation tool connected to this session had zero credits, and there's no licensed stock-photo source available here, so **no photos — generated or stock — are used**. Every place a photo belongs (10 category pages, Welcome, Who We Are, Our Story, Vision, Mission, Quality, Digital, Contact) is a designed diagonal brand panel: motion-line texture, a large ghost icon, and a small caption naming exactly what photography to drop in (e.g. "Photography — football lifestyle / product shot, to be added"). See `print/build/README.md` → "Where to drop in real photography" for how to swap them in once real shots are available.

## Placeholders that still need the client's real figures

Search the PDF for `[` / "placeholder" / "to be confirmed":

- Executive name/title for the Welcome Message signature
- Exact founding date and growth milestones (Our Story page)
- Number of cities covered by delivery (Logistics page — currently `X+`)
- Business email address (Contact page)
- Real photography (see above)

## Brand system used

- **Colors:** Green `#14532D` (primary), Dark `#0F3D22`, Soft `#E7F0EA`, Ink `#121212`, Off-white `#F5F5F3`, White, plus a sparing bright-emerald energy accent `#34D399` for stat highlights on dark pages — extracted from `shopify-theme/assets/theme.css` and `config/settings_data.json`.
- **Typography:** Bebas Neue (EN display/headlines), Tajawal 700–900 (AR display/headlines), Source Sans 3 (EN body), Tajawal 400–500 (AR body) — the real brand fonts, embedded as actual font files in the PDF (not a substitute — Chromium print, unlike PowerPoint/LibreOffice, renders them natively).
- **Visual system:** diagonal full-bleed brand panels, sweeping motion-line accents, circular icon badges (one consistent icon family), oversized ghost numerals/icons, rounded pill tags for product lists, big pull-quote treatment for Vision/Mission.

## Print specs

- Page size 216×303mm = A4 (210×297mm) + 3mm bleed on every edge — trim to A4 after printing.
- Colors authored in sRGB; convert to CMYK in your print workflow before commercial printing.
- Text is real vector text (embedded fonts), so it stays crisp and searchable at any size — this is a genuine print PDF, not flattened images.

## QR code placement

A QR placeholder square already sits in the diagonal panel on the **Contact Us** page ("Scan to visit athletic-horse.com"); drop a real QR code into that white square before printing. Add a matching one to the **Back Cover** near the website URL if desired.
