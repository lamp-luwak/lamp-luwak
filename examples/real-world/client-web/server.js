const next = require("next");
const Routes = require("next-routes");
const config = require("./src/configs/routes.json");
const { createServer, } = require("http");

// module.exports = () => {
//   process.chdir(__dirname);

//   const app = next({
//     dev: process.env.NODE_ENV !== "production",
//   });

//   app.prepare().then(() => {
//     createServer(getRouterRequestHandler(app)).listen(3000);
//   });

//   function getRouterRequestHandler(app) {
//     const routes = new Routes();
//     for (const key of Object.keys(config)) {
//       routes.add(key, ...[].concat(config[key]));
//     }

//     return routes.getRequestHandler(app);
//   }

// };

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

app.prepare().then(() => {
  createServer(getRouterRequestHandler(app)).listen(3000);
});

function getRouterRequestHandler(app) {
  const routes = new Routes();
  for (const key of Object.keys(config)) {
    routes.add(key, ...[].concat(config[key]));
  }

  return routes.getRequestHandler(app);
}
