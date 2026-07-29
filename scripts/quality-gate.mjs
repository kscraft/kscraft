import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const mode = process.argv[2];
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const sharedEnvironment = {
  ...process.env,
  npm_config_cache: process.env.npm_config_cache || join(tmpdir(), 'ksco-npm-cache'),
  npm_config_update_notifier: 'false',
};

const commitChecks = [
  { label: 'Lint', args: ['run', 'lint'] },
  { label: 'Unit tests', args: ['run', 'test'] },
];

const pushChecks = [
  ...commitChecks,
  { label: 'Dependency audit', args: ['audit', '--audit-level=high'] },
  { label: 'Production build', args: ['run', 'build'] },
  {
    label: 'End-to-end tests',
    args: ['run', 'test:e2e'],
    environment: { QUALITY_GATE: '1' },
  },
];

const checks = mode === 'commit' ? commitChecks : mode === 'push' ? pushChecks : undefined;

if (!checks) {
  console.error('Usage: node scripts/quality-gate.mjs <commit|push>');
  process.exit(2);
}

for (const check of checks) {
  console.log(`\n[quality:${mode}] ${check.label}`);
  const result = spawnSync(npmCommand, check.args, {
    stdio: 'inherit',
    env: {
      ...sharedEnvironment,
      ...check.environment,
    },
  });

  if (result.error) {
    console.error(`[quality:${mode}] Unable to run ${check.label}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`[quality:${mode}] Failed: ${check.label}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`\n[quality:${mode}] Passed`);
