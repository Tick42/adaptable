#!/usr/bin/env node

const { spawnSync } = require('child_process');

if (process.env.WILL_RELEASE_CMD) {
  console.log('starting publishing with ' + process.env.WILL_RELEASE_CMD);
  const { stdout } = spawnSync(process.env.WILL_RELEASE_CMD, {
    stdio: 'inherit',
    env: { ...process.env },
  });

  console.log(stdout);
} else {
  console.log('Nothing to publish');
}
