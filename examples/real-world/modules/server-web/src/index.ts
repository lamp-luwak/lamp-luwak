import Routes  from "next-routes";
import { createServer } from "http";
import config from "@impress/real-world-web-routes-config";
import { createApp } from "@impress/real-world-client-web";

export function run() {
  const app = createApp();

  app.prepare().then(() => {
    createServer(getRouterRequestHandler(app)).listen(3000);
  });

  function getRouterRequestHandler(app: any) {
    const routes = new Routes();
    for (const key of Object.keys(config)) {
      routes.add(key, ...[].concat(config[key]));
    }

    return routes.getRequestHandler(app);
  }
}
