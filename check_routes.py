
import requests
import sys

SITE_URL = "http://localhost:3000" # Assume local dev server for check

ROUTES = [
    "/",
    "/about",
    "/services",
    "/clients",
    "/media",
    "/contact",
    "/faq",
    "/blog",
    "/locations",
    "/solutions",
    "/privacy",
    "/terms",
    "/sitemap",
    "/search",
    "/category/sound-proof-windows",
    "/product/sound-proof-sliding-windows",
    "/showcase/isro-gaganyaan",
]

def check_routes():
    print(f"Checking {len(ROUTES)} routes on {SITE_URL}...")
    failed = []
    for route in ROUTES:
        try:
            url = f"{SITE_URL}{route}"
            resp = requests.get(url, timeout=5)
            if resp.status_code != 200:
                print(f"[FAIL] {resp.status_code} - {route}")
                failed.append(route)
            else:
                print(f"[OK] 200 - {route}")
        except Exception as e:
            print(f"[ERROR] {route}: {str(e)}")
            failed.append(route)
    
    if failed:
        print(f"\nFailed routes: {len(failed)}")
        sys.exit(1)
    else:
        print("\nAll routes OK.")

if __name__ == "__main__":
    check_routes()
