import { provide } from "~/lib/core";
import { App } from "~/app/App";
import { Logger } from "~/services/Logger";

export class AppRunner {
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
