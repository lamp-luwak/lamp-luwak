const
  Globby = require('globby'),
  Path = require('path')
;

module.exports = async (rootPath, config) => {
  const
    context = {}
  ;

  function scanDir(dir) {
    return Globby.sync([`./${dir}/**/*.js`, `!./${dir}/**/_*.js`], { cwd: rootPath, absolute: true });
  }

  function makeContext() {
    for (let filename of scanDir('context')) {
      const
        ext = Path.extname(filename),
        name = Path.basename(filename, ext),
        Service = require(filename)
      ;

      Object.defineProperty(context, name, {
        get: () => {
          const
            serviceInstance = Service(context)
          ;

          Object.defineProperty(context, name, {
            value: serviceInstance
          });

          return serviceInstance
        },
        configurable: true
      });
    }
  }

  function makeApi() {
    const
      api = {};

    context.api = api;

    for (let filename of scanDir('api')) {
      const methods = require(filename)(context);
      if (methods) {
        Object.assign(api, methods);
      }
    }
  }

  function makeRoutes() {
    for (let filename of scanDir('routes')) {
      require(filename)(context);
    }
  }

  async function initServices() {
    for (let key in config) {
      if (config.hasOwnProperty(key)) {
        await context[key].init(config[key]);
      }
    }
  }

  makeContext();
  makeApi();
  makeRoutes();
  await initServices();

  return context;
};
