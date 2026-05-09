import json

with open('src/data/catalog.json', 'r') as f:
    catalog = json.load(f)

for product in catalog['products']:
    images = product.get('images', [])
    if len(images) > 1:
        print(f"{product['slug']}:")
        for img in images:
            print(f"  {img}")
