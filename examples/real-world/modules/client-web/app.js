const next = require("next");

module.exports.createApp = () => next({
  dev: process.env.NODE_ENV !== "production",
  dir: __dirname
});
