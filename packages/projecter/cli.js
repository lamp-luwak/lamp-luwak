#!/usr/bin/env node

const { cmd, exec, x, run, start, parallel } = require('./lib');

cmd('clean [dist]', ({ dist }) => exec(x('rimraf'), dist));
cmd('ts-build', x('tsc'));
cmd('ts-start [dist] [executable]', async ({ dist, executable }) => {
  await run('clean', { dist });
  await run('ts-build');
  await exec('node', executable);
});
cmd('ts-watch [dist] [executable]', async ({ dist, executable }) => {
  await run('clean', { dist });
  await run('ts-build');
  await parallel([
    { exec: [x('tsc'), '-w'], name: 'ts', prefixColor: 'magenta' },
    { exec: [x('nodemon'), '--delay 100ms --watch', dist, executable], name: 'node', prefixColor: 'blue' }
  ]);
});
cmd('tslint', x('tslint'), '-c tslint.json -p tsconfig.json');
cmd('test', ({ watch }) => exec(x('jest'), '--forceExit --coverage --verbose', watch ? '--watchAll' : ''));
cmd('test-watch', () => run('test', { watch: true }));

start();
















