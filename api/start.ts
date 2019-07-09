import "module-alias/register";

import { App } from "~/app/App";
import { provide } from "~/lib/core";
import { Logger } from "~/services/Logger";

class AppRunner {
  @provide public app: App;
  @provide public logger: Logger;

  public async start() {
    try {
      await this.app.start({
        db: {
          url: "mongodb://localhost:27017",
          dbname: "sonata",
        },
        server: {
          hostname: "127.0.0.1",
          port: 2020,
        },
      });
    } catch (error) {
      this.logger.log(error);
    }
  }
}

// tslint:disable-next-line: no-floating-promises
new AppRunner().start();
