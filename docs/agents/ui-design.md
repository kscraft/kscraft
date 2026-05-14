# UI Design

Maintain the current premium, Apple-inspired, product-first visual language:
high-contrast typography, restrained color, generous whitespace, precise product
imagery, and minimal decoration.

Rules:

- Prefer existing global utility classes from `src/app/globals.css`:
  `heading-hero`, `heading-page`, `heading-section`, `text-eyebrow`,
  `text-body-lg`, `hero-dark`, `hero-light`, `section-standard`,
  `section-tint`, `section-dark`, `max-container`, `apple-button`, and
  `apple-button-secondary`.
- Use `lucide-react` icons for recognizable actions and controls.
- Keep mobile and tablet layouts first-class. Long product names must wrap
  cleanly and must not overflow buttons, cards, navigation, or hero sections.
- Prefer local images from `public/images` and `public/logo-ksc.*`.
- Do not add generic stock imagery, AI-generated product visuals, fake brand
  marks, excessive shadows, noisy borders, or unrelated color palettes.
- Keep the official logo visible and scaled correctly in header and footer.
- Keep footer content complete: logo, company copy, certifications, categories,
  contact details, and product count.
- Keep `/clients` grounded in source project references, partial clientele, real
  client logo assets where verified, and certification registrations.
- Keep `/media` grounded in media gallery items, `.co.in` product videos, and
  testimonials.
- Keep `/services` aligned with annual maintenance and service support content
  from the source `.com` services page.
- When changing UI surfaces, check at least one mobile-width and one desktop
  layout manually or with Playwright when feasible.
