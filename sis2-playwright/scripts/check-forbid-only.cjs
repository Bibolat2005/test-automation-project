const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { spawnSync } = require('node:child_process');

const project = path.resolve(__dirname, '..');
const probeName = `ci-only-guard-${randomUUID()}.spec.ts`;
const probePath = path.join(project, 'tests', probeName);

const cli = path.join(
  path.dirname(require.resolve('@playwright/test/package.json')),
  'cli.js'
);

try {
  fs.writeFileSync(
    probePath,
    "import { test } from '@playwright/test';\n" +
      "test.only('temporary CI guard probe', async () => {});\n",
    { flag: 'wx' }
  );

  const result = spawnSync(
    process.execPath,
    [cli, 'test', probeName, '--list'],
    {
      cwd: project,
      env: { ...process.env, CI: 'true' },
      encoding: 'utf8',
    }
  );

  if (result.error) {
    throw result.error;
  }

  const output =
    `${result.stdout || ''}\n${result.stderr || ''}`;

  if (
    result.status === 0 ||
    !/test\.only|forbidOnly/.test(output)
  ) {
    process.stderr.write(output);
    throw new Error(
      'The temporary test.only was not rejected by CI.'
    );
  }

  console.log(
    'PASS: CI rejected the temporary test.only. The probe was not executed.'
  );
} finally {
  fs.rmSync(probePath, { force: true });
}