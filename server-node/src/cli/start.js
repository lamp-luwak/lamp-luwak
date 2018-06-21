import * as Path from 'path';
import { App } from 'app/App';
import { inject } from 'lib/core';

import 'babel-register';

new class Cli {
  @inject(App) app;

  constructor() {
    this.app.configure({
      db: {
        filename: Path.resolve(__dirname, '../../data/data.db')
      },
      server: {
        hostname: '127.0.0.1',
        port: 2020
      }
    });
    this.app.init();
    this.app.run();
  }
}
