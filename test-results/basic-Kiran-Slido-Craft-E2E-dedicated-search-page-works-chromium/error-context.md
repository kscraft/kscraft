# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: basic.spec.ts >> Kiran Slido Craft E2E >> dedicated search page works
- Location: tests/e2e/basic.spec.ts:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/ISRO Gaganyaan Mission/i)
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/ISRO Gaganyaan Mission/i)

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "KSC Kiran Slido Craft" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "KSC" [ref=e6]
        - generic [ref=e7]: Kiran Slido Craft
      - navigation [ref=e8]:
        - list [ref=e9]:
          - listitem [ref=e10]:
            - link "Overview" [ref=e11] [cursor=pointer]:
              - /url: /
          - listitem [ref=e12]:
            - link "Acoustics" [ref=e13] [cursor=pointer]:
              - /url: /category/sound-proof-windows
          - listitem [ref=e14]:
            - link "Automation" [ref=e15] [cursor=pointer]:
              - /url: /category/motorized-systems
          - listitem [ref=e16]:
            - link "Engineering" [ref=e17] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e18]:
            - link "Insights" [ref=e19] [cursor=pointer]:
              - /url: /blog
          - listitem [ref=e20]:
            - link "Media" [ref=e21] [cursor=pointer]:
              - /url: /media
          - listitem [ref=e22]:
            - link "About" [ref=e23] [cursor=pointer]:
              - /url: /about
          - listitem [ref=e24]:
            - button "Catalog" [ref=e25]:
              - text: Catalog
              - img [ref=e26]
        - generic [ref=e28]:
          - link "Search" [ref=e29] [cursor=pointer]:
            - /url: /search
            - img [ref=e30]
          - button "Get a Quote" [ref=e33]
  - main [ref=e34]:
    - generic [ref=e36]:
      - generic [ref=e38]:
        - heading "Search Systems" [level=1] [ref=e39]
        - paragraph [ref=e40]: Find high-performance acoustic and automation systems by technical specification.
        - generic [ref=e42]:
          - img [ref=e44]
          - textbox "Search specifications (e.g. STC 50, Motorized, Sliding)..." [active] [ref=e47]: ISRO
      - generic [ref=e50]:
        - complementary [ref=e51]:
          - generic [ref=e52]:
            - generic [ref=e53]: Categories
            - generic [ref=e54]:
              - button "All Categories" [ref=e55]
              - button "Acoustic Windows" [ref=e56]
              - button "Acoustic Partitions" [ref=e57]
              - button "Acoustic Doors" [ref=e58]
              - button "Automation Systems" [ref=e59]
              - button "Retractable Roofs" [ref=e60]
          - generic [ref=e61]:
            - paragraph [ref=e62]: Custom Ask?
            - paragraph [ref=e63]: Can't find a specific technical system? Our engineering team builds bespoke solutions.
            - link "Contact Engineering →" [ref=e64] [cursor=pointer]:
              - /url: /contact
        - main [ref=e65]:
          - paragraph [ref=e67]: Found 23 systems matching your query
          - generic [ref=e69]:
            - article [ref=e70]:
              - button "Add to compare" [ref=e71]:
                - img [ref=e72]
              - link "Acoustic Windows Acoustic Window Series High-performance aluminum acoustic windows featuring precision compression seals and specialized multi-layer glass. Acoustic Window Series Learn more>" [ref=e75] [cursor=pointer]:
                - /url: /product/sound-proof-windows
                - generic [ref=e76]:
                  - paragraph [ref=e77]: Acoustic Windows
                  - heading "Acoustic Window Series" [level=3] [ref=e78]
                  - paragraph [ref=e79]: High-performance aluminum acoustic windows featuring precision compression seals and specialized multi-layer glass.
                - img "Acoustic Window Series" [ref=e82]
                - generic [ref=e84]: Learn more>
            - article [ref=e85]:
              - button "Add to compare" [ref=e86]:
                - img [ref=e87]
              - link "Acoustic Windows Sound Proof Sliding Windows Engineered for wide openings where sound isolation and horizontal movement are critical. Sound Proof Sliding Windows Learn more>" [ref=e90] [cursor=pointer]:
                - /url: /product/sound-proof-sliding-windows
                - generic [ref=e91]:
                  - paragraph [ref=e92]: Acoustic Windows
                  - heading "Sound Proof Sliding Windows" [level=3] [ref=e93]
                  - paragraph [ref=e94]: Engineered for wide openings where sound isolation and horizontal movement are critical.
                - img "Sound Proof Sliding Windows" [ref=e97]
                - generic [ref=e99]: Learn more>
            - article [ref=e100]:
              - button "Add to compare" [ref=e101]:
                - img [ref=e102]
              - link "Acoustic Windows Acoustic Tilt & Turn Windows European-style dual opening windows providing maximum perimeter sealing and versatile ventilation. Acoustic Tilt & Turn Windows Learn more>" [ref=e105] [cursor=pointer]:
                - /url: /product/sound-proof-tilt-turn-windows
                - generic [ref=e106]:
                  - paragraph [ref=e107]: Acoustic Windows
                  - heading "Acoustic Tilt & Turn Windows" [level=3] [ref=e108]
                  - paragraph [ref=e109]: European-style dual opening windows providing maximum perimeter sealing and versatile ventilation.
                - img "Acoustic Tilt & Turn Windows" [ref=e112]
                - generic [ref=e114]: Learn more>
            - article [ref=e115]:
              - button "Add to compare" [ref=e116]:
                - img [ref=e117]
              - link "Acoustic Windows Acoustic Casement Windows The industry standard for maximum noise reduction. Our Sound Proof Casement Windows utilize a triple-point compression seal and heavy-duty decoupled frames to completely eliminate flanking paths. Delivering exceptional OITC and STC acoustic ratings, these windows are the definitive solution for properties situated near airports, highways, or heavy industrial zones. Acoustic Casement Windows Learn more>" [ref=e120] [cursor=pointer]:
                - /url: /product/sound-proof-casement-windows
                - generic [ref=e121]:
                  - paragraph [ref=e122]: Acoustic Windows
                  - heading "Acoustic Casement Windows" [level=3] [ref=e123]
                  - paragraph [ref=e124]: The industry standard for maximum noise reduction. Our Sound Proof Casement Windows utilize a triple-point compression seal and heavy-duty decoupled frames to completely eliminate flanking paths. Delivering exceptional OITC and STC acoustic ratings, these windows are the definitive solution for properties situated near airports, highways, or heavy industrial zones.
                - img "Acoustic Casement Windows" [ref=e127]
                - generic [ref=e129]: Learn more>
            - article [ref=e130]:
              - button "Add to compare" [ref=e131]:
                - img [ref=e132]
              - link "Acoustic Windows Acoustic Top Hung Windows Specialized windows designed for high-level ventilation with reliable soundproofing performance. Acoustic Top Hung Windows Learn more>" [ref=e135] [cursor=pointer]:
                - /url: /product/sound-proof-top-hung-windows
                - generic [ref=e136]:
                  - paragraph [ref=e137]: Acoustic Windows
                  - heading "Acoustic Top Hung Windows" [level=3] [ref=e138]
                  - paragraph [ref=e139]: Specialized windows designed for high-level ventilation with reliable soundproofing performance.
                - img "Acoustic Top Hung Windows" [ref=e142]
                - generic [ref=e144]: Learn more>
            - article [ref=e145]:
              - button "Add to compare" [ref=e146]:
                - img [ref=e147]
              - link "Acoustic Windows Acoustic Vertical Sliding Windows Classic vertical sash windows reimagined with modern acoustic engineering for space-saving ventilation. Acoustic Vertical Sliding Windows Learn more>" [ref=e150] [cursor=pointer]:
                - /url: /product/sound-proof-vertical-sliding-windows
                - generic [ref=e151]:
                  - paragraph [ref=e152]: Acoustic Windows
                  - heading "Acoustic Vertical Sliding Windows" [level=3] [ref=e153]
                  - paragraph [ref=e154]: Classic vertical sash windows reimagined with modern acoustic engineering for space-saving ventilation.
                - img "Acoustic Vertical Sliding Windows" [ref=e157]
                - generic [ref=e159]: Learn more>
            - article [ref=e160]:
              - button "Add to compare" [ref=e161]:
                - img [ref=e162]
              - link "Acoustic Partitions Fixed Acoustic Partition Permanent sound isolation walls with clean architectural finishes and high transmission loss. Fixed Acoustic Partition Learn more>" [ref=e165] [cursor=pointer]:
                - /url: /product/sound-proof-acoustic-fix-partition
                - generic [ref=e166]:
                  - paragraph [ref=e167]: Acoustic Partitions
                  - heading "Fixed Acoustic Partition" [level=3] [ref=e168]
                  - paragraph [ref=e169]: Permanent sound isolation walls with clean architectural finishes and high transmission loss.
                - img "Fixed Acoustic Partition" [ref=e172]
                - generic [ref=e174]: Learn more>
            - article [ref=e175]:
              - button "Add to compare" [ref=e176]:
                - img [ref=e177]
              - link "Acoustic Partitions Sliding Folding Partition Flexible acoustic partitions that stack neatly, allowing for rapid conversion of large spaces. Sliding Folding Partition Learn more>" [ref=e180] [cursor=pointer]:
                - /url: /product/sound-proof-sliding-folding-partition
                - generic [ref=e181]:
                  - paragraph [ref=e182]: Acoustic Partitions
                  - heading "Sliding Folding Partition" [level=3] [ref=e183]
                  - paragraph [ref=e184]: Flexible acoustic partitions that stack neatly, allowing for rapid conversion of large spaces.
                - img "Sliding Folding Partition" [ref=e187]
                - generic [ref=e189]: Learn more>
            - article [ref=e190]:
              - button "Add to compare" [ref=e191]:
                - img [ref=e192]
              - link "Acoustic Doors Acoustic Sliding Doors Engineered for ultimate acoustic isolation, our Sound Proof Sliding Doors feature an advanced compression sealing system and multi-layered acoustic laminated glass. Designed to achieve superior STC ratings, these doors block high-decibel exterior noise, making them ideal for recording studios, luxury hotels, and commercial boardrooms where space-saving sliding mechanics and speech privacy are critical. Acoustic Sliding Doors Learn more>" [ref=e195] [cursor=pointer]:
                - /url: /product/sound-proof-sliding-doors
                - generic [ref=e196]:
                  - paragraph [ref=e197]: Acoustic Doors
                  - heading "Acoustic Sliding Doors" [level=3] [ref=e198]
                  - paragraph [ref=e199]: Engineered for ultimate acoustic isolation, our Sound Proof Sliding Doors feature an advanced compression sealing system and multi-layered acoustic laminated glass. Designed to achieve superior STC ratings, these doors block high-decibel exterior noise, making them ideal for recording studios, luxury hotels, and commercial boardrooms where space-saving sliding mechanics and speech privacy are critical.
                - img "Acoustic Sliding Doors" [ref=e202]
                - generic [ref=e204]: Learn more>
            - article [ref=e205]:
              - button "Add to compare" [ref=e206]:
                - img [ref=e207]
              - link "Acoustic Doors Acoustic Slide-Fold Doors Bifold acoustic door systems providing versatile opening widths with high performance sealing. Acoustic Slide-Fold Doors Learn more>" [ref=e210] [cursor=pointer]:
                - /url: /product/sound-proof-sliding-folding-doors
                - generic [ref=e211]:
                  - paragraph [ref=e212]: Acoustic Doors
                  - heading "Acoustic Slide-Fold Doors" [level=3] [ref=e213]
                  - paragraph [ref=e214]: Bifold acoustic door systems providing versatile opening widths with high performance sealing.
                - img "Acoustic Slide-Fold Doors" [ref=e217]
                - generic [ref=e219]: Learn more>
            - article [ref=e220]:
              - button "Add to compare" [ref=e221]:
                - img [ref=e222]
              - link "Acoustic Doors Acoustic Swing Doors Professional swing doors engineered for maximum sound transmission loss and daily reliability. Acoustic Swing Doors Learn more>" [ref=e225] [cursor=pointer]:
                - /url: /product/sound-proof-swing-doors
                - generic [ref=e226]:
                  - paragraph [ref=e227]: Acoustic Doors
                  - heading "Acoustic Swing Doors" [level=3] [ref=e228]
                  - paragraph [ref=e229]: Professional swing doors engineered for maximum sound transmission loss and daily reliability.
                - img "Acoustic Swing Doors" [ref=e232]
                - generic [ref=e234]: Learn more>
            - article [ref=e235]:
              - button "Add to compare" [ref=e236]:
                - img [ref=e237]
              - link "Automation Systems Automated Movement Systems Bespoke motorized solutions for architectural elements requiring high-torque controlled movement. Automated Movement Systems Learn more>" [ref=e240] [cursor=pointer]:
                - /url: /product/motorized-sliding-system
                - generic [ref=e241]:
                  - paragraph [ref=e242]: Automation Systems
                  - heading "Automated Movement Systems" [level=3] [ref=e243]
                  - paragraph [ref=e244]: Bespoke motorized solutions for architectural elements requiring high-torque controlled movement.
                - img "Automated Movement Systems" [ref=e247]
                - generic [ref=e249]: Learn more>
            - article [ref=e250]:
              - button "Add to compare" [ref=e251]:
                - img [ref=e252]
              - link "Automation Systems Automated Acoustic Window Soundproof window systems equipped with integrated automation for effortless remote operation. Automated Acoustic Window Learn more>" [ref=e255] [cursor=pointer]:
                - /url: /product/motorized-sound-proof-window
                - generic [ref=e256]:
                  - paragraph [ref=e257]: Automation Systems
                  - heading "Automated Acoustic Window" [level=3] [ref=e258]
                  - paragraph [ref=e259]: Soundproof window systems equipped with integrated automation for effortless remote operation.
                - img "Automated Acoustic Window" [ref=e262]
                - generic [ref=e264]: Learn more>
            - article [ref=e265]:
              - button "Add to compare" [ref=e266]:
                - img [ref=e267]
              - link "Automation Systems Frameless Vertical Automation Minimalist frameless vertical sliding systems for modern architectural balconies and terraces. Frameless Vertical Automation Learn more>" [ref=e270] [cursor=pointer]:
                - /url: /product/motorized-frameless-vertical-sliding-system
                - generic [ref=e271]:
                  - paragraph [ref=e272]: Automation Systems
                  - heading "Frameless Vertical Automation" [level=3] [ref=e273]
                  - paragraph [ref=e274]: Minimalist frameless vertical sliding systems for modern architectural balconies and terraces.
                - img "Frameless Vertical Automation" [ref=e277]
                - generic [ref=e279]: Learn more>
            - article [ref=e280]:
              - button "Add to compare" [ref=e281]:
                - img [ref=e282]
              - link "Retractable Roofs Motorized Sliding Roof Transform indoor spaces with our premium Motorized Sliding Roofs. Engineered with high-torque electromechanical drives and thermally broken aluminum frames, these retractable glass roofs provide seamless climate control, natural ventilation via the stack effect, and spectacular sky views. Built to withstand extreme weather while maintaining perfect acoustic and thermal insulation when closed. Motorized Sliding Roof Learn more>" [ref=e285] [cursor=pointer]:
                - /url: /product/motorized-sliding-roof
                - generic [ref=e286]:
                  - paragraph [ref=e287]: Retractable Roofs
                  - heading "Motorized Sliding Roof" [level=3] [ref=e288]
                  - paragraph [ref=e289]: Transform indoor spaces with our premium Motorized Sliding Roofs. Engineered with high-torque electromechanical drives and thermally broken aluminum frames, these retractable glass roofs provide seamless climate control, natural ventilation via the stack effect, and spectacular sky views. Built to withstand extreme weather while maintaining perfect acoustic and thermal insulation when closed.
                - img "Motorized Sliding Roof" [ref=e292]
                - generic [ref=e294]: Learn more>
            - article [ref=e295]:
              - button "Add to compare" [ref=e296]:
                - img [ref=e297]
              - link "Retractable Roofs SS Frame Retractable Roof Premium sliding roof systems utilizing high-grade stainless steel frames for extreme durability. SS Frame Retractable Roof Learn more>" [ref=e300] [cursor=pointer]:
                - /url: /product/stainless-steel-frame-roof-sliding-system
                - generic [ref=e301]:
                  - paragraph [ref=e302]: Retractable Roofs
                  - heading "SS Frame Retractable Roof" [level=3] [ref=e303]
                  - paragraph [ref=e304]: Premium sliding roof systems utilizing high-grade stainless steel frames for extreme durability.
                - img "SS Frame Retractable Roof" [ref=e307]
                - generic [ref=e309]: Learn more>
            - article [ref=e310]:
              - button "Add to compare" [ref=e311]:
                - img [ref=e312]
              - link "Retractable Roofs Aluminum Frame Sliding Roof Lightweight and efficient sliding roof solutions using architectural grade aluminum extrusions. Aluminum Frame Sliding Roof Learn more>" [ref=e315] [cursor=pointer]:
                - /url: /product/aluminium-frame-roof-sliding-system
                - generic [ref=e316]:
                  - paragraph [ref=e317]: Retractable Roofs
                  - heading "Aluminum Frame Sliding Roof" [level=3] [ref=e318]
                  - paragraph [ref=e319]: Lightweight and efficient sliding roof solutions using architectural grade aluminum extrusions.
                - img "Aluminum Frame Sliding Roof" [ref=e322]
                - generic [ref=e324]: Learn more>
            - article [ref=e325]:
              - button "Add to compare" [ref=e326]:
                - img [ref=e327]
              - link "Acoustic Partitions Movable Acoustic Partition Large-scale flexible wall systems designed for professional environments requiring quick layout changes. Movable Acoustic Partition Learn more>" [ref=e330] [cursor=pointer]:
                - /url: /product/sound-proof-acoustic-movable-partition
                - generic [ref=e331]:
                  - paragraph [ref=e332]: Acoustic Partitions
                  - heading "Movable Acoustic Partition" [level=3] [ref=e333]
                  - paragraph [ref=e334]: Large-scale flexible wall systems designed for professional environments requiring quick layout changes.
                - img "Movable Acoustic Partition" [ref=e337]
                - generic [ref=e339]: Learn more>
            - article [ref=e340]:
              - button "Add to compare" [ref=e341]:
                - img [ref=e342]
              - link "Automation Systems Motorized Acoustic Sliding Windows Automated soundproof glass systems for premium residential and hospitality projects. Motorized Acoustic Sliding Windows Learn more>" [ref=e345] [cursor=pointer]:
                - /url: /product/motorized-soundproof-sliding-windows
                - generic [ref=e346]:
                  - paragraph [ref=e347]: Automation Systems
                  - heading "Motorized Acoustic Sliding Windows" [level=3] [ref=e348]
                  - paragraph [ref=e349]: Automated soundproof glass systems for premium residential and hospitality projects.
                - img "Motorized Acoustic Sliding Windows" [ref=e352]
                - generic [ref=e354]: Learn more>
            - article [ref=e355]:
              - button "Add to compare" [ref=e356]:
                - img [ref=e357]
              - link "Automation Systems Motorized Vertical Sliding System Automated vertical sliding systems for space-efficient ventilation, glazing movement, and acoustic control. Motorized Vertical Sliding System Learn more>" [ref=e360] [cursor=pointer]:
                - /url: /product/motorized-vertical-sliding-window
                - generic [ref=e361]:
                  - paragraph [ref=e362]: Automation Systems
                  - heading "Motorized Vertical Sliding System" [level=3] [ref=e363]
                  - paragraph [ref=e364]: Automated vertical sliding systems for space-efficient ventilation, glazing movement, and acoustic control.
                - img "Motorized Vertical Sliding System" [ref=e367]
                - generic [ref=e369]: Learn more>
            - article [ref=e370]:
              - button "Add to compare" [ref=e371]:
                - img [ref=e372]
              - link "Automation Systems Motorized Telescopic Gates Space-saving multi-leaf automated gates for narrow entryways requiring wide opening clearance. Motorized Telescopic Gates Learn more>" [ref=e375] [cursor=pointer]:
                - /url: /product/motorized-telescopic-gates
                - generic [ref=e376]:
                  - paragraph [ref=e377]: Automation Systems
                  - heading "Motorized Telescopic Gates" [level=3] [ref=e378]
                  - paragraph [ref=e379]: Space-saving multi-leaf automated gates for narrow entryways requiring wide opening clearance.
                - img "Motorized Telescopic Gates" [ref=e382]
                - generic [ref=e384]: Learn more>
            - article [ref=e385]:
              - button "Add to compare" [ref=e386]:
                - img [ref=e387]
              - link "Automation Systems Automated Sliding Gates Heavy-duty automated sliding entry systems for high-security residential and industrial compounds. Automated Sliding Gates Learn more>" [ref=e390] [cursor=pointer]:
                - /url: /product/motorized-sliding-gates
                - generic [ref=e391]:
                  - paragraph [ref=e392]: Automation Systems
                  - heading "Automated Sliding Gates" [level=3] [ref=e393]
                  - paragraph [ref=e394]: Heavy-duty automated sliding entry systems for high-security residential and industrial compounds.
                - img "Automated Sliding Gates" [ref=e397]
                - generic [ref=e399]: Learn more>
            - article [ref=e400]:
              - button "Add to compare" [ref=e401]:
                - img [ref=e402]
              - link "Automation Systems Motorized Barrier System Rapid response automated boom barriers for vehicle access control and site security. Motorized Barrier System Learn more>" [ref=e405] [cursor=pointer]:
                - /url: /product/motorized-barrier-system
                - generic [ref=e406]:
                  - paragraph [ref=e407]: Automation Systems
                  - heading "Motorized Barrier System" [level=3] [ref=e408]
                  - paragraph [ref=e409]: Rapid response automated boom barriers for vehicle access control and site security.
                - img "Motorized Barrier System" [ref=e412]
                - generic [ref=e414]: Learn more>
  - contentinfo [ref=e415]:
    - generic [ref=e416]:
      - generic [ref=e417]:
        - generic [ref=e418]:
          - link "KSC Kiran Slido Craft Engineering Silence" [ref=e419] [cursor=pointer]:
            - /url: /
            - img "KSC" [ref=e420]
            - generic [ref=e421]:
              - generic [ref=e422]: Kiran Slido Craft
              - generic [ref=e423]: Engineering Silence
          - paragraph [ref=e424]:
            - text: Engineering Silence. Automating Movement.
            - text: Precision architectural solutions since 1985.
        - generic [ref=e425]:
          - generic [ref=e426]:
            - heading "Solutions" [level=3] [ref=e427]
            - list [ref=e428]:
              - listitem [ref=e429]:
                - link "Acoustic Windows" [ref=e430] [cursor=pointer]:
                  - /url: /category/sound-proof-windows
              - listitem [ref=e431]:
                - link "Acoustic Partitions" [ref=e432] [cursor=pointer]:
                  - /url: /category/sound-proof-partitions
              - listitem [ref=e433]:
                - link "Acoustic Doors" [ref=e434] [cursor=pointer]:
                  - /url: /category/sound-proof-doors
              - listitem [ref=e435]:
                - link "Automation Systems" [ref=e436] [cursor=pointer]:
                  - /url: /category/motorized-systems
              - listitem [ref=e437]:
                - link "Retractable Roofs" [ref=e438] [cursor=pointer]:
                  - /url: /category/roof-sliding-systems
          - generic [ref=e439]:
            - heading "Company" [level=3] [ref=e440]
            - list [ref=e441]:
              - listitem [ref=e442]:
                - link "Locations" [ref=e443] [cursor=pointer]:
                  - /url: /locations
              - listitem [ref=e444]:
                - link "Solutions" [ref=e445] [cursor=pointer]:
                  - /url: /solutions
              - listitem [ref=e446]:
                - link "Legacy" [ref=e447] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e448]:
                - link "Support" [ref=e449] [cursor=pointer]:
                  - /url: /services
              - listitem [ref=e450]:
                - link "Case Studies" [ref=e451] [cursor=pointer]:
                  - /url: /clients
              - listitem [ref=e452]:
                - link "Visuals" [ref=e453] [cursor=pointer]:
                  - /url: /media
              - listitem [ref=e454]:
                - link "Contact" [ref=e455] [cursor=pointer]:
                  - /url: /contact
          - generic [ref=e456]:
            - heading "Inquiries" [level=3] [ref=e457]
            - link "info@doorwindowcraft.com" [ref=e458] [cursor=pointer]:
              - /url: mailto:info@doorwindowcraft.com
            - paragraph [ref=e459]:
              - text: ISO 9001:2015 Certified
              - text: Licensed Global Exporter
              - text: Engineering Headquarters, Mumbai.
      - generic [ref=e460]:
        - paragraph [ref=e461]: © 2026 Kiran Slido Craft. All Rights Reserved.
        - generic [ref=e462]:
          - link "Privacy Policy" [ref=e463] [cursor=pointer]:
            - /url: /privacy
          - link "Terms of Use" [ref=e464] [cursor=pointer]:
            - /url: /terms
          - link "Site Map" [ref=e465] [cursor=pointer]:
            - /url: /sitemap
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Kiran Slido Craft E2E', () => {
  4  |   test('homepage loads and has correct title', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveTitle(/Kiran Slido Craft/);
  7  |     await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Kiran Slido Craft');
  8  |   });
  9  | 
  10 |   test('navigation works', async ({ page }) => {
  11 |     await page.goto('/');
  12 |     await page.getByRole('link', { name: 'About' }).click();
  13 |     await expect(page).toHaveURL(/\/about/);
  14 |     await expect(page.getByRole('heading', { level: 1 })).toContainText(/Legacy/);
  15 |   });
  16 | 
  17 |   test('dedicated search page works', async ({ page }) => {
  18 |     await page.goto('/search');
  19 |     await expect(page.getByRole('heading', { level: 1 })).toContainText(/Search Systems/i);
  20 |     const searchInput = page.getByPlaceholder(/Search specifications/i);
  21 |     await searchInput.pressSequentially('ISRO', { delay: 100 });
> 22 |     await expect(page.getByText(/ISRO Gaganyaan Mission/i)).toBeVisible({ timeout: 10000 });
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  23 |   });
  24 | 
  25 |   test('contact form drafts email', async ({ page }) => {
  26 |     await page.goto('/contact');
  27 |     await page.getByRole('button', { name: /Send Technical Request/i }).click();
  28 |     await expect(page.locator('form [role="alert"]')).toContainText(/Missing or invalid fields/i);
  29 |   });
  30 | });
  31 | 
```