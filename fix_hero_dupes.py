import json
import os
from PIL import Image
import imagehash
from collections import defaultdict

with open('src/data/catalog.json', 'r') as f:
    catalog = json.load(f)

# hash -> list of product indices
hero_hashes = defaultdict(list)

for idx, product in enumerate(catalog['products']):
    hero_path = product.get('image')
    if not hero_path: continue
    
    local_path = "public" + hero_path
    if os.path.exists(local_path):
        try:
            img = Image.open(local_path)
            h = str(imagehash.phash(img))
            
            matched = False
            for seen_h in list(hero_hashes.keys()):
                dist = bin(int(h, 16) ^ int(seen_h, 16)).count('1')
                if dist <= 5:
                    hero_hashes[seen_h].append(idx)
                    matched = True
                    break
            
            if not matched:
                hero_hashes[h].append(idx)
        except Exception:
            pass

modifications = 0
files_to_delete = []

for h, indices in hero_hashes.items():
    if len(indices) <= 1:
        continue
        
    print(f"\nHero image conflict for hash {h} across {len(indices)} products:")
    
    # The first product keeps the hero image
    winner_idx = indices[0]
    winner_slug = catalog['products'][winner_idx]['slug']
    print(f"  -> Winner keeps hero image: {winner_slug} ({catalog['products'][winner_idx]['image']})")
    
    # For subsequent products, we must pick a new hero image from their gallery
    for prod_idx in indices[1:]:
        loser_product = catalog['products'][prod_idx]
        old_hero = loser_product['image']
        print(f"  -> Loser needs new hero image: {loser_product['slug']}")
        
        # Try to find a replacement image in their gallery
        replacement = None
        for img in loser_product.get('images', []):
            if img != old_hero:
                replacement = img
                break
                
        if replacement:
            print(f"     Replaced {old_hero} with {replacement}")
            loser_product['image'] = replacement
            # Reorder images so the new hero is first, and remove old_hero
            loser_product['images'] = [replacement] + [img for img in loser_product['images'] if img != old_hero and img != replacement]
            modifications += 1
            
            # The old hero is a duplicate, we can delete the file if it's a -gallery- file, but if it's the main .jpg for the loser, we can delete it too
            # because the winner has its own .jpg or shares it. Wait, if it shares the EXACT SAME file path, we shouldn't delete it.
            # If the loser had its own uniquely named file (like `motorized-sliding-roof.jpg` and `aluminium-frame-roof-sliding-system.jpg`), they are physically different files with the same visual content.
            if old_hero != catalog['products'][winner_idx]['image']:
                files_to_delete.append("public" + old_hero)
        else:
            print(f"     WARNING: No alternative image found for {loser_product['slug']}")

if modifications > 0:
    with open('src/data/catalog.json', 'w') as f:
        json.dump(catalog, f, indent=2)
    print(f"\nFixed {modifications} hero image duplicates.")
    
    for f in set(files_to_delete):
        try:
            os.remove(f)
            print(f"Deleted physical file: {f}")
        except Exception as e:
            print(f"Could not delete {f}: {e}")
else:
    print("\nNo hero duplicates found that required modification.")

