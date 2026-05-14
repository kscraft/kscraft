import { expect, test } from '@playwright/test';

function extractSitemapPaths(xml: string) {
  return [...xml.matchAll(/<loc>https:\/\/soundproofindia\.com([^<]*)<\/loc>/g)]
    .map((match) => match[1] || '/');
}

test('all sitemap URLs resolve locally', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);

  const paths = extractSitemapPaths(await sitemap.text());
  expect(paths.length).toBeGreaterThan(250);

  const failures: string[] = [];

  for (let index = 0; index < paths.length; index += 12) {
    const batch = paths.slice(index, index + 12);
    const results = await Promise.all(
      batch.map(async (path) => {
        const response = await request.get(path, { maxRedirects: 0 });
        return { path, status: response.status() };
      }),
    );

    results.forEach(({ path, status }) => {
      if (status < 200 || status >= 400) {
        failures.push(`${status} ${path}`);
      }
    });
  }

  expect(failures).toEqual([]);
});
