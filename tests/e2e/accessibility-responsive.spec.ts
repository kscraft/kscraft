import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('ksc_cookie_consent', 'rejected');
  });
});

test('representative mobile pages do not overflow the viewport', async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of ['/', '/blog', '/product/sound-proof-sliding-windows', '/search']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const { overflow, offenders, wideScrollers } = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        offenders: [...document.querySelectorAll<HTMLElement>('body *')]
          .map((element) => ({ element, rect: element.getBoundingClientRect() }))
          .filter(({ rect }) => rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)
          .slice(0, 30)
          .map(({ element, rect }) => ({
            tag: element.tagName.toLowerCase(),
            className: element.className.toString().slice(0, 100),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          })),
        wideScrollers: [document.documentElement, document.body, ...document.querySelectorAll<HTMLElement>('body *')]
          .filter((element) => element.scrollWidth - element.clientWidth > 1)
          .map((element) => ({
            tag: element.tagName.toLowerCase(),
            className: element.className.toString().slice(0, 100),
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
          }))
          .sort((a, b) => (b.scrollWidth - b.clientWidth) - (a.scrollWidth - a.clientWidth))
          .slice(0, 12),
      }));
      expect(overflow, `${route} at ${viewport.width}x${viewport.height}: ${JSON.stringify({ offenders, wideScrollers })}`).toBeLessThanOrEqual(1);
    }
  }
});

test('global navigation supports keyboard focus and 48px targets', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const catalogButton = page.getByRole('button', { name: /Catalog/i });
  await catalogButton.focus();
  await expect(page.getByRole('link', { name: 'Acoustic Windows' }).first()).toBeVisible();

  for (const control of [
    page.getByRole('button', { name: /Catalog/i }),
    page.getByRole('link', { name: 'Search', exact: true }),
    page.getByRole('button', { name: /Get a Quote/i }),
  ]) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(48);
  }
});

test('product gallery works with named keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/product/sound-proof-sliding-windows', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: /Open image 1 of/i }).click();
  await expect(page.getByRole('dialog', { name: /image gallery/i })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: /image gallery/i })).toHaveCount(0);
});

test('representative pages have no serious WCAG accessibility violations', async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of [
      '/',
      '/product/sound-proof-sliding-windows',
      '/contact',
      '/privacy',
      '/search',
      '/media',
    ]) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(900);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const seriousViolations = results.violations.filter(({ impact }) => (
        impact === 'serious' || impact === 'critical'
      ));

      expect(
        seriousViolations,
        `${route} at ${viewport.width}x${viewport.height}: ${JSON.stringify(seriousViolations, null, 2)}`,
      ).toEqual([]);
    }
  }
});
