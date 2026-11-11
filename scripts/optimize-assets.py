"""Recreate optimized copies; never modifies source files.
Usage: python scripts/optimize-assets.py [originals/petamigo/assets]
Requires: Pillow, fonttools[woff], brotli.
"""
import sys
from pathlib import Path
from PIL import Image
from fontTools.ttLib import TTFont

source = Path(sys.argv[1] if len(sys.argv) > 1 else 'originals/petamigo/assets')
output = Path('public/assets')
output.mkdir(parents=True, exist_ok=True)
used = {'adoption-luna', 'blog-hygiene', 'club-dog', 'footer-pets', 'grooming-after', 'grooming-before', 'hero-pets', 'logo-v2', 'map', 'product-caminha', 'product-corda', 'product-racao', 'product-shampoo', 'service-adocao', 'service-banho', 'service-creche', 'service-farmacia', 'service-hotel', 'service-veterinario', 'storefront', 'testimonial-carla-dog'}
for file in source.glob('*.png'):
    if file.stem not in used:
        continue
    image = Image.open(file)
    if image.mode == 'RGBA' and image.getbbox():
        image = image.crop(image.getbbox())
    image.thumbnail((1400 if file.stem == 'hero-pets' else 1000, 1200))
    image.save(output / f'{file.stem}.webp', 'WEBP', quality=86, method=6)
for file in source.glob('nunito*.ttf'):
    font = TTFont(file)
    font.flavor = 'woff2'
    font.save(output / f'{file.stem}.woff2')
print(f'Optimized copies saved in {output}. Originals unchanged.')
