#!/usr/bin/env node
import { execaSync } from 'execa';

execaSync('node', ['./node_modules/vitest/bin/vitest.js', 'run', ...process.argv.slice(2)], {
    stdio: 'inherit',
});
