#!/usr/bin/env node --harmony

const
  App = require('../src'),
  Path = require('path')
;

App({
  db: {
    database: 'sonata',
    user: 'betula'
  },
  server: {
    hostname: '127.0.0.1',
    port: 2020
  }
});
