import "module-alias/register";

import { App } from "~/app/App";
import { provide } from "~/lib/core";

class AppRunner {
  @provide public app: App;

  public async start() {
    return this.app.start({
      db: {
        url: "mongodb://localhost:27017",
        dbname: "sonata",
      },
      server: {
        hostname: "127.0.0.1",
        port: 2020,
      },
    });
  }
}

// tslint:disable-next-line: no-floating-promises
new AppRunner().start();
