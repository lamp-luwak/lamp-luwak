const WebServer = require("@sonata/web-server");
const next = require("next");
const Routes = require("next-routes");
const config = require("./configs/routes.json");



const app = next({
  dev: process.env.NODE_ENV !== "production",
});

app.prepare().then(() => {

  WebServer.runWithApp(getRouterRequestHandler(app), 3000);

  // createServer(getRouterRequestHandler(app)).listen(3000);
});

function getRouterRequestHandler(app) {
  const routes = new Routes();
  for (const key of Object.keys(config)) {
    routes.add(key, ...[].concat(config[key]));
  }

  return routes.getRequestHandler(app);
}
