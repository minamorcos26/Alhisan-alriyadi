from PIL import Image
import numpy as np
import os

BASE = os.path.dirname(__file__)
BRAND_GREEN = (0x14, 0x53, 0x2D)
WHITE = (255, 255, 255)

def autocrop(im, pad=20):
    arr = np.array(im)
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 10)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, im.height)
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, im.width)
    return im.crop((x0, y0, x1, y1))

def mask_from_white_bg(im, color, thresh=210, floor=64):
    im = im.convert('RGB')
    arr = np.array(im).astype(np.int16)
    # "whiteness" -> alpha 0 ; darker (the horse ink, min ~64) -> alpha 255, antialiased edges in between
    lum = arr.mean(axis=2)
    alpha = np.clip((thresh - lum) / (thresh - floor) * 255, 0, 255).astype(np.uint8)
    out = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    out[:, :, 0] = color[0]
    out[:, :, 1] = color[1]
    out[:, :, 2] = color[2]
    out[:, :, 3] = alpha
    return Image.fromarray(out, 'RGBA')

def recolor_keep_alpha(im, color):
    arr = np.array(im.convert('RGBA'))
    out = arr.copy()
    out[:, :, 0] = color[0]
    out[:, :, 1] = color[1]
    out[:, :, 2] = color[2]
    return Image.fromarray(out, 'RGBA')

# 1) Standalone horse mark, from the white-bg JPEG, recolored to exact brand green + white variant
src = Image.open(os.path.join(BASE, 'horse_mark_green_src.jpeg'))
mark_green = mask_from_white_bg(src, BRAND_GREEN)
mark_green = autocrop(mark_green, pad=40)
mark_green.save(os.path.join(BASE, 'horse_mark_green.png'))

mark_white = recolor_keep_alpha(mark_green, WHITE)
mark_white.save(os.path.join(BASE, 'horse_mark_white.png'))

mark_dark = mask_from_white_bg(src, (0x0F, 0x3D, 0x22))
mark_dark = autocrop(mark_dark, pad=40)
mark_dark.save(os.path.join(BASE, 'horse_mark_darkgreen.png'))

# 2) Full lockups: autocrop transparent PNGs tightly
for name in ['lockup_green.png', 'lockup_black.png']:
    im = Image.open(os.path.join(BASE, name)).convert('RGBA')
    cropped = autocrop(im, pad=30)
    cropped.save(os.path.join(BASE, name.replace('.png', '_cropped.png')))

# 3) White lockup (for dark backgrounds): take green lockup, recolor all non-transparent pixels to white
lockup_white = recolor_keep_alpha(Image.open(os.path.join(BASE, 'lockup_green_cropped.png')), WHITE)
lockup_white.save(os.path.join(BASE, 'lockup_white_cropped.png'))

for f in ['horse_mark_green.png', 'horse_mark_white.png', 'horse_mark_darkgreen.png', 'lockup_green_cropped.png', 'lockup_black_cropped.png', 'lockup_white_cropped.png']:
    im = Image.open(os.path.join(BASE, f))
    print(f, im.size)
