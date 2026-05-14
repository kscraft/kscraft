import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

/**
 * Universal SEO Submitter (Google, Bing, Yahoo, DuckDuckGo, AI Bots)
 * 
 * - Bing, Yahoo, DDG: Covered via IndexNow and Bing Webmaster API.
 * - Google: Covered via Google Indexing API.
 * - AI Bots (ChatGPT, Gemini, Claude): These bots do not have a "push" API. 
 *   They discover content by querying Bing Search (ChatGPT) or Google Search (Gemini),
 *   and by reading the robots.txt and /llms.txt (which is already implemented).
 */

const CANONICAL_SITE_URL = 'https://soundproofindia.com';
const INDEXNOW_KEY = '8c3b0f5ea78d49ea9405d4d3a2417772'; // Must match the txt file in /public

async function fetchSitemapUrls(): Promise<string[]> {
  return [
    CANONICAL_SITE_URL,
    `${CANONICAL_SITE_URL}/about`,
    `${CANONICAL_SITE_URL}/services`,
    `${CANONICAL_SITE_URL}/contact`,
    `${CANONICAL_SITE_URL}/category/sound-proof-windows`,
    `${CANONICAL_SITE_URL}/category/motorized-systems`,
    `${CANONICAL_SITE_URL}/showcase/isro-gaganyaan`,
    `${CANONICAL_SITE_URL}/locations/soundproof-windows-dubai`,
    `${CANONICAL_SITE_URL}/locations/soundproof-windows-mumbai`
  ];
}

async function submitToIndexNow(urls: string[]) {
  const host = new URL(CANONICAL_SITE_URL).hostname;
  console.log(`\n▶ Submitting ${urls.length} URLs to IndexNow (Bing, Yahoo, DuckDuckGo, Seznam, Yandex)...`);

  const payload = {
    host: host,
    key: INDEXNOW_KEY,
    keyLocation: `${CANONICAL_SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      console.log('✅ IndexNow submission successful!');
    } else {
      console.error(`❌ IndexNow submission failed: ${res.status}`);
    }
  } catch (err) {
    console.error('❌ Network error during IndexNow submission:', err);
  }
}

async function submitToGoogleIndexingApi(urls: string[]) {
  console.log(`\n▶ Submitting ${urls.length} URLs to Google Indexing API...`);
  
  const credsPath = path.join(process.cwd(), 'firebase-key.json');
  if (!fs.existsSync(path.resolve(credsPath))) {
    console.log(`⚠️ Google Service Account key not found at: ${credsPath}`);
    console.log('To push to Google (and Gemini), download your Google Service Account JSON key,');
    console.log('save it as firebase-key.json in the project root, and ensure the service account is added as an Owner in Google Search Console.');
    return;
  }

  // Set the environment variable so the Google SDK finds it automatically
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(credsPath);

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
      version: 'v3',
      auth: auth,
    });

    // Google Indexing API requires submitting URLs one by one
    for (const url of urls) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`✅ Google updated: ${url} (Status: ${res.status})`);
      } catch (err: any) {
        console.error(`❌ Google API error for ${url}:`, err.message || err);
      }
    }
  } catch (err) {
    console.error('❌ Failed to initialize Google Indexing API:', err);
  }
}

async function submitToBaidu(urls: string[]) {
  console.log(`\n▶ Submitting ${urls.length} URLs to Baidu...`);
  
  const token = process.env.BAIDU_SITE_TOKEN;
  if (!token) {
    console.log('⚠️ BAIDU_SITE_TOKEN is not set.');
    console.log('To push to Baidu, get your API token from Baidu Webmaster Tools and set it in your .env file.');
    return;
  }

  const baiduUrl = `http://data.zz.baidu.com/urls?site=${CANONICAL_SITE_URL}&token=${token}`;
  try {
    const res = await fetch(baiduUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: urls.join('\n')
    });

    const text = await res.text();
    if (res.ok) {
      console.log('✅ Baidu submission successful! Response:', text);
    } else {
      console.error(`❌ Baidu submission failed: ${res.status}`, text);
    }
  } catch (err) {
    console.error('❌ Network error during Baidu submission:', err);
  }
}

async function run() {
  console.log(`Starting Universal SEO Submission Engine for ${CANONICAL_SITE_URL}...`);
  console.log('Note: AI Bots (ChatGPT, Claude) discover content via live search (Bing/Google) and /llms.txt.\n');
  
  const urls = await fetchSitemapUrls();
  
  await submitToIndexNow(urls);
  await submitToGoogleIndexingApi(urls);
  await submitToBaidu(urls);
  
  console.log('\n✅ SEO Submission sweep complete.');
}

run();