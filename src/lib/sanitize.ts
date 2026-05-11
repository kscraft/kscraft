import sanitizeHtml from 'sanitize-html';

export function sanitizeTrustedHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      'address',
      'a',
      'br',
      'em',
      'h2',
      'h3',
      'li',
      'p',
      'strong',
      'ul',
    ],
    allowedAttributes: {
      a: ['href'],
      address: ['class'],
    },
    allowedClasses: {
      address: ['not-italic'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  });
}
