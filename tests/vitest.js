#!/usr/bin/env node
import { execaSync } from 'execa';

execaSync('node', ['./node_modules/vitest/bin/vitest.ts', 'run', ...process.argv.slice(2)], {
    stdio: 'inherit',
});
