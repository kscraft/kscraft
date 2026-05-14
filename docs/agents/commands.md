# Commands

Use npm for dependency work because this repo tracks `package-lock.json` and
`vercel.json` uses `npm install`.

Setup and runtime:

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Build production app: `npm run build`
- Start production server after a build: `npm run start -- --hostname 127.0.0.1 --port 3000`

Checks:

- Lint: `npm run lint`
- Unit/component tests: `npm run test`
- Watch tests: `npm run test:watch`
- Coverage: `npm run test:coverage`
- Production build: `npm run build`
- E2E tests: `npm run test:e2e`

Important: Playwright is configured to run `npm run start`, so run
`npm run build` before `npm run test:e2e` unless a current `.next` production
build already exists.

Useful focused checks:

- Single Vitest file: `npx vitest run src/lib/catalog.test.ts`
- Single Vitest test name: `npx vitest run -t "test name"`
- Single Playwright file: `npx playwright test tests/e2e/basic.spec.ts`
- Sitemap route crawl: `npx playwright test tests/e2e/sitemap.spec.ts`

Before finishing code changes, run the smallest relevant test first, then run
`npm run lint`, `npm run test`, and `npm run build` when the change affects app
behavior, catalog data, routing, metadata, or shared components.

Expected production build baseline from the migration handoff: `npm run build`
should complete successfully and generate about 347 static App Router
pages/routes, including catalog, location, and solution pSEO pages.

Useful local smoke checks after `npm run build` and `npm run start -- --hostname
127.0.0.1 --port 3000`:

- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/category/sound-proof-doors`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/product/sound-proof-sliding-folding-doors`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/product/motorized-frameless-vertical-sliding-system`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/locations`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/locations/soundproof-windows-dubai`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/solutions`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/showcase/isro-gaganyaan`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/solutions/automatic-sliding-windows/mumbai`
- `curl -sSf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/solutions/automatic-acoustic-partitions/delhi-ncr`
- `curl -sSf http://127.0.0.1:3000/sitemap.xml | rg 'locations/soundproof-windows-mumbai|solutions/automatic-sliding-windows/mumbai|showcase/isro-gaganyaan'`
- `curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:3000/soundproof-windows-mumbai`
- `curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:3000/services.php`
- `curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:3000/sound-proof-sliding-doors.htm`

Lead email env check:

- `vercel env ls` should include `RESEND_API_KEY` and `ADMIN_EMAIL_FROM` for
  Production before deploying contact-form changes. Do not print env values.
