# Installed Skills

Use the platform-provided skill list first; this file records repo-relevant
installation state only.

## Marketing Skills

The marketing skill pack from `coreyhaines31/marketingskills` is installed in
`~/.codex/skills`. Relevant skills for this repo include:

- `product-marketing-context`
- `seo-audit`
- `site-architecture`
- `schema-markup`
- `ai-seo`
- `page-cro`
- `analytics-tracking`
- `programmatic-seo`
- `copywriting`
- `copy-editing`

Use the composed workflow in `docs/agents/seo-growth-agent.md` for full SEO/GTM
analysis.

## Anthropic Skills

The Anthropic skills repo at `https://github.com/anthropics/skills` has been
installed into `~/.codex/skills` for non-conflicting skill names:

- `algorithmic-art`
- `brand-guidelines`
- `canvas-design`
- `claude-api`
- `doc-coauthoring`
- `docx`
- `frontend-design`
- `internal-comms`
- `mcp-builder`
- `pptx`
- `slack-gif-creator`
- `theme-factory`
- `web-artifacts-builder`
- `webapp-testing`
- `xlsx`

Skipped or already present:

- `pdf`: already installed locally.
- `skill-creator`: overlaps with existing system skill behavior.

Restart Codex after new skill installations so the runtime skill list refreshes.
