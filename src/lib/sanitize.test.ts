import { describe, expect, it } from 'vitest';
import { sanitizeTrustedHtml } from './sanitize';

describe('sanitizeTrustedHtml', () => {
  it('keeps the legal and blog formatting whitelist', () => {
    expect(
      sanitizeTrustedHtml('<h2>Title</h2><p>Copy <strong>bold</strong> <em>em</em></p><ul><li>One</li></ul>'),
    ).toBe('<h2>Title</h2><p>Copy <strong>bold</strong> <em>em</em></p><ul><li>One</li></ul>');
  });

  it('keeps safe links and strips unsafe link attributes', () => {
    expect(sanitizeTrustedHtml('<a href="mailto:info@soundproofindia.com" onclick="bad()">Email</a>')).toBe(
      '<a href="mailto:info@soundproofindia.com">Email</a>',
    );

    expect(sanitizeTrustedHtml('<a href="javascript:alert(1)">Bad</a>')).toBe('<a>Bad</a>');
  });

  it('removes disallowed tags while escaping untrusted text', () => {
    expect(sanitizeTrustedHtml('<xmp><img src=x onerror=alert(1)></xmp><script>alert(1)</script>')).toBe(
      'alert(1)',
    );
  });

  it('only allows the expected address class', () => {
    expect(sanitizeTrustedHtml('<address class="not-italic other">A</address><address class="not-italic">B</address>')).toBe(
      '<address>A</address><address class="not-italic">B</address>',
    );
  });
});
