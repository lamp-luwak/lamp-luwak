import { inject } from 'lib/core';
import { Db } from 'services/Db';
import { Server } from 'services/Server';
import { AccountRouter } from 'routers/AccountRouter';
import { FeedRouter } from 'routers/FeedRouter';

export class App {
  @inject(Db) db;
  @inject(Server) server;
  @inject(AccountRouter) accountRouter;
  @inject(FeedRouter) reedRouter;

  configure({ db, server }) {
    this.db.configure(db);
    this.server.configure(server);
  }

  init() {
    this.db.init();
    this.accountRouter.init();
    this.reedRouter.init();
  }

  run() {
    this.server.run();
  }
}
