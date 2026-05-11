# Security Leak Scan Report

Generated from local checkout of `https://github.com/kscraft/kscraft` on 2026-05-11.

## Executive Summary

Current `HEAD` does not track `.env`, private key files, service-account JSON, or obvious API tokens in source/config files. The main confirmed leak was historical: reachable git history contained an old WordPress deployment with `.env`, `wp-config.php`, and a database dump. History was rewritten on 2026-05-11 to remove those artifacts before force-pushing the cleaned repository branches.

GitHub secret scanning and push protection were enabled for this repository on 2026-05-11.

Important residual: GitHub still exposes hidden merged pull-request refs (`refs/pull/1/head` through `refs/pull/4/head`) that clients cannot update or delete. Branch refs are clean, and `main`, `master`, `feat/amazon-product-gallery`, and `codex/agent-discovery-readiness` now point at cleaned branch tips. `git push --mirror`, the GitHub REST API, GitHub GraphQL, and the installed GitHub connector all rejected or could not address changes to those hidden refs. GitHub Support must purge those hidden refs/cached objects, or the repository should be made private until Support completes the purge.

## Critical

### SEC-001: Historical WordPress secrets and database dump were reachable in git history

- Severity: Critical
- Status: Remediated in repository history; credential rotation still required outside git
- Location: historical git objects removed by `git filter-repo`
- Evidence:
  - Before cleanup, reachable history included:
    - `.env`
    - `wp-config.php`
    - `wp-data/u650643970_kiranslidocraf.sql`
    - `docker-compose.yml`
    - old WordPress directories including `wp-admin/`, `wp-content/`, `wp-includes/`, and backup `wp_content/`
  - Redacted inspection confirmed `wp-config.php` contains `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and WordPress auth keys/salts.
  - Redacted inspection confirmed the SQL file is a phpMyAdmin dump for the WordPress database.
- Remediation performed:
  - Rewrote git history with `git filter-repo` to remove `.env`, `.env.local`, `.env.example`, `docker-compose.yml`, `wp-config.php`, `wp-data/`, `wp_data/`, `wp-admin/`, `wp-content/`, `wp_content/`, `wp-includes/`, root `wp-*.php`, `legacy-wp-backup*`, and historical `node_modules/`.
  - Force-pushed cleaned branch refs for `master`, `main`, `codex/agent-discovery-readiness`, and `feat/amazon-product-gallery`.
  - Verified the normal branch refs now point to cleaned commits.
  - Verification command found no matching leaked paths across rewritten public branch refs.
- Residual:
  - GitHub rejected client updates to hidden `refs/pull/1/head`, `refs/pull/2/head`, `refs/pull/3/head`, and `refs/pull/4/head`.
  - GitHub GraphQL could not resolve those hidden refs to ref IDs.
  - The installed GitHub connector could read pull-request metadata but returned `403 Resource not accessible by integration` when asked to update normal refs, and it exposes no delete-ref operation for hidden pull refs.
  - These hidden refs require GitHub Support intervention to purge, or repository visibility should be changed to private until Support completes the purge.
- Impact: Public clone access can recover historical database credentials, WordPress keys/salts, and database contents. If any of those credentials, users, hashes, salts, hostnames, or data are still valid or reused, the affected systems are compromised.
- Remaining fix outside repository:
  - Rotate every credential ever present in the historical WordPress `.env`, `wp-config.php`, `docker-compose.yml`, and SQL dump.
  - Treat WordPress user password hashes and salts as exposed; force resets for affected users if the data maps to real accounts.
- Mitigation: Anyone who cloned the repository before the force-push may still have old objects locally. Hidden GitHub pull-request refs may still expose old objects until GitHub purges them.
- False positive notes: This is not a false positive. I did not print secret values, but the historical files are recoverable from git.

## High

### SEC-002: GitHub secret scanning is disabled

- Severity: High
- Status: Remediated
- Location: GitHub repository setting for `kscraft/kscraft`
- Evidence: Initial `gh api repos/kscraft/kscraft/secret-scanning/alerts` returned `Secret scanning is disabled on this repository`.
- Remediation performed: Enabled `secret_scanning` and `secret_scanning_push_protection` through the GitHub repository API.
- Impact: Future committed secrets may not be detected or alerted by GitHub. Existing historical leaks may remain invisible in the GitHub UI.
- Fix:
  - Enable GitHub secret scanning and push protection for the repository or organization.
  - If unavailable on the current plan, add CI-based scanning using `gitleaks`, `trufflehog`, or `detect-secrets`.
- Mitigation: Add a pre-commit hook and CI job that scans staged diffs plus full history for secrets.
- False positive notes: GitHub can return 404 for missing permissions, but the API message explicitly said secret scanning is disabled.

### SEC-003: Vulnerable Next.js proxy bypass advisory reported by npm audit

- Severity: High
- Status: Remediated
- Location: `package.json` / `package-lock.json`
- Evidence: `npm audit --audit-level=moderate --json` reports `next >=16.0.0 <16.2.6` affected by `GHSA-26hh-7cqf-hhc6`, "Middleware / Proxy bypass in App Router applications via segment-prefetch routes - Incomplete Fix Follow-Up".
- Remediation performed:
  - Updated `next`, `@next/third-parties`, and `eslint-config-next` to `16.2.6`.
  - Added an npm `overrides.postcss` rule so Next's nested PostCSS resolves to patched `postcss@8.5.14`.
- Impact: App Router proxy/middleware protections can potentially be bypassed on affected versions. This app uses a Next proxy for markdown negotiation and discovery headers.
- Verification: `npm audit --audit-level=moderate --json` reports `0` vulnerabilities after the override.
- Mitigation: Avoid relying on Proxy/Middleware as the sole auth boundary for sensitive routes until patched.
- False positive notes: `npm audit` reported no direct fix available from the installed advisory data at scan time.

## Medium

### SEC-004: Raw HTML rendering paths should remain trusted-only or be sanitized

- Severity: Medium
- Status: Remediated
- Locations:
  - `src/app/blog/[slug]/page.tsx:52-75` and `src/app/blog/[slug]/page.tsx:135`
  - `src/app/privacy/page.tsx:43-50`
  - `src/app/terms/page.tsx:43-47`
- Evidence: These pages use `dangerouslySetInnerHTML`. Current inputs come from local JSON data, which lowers immediate risk, but the blog renderer interpolates markdown captures into HTML without escaping.
- Remediation performed: Added a central sanitizer and sanitized generated blog/legal HTML before rendering.
- Impact: If blog/legal content is ever sourced from a CMS, form input, external file, or other user-editable path, this becomes stored XSS.
- Fix: Replace the ad hoc markdown renderer with a vetted Markdown pipeline that escapes HTML by default, or sanitize generated HTML with an allowlist sanitizer before rendering.
- Mitigation: Keep `src/data/blogs.json` and `src/data/catalog.json` as trusted code-reviewed inputs only.
- False positive notes: I did not find attacker-controlled input reaching these sinks today.

## Low / Informational

### SEC-005: Current ignored env files contain many live-looking secrets

- Severity: Low for repository leak, High operationally if copied to public locations
- Location: ignored local files `.env` and `.env.local`
- Evidence: Redacted key listing showed `AUTH_SECRET`, OAuth secrets, `DATABASE_URL`, GitHub App private key fields, Resend API key, GA4 API secret, GA4 service account JSON, and a Vercel OIDC token. `git status --ignored` confirms these files are ignored.
- Impact: These are not committed in current `HEAD`, but they are high-value local files. Accidental upload, debug logging, or deployment misconfiguration would be serious.
- Fix: Keep them ignored; store values in Vercel/GitHub secret stores; do not copy them into docs, issues, logs, or screenshots. Rotate any value that may have been exposed through historical commits or local sharing.
- Mitigation: Add CI/pre-commit secret scanning and avoid `process.env` dumps.
- False positive notes: I did not print or validate the secret values.

## Commands Run

- `git fetch origin`
- `git status -sb`
- `git ls-files`
- `git log --all --name-status`
- `git grep` / `rg` pattern scans for secret markers
- Redacted inspection of historical `.env`, `wp-config.php`, and SQL dump headers
- `gh api repos/kscraft/kscraft/secret-scanning/alerts`
- `npm audit --audit-level=moderate --json`
- `git-filter-repo` history rewrite passes
- `git push --mirror origin`
- `git ls-remote origin 'refs/pull/*/head'`
- `gh api graphql` hidden-ref lookup attempts
- Installed GitHub connector PR metadata and ref-update attempts
