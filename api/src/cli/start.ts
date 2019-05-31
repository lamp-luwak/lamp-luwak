// tslint:disable-next-line: no-var-requires
require("module-alias/register");

import { App } from "@app/App";
import { provide } from "@lib/core";

class AppAware {
  @provide(App) public app: App;
}

// tslint:disable-next-line: no-floating-promises
new AppAware().app.start({
  db: {
    url: "mongodb://localhost:27017",
    dbname: "sonata",
  },
  server: {
    hostname: "127.0.0.1",
    port: 2020,
  },
});
