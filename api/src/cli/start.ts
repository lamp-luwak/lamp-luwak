require('module-alias/register');

import { App } from '@app/App';
import { provide } from '@lib/core';

class AppAware {
  @provide(App) app: App;
}

new AppAware().app.start({
  db: {
    url: 'mongodb://localhost:27017',
    dbname: 'sonata'
  },
  server: {
    hostname: '127.0.0.1',
    port: 2020
  }
});
