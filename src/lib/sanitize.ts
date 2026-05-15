const allowedTags = new Set(['address', 'a', 'br', 'em', 'h2', 'h3', 'li', 'p', 'strong', 'ul']);
const allowedSchemes = new Set(['http', 'https', 'mailto', 'tel']);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAttributeValue(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? '';
}

function isSafeHref(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return true;
  }

  const normalized = trimmed.replace(/[\u0000-\u001F\u007F\s]+/g, '').toLowerCase();
  const colonIndex = normalized.indexOf(':');

  if (colonIndex === -1) {
    return true;
  }

  return allowedSchemes.has(normalized.slice(0, colonIndex));
}

function sanitizeOpeningTag(tagName: string, attributes: string) {
  if (!allowedTags.has(tagName)) {
    return '';
  }

  if (tagName === 'br') {
    return '<br>';
  }

  if (tagName === 'a') {
    const href = getAttributeValue(attributes, 'href');
    return isSafeHref(href) ? `<a href="${escapeHtml(href.trim())}">` : '<a>';
  }

  if (tagName === 'address') {
    const className = getAttributeValue(attributes, 'class').trim();
    return className === 'not-italic' ? '<address class="not-italic">' : '<address>';
  }

  return `<${tagName}>`;
}

function sanitizeTag(token: string) {
  const closingMatch = token.match(/^<\s*\/\s*([a-z0-9-]+)[^>]*>$/i);

  if (closingMatch) {
    const tagName = closingMatch[1].toLowerCase();
    return allowedTags.has(tagName) && tagName !== 'br' ? `</${tagName}>` : '';
  }

  const openingMatch = token.match(/^<\s*([a-z0-9-]+)([\s\S]*?)\/?\s*>$/i);

  if (!openingMatch) {
    return escapeHtml(token);
  }

  return sanitizeOpeningTag(openingMatch[1].toLowerCase(), openingMatch[2] || '');
}

export function sanitizeTrustedHtml(html: string) {
  let sanitized = '';
  let lastIndex = 0;
  const tagPattern = /<\/?[^>]+>/g;

  for (const match of html.matchAll(tagPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    sanitized += escapeHtml(html.slice(lastIndex, index));
    sanitized += sanitizeTag(token);
    lastIndex = index + token.length;
  }

  sanitized += escapeHtml(html.slice(lastIndex));
  return sanitized;
}
