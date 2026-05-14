# Testing, Security, And Workflow

## Testing

- Add or update tests for changed behavior, especially catalog helpers, search,
  shared components, page rendering, route handlers, and form behavior.
- Unit/component tests use Vitest with jsdom and shared mocks from
  `vitest.setup.tsx`.
- E2E tests use Playwright against `http://127.0.0.1:3000`.
- Keep tests resilient to content changes by asserting stable headings,
  accessible roles, URLs, and key behavior rather than brittle implementation
  details.
- If a change alters visible copy in tested pages, update the matching page or
  component tests in the same patch.

## Security

- Do not read, print, commit, or document values from `.env`, `.env.local`, or
  any other ignored secret files.
- Keep `.env*`, `.vercel`, private keys, generated build output, coverage, and
  reports out of git.
- This repo previously had historical WordPress secrets removed from branch
  history; treat all old WordPress/database credentials as compromised and do
  not reintroduce legacy WordPress artifacts.
- Raw HTML render paths must stay sanitized. Use `sanitizeTrustedHtml` for
  local markdown/HTML before `dangerouslySetInnerHTML`.
- Do not add unsanitized CMS, form, query-string, or external data to
  `dangerouslySetInnerHTML`.
- Keep public route handlers free of secrets. The current catalog/discovery
  endpoints are intentionally public.
- Put server-only environment access in server code, not client components.

## Workflow

- Start by checking `git status --short` and avoid overwriting user changes.
- Read existing code and tests before editing.
- Keep edits scoped to the requested behavior.
- Update docs, discovery metadata, and tests when the source of truth changes.
- After edits, report exactly which checks were run and any checks that could
  not be run.
- Do not commit, force-push, deploy, rotate secrets, or change repository
  visibility unless the user explicitly asks.
