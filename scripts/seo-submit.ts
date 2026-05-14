import fs from 'fs';
import path from 'path';

const CANONICAL_SITE_URL = 'https://soundproofindia.com';
const SITEMAP_URL = process.env.SEO_SITEMAP_URL || `${CANONICAL_SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY_FILE = path.join(process.cwd(), 'public', '8c3b0f5ea78d49ea9405d4d3a2417772.txt');
const INDEXNOW_BATCH_SIZE = 10000;

function getIndexNowKey() {
  if (process.env.INDEXNOW_KEY) {
    return process.env.INDEXNOW_KEY;
  }

  if (fs.existsSync(INDEXNOW_KEY_FILE)) {
    return fs.readFileSync(INDEXNOW_KEY_FILE, 'utf8').trim();
  }

  return '';
}

function extractSitemapUrls(xml: string) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1]?.trim())
    .filter((url): url is string => Boolean(url))
    .filter((url) => {
      try {
        return new URL(url).hostname === new URL(CANONICAL_SITE_URL).hostname;
      } catch {
        return false;
      }
    });
}

async function fetchSitemapUrls(): Promise<string[]> {
  const response = await fetch(SITEMAP_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap ${SITEMAP_URL}: ${response.status}`);
  }

  const xml = await response.text();
  const urls = extractSitemapUrls(xml);

  if (urls.length === 0) {
    throw new Error(`No canonical URLs found in sitemap ${SITEMAP_URL}`);
  }

  return urls;
}

async function submitToIndexNow(urls: string[]) {
  const key = getIndexNowKey();

  if (!key) {
    console.log('INDEXNOW_KEY is not configured and no public key file was found.');
    return;
  }

  const host = new URL(CANONICAL_SITE_URL).hostname;
  const keyLocation = `${CANONICAL_SITE_URL}/${key}.txt`;

  for (let index = 0; index < urls.length; index += INDEXNOW_BATCH_SIZE) {
    const batch = urls.slice(index, index + INDEXNOW_BATCH_SIZE);
    console.log(`Submitting ${batch.length} URLs to IndexNow...`);

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: batch,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`IndexNow submission failed: ${response.status} ${text}`);
    }
  }
}

async function submitToBaidu(urls: string[]) {
  const token = process.env.BAIDU_SITE_TOKEN;

  if (!token) {
    console.log('BAIDU_SITE_TOKEN is not configured; skipping Baidu submission.');
    return;
  }

  const baiduUrl = `http://data.zz.baidu.com/urls?site=${CANONICAL_SITE_URL}&token=${token}`;
  const response = await fetch(baiduUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: urls.join('\n'),
  });
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Baidu submission failed: ${response.status} ${text}`);
  }

  console.log(`Baidu submission response: ${text}`);
}

async function run() {
  console.log(`Fetching sitemap URLs from ${SITEMAP_URL}`);
  const urls = await fetchSitemapUrls();
  console.log(`Found ${urls.length} canonical URLs.`);

  await submitToIndexNow(urls);
  await submitToBaidu(urls);

  console.log('SEO submission sweep complete.');
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
