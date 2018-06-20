#!/usr/bin/env node --harmony

const
  Path = require('path'),
  App = require('../src')
;

App({
  db: {
    filename: Path.resolve(__dirname, '../data/data.db')
  },
  server: {
    hostname: '127.0.0.1',
    port: 2020
  }
});
