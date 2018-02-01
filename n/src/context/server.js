const
  Express = require('express'),
  Cors = require('cors'),
  BodyParser = require('body-parser')
;

module.exports = ({ logger }) => {
  const express = Express();
  express.use(Cors());
  express.use(BodyParser.json());

  return {

    init({ port, hostname }) {
      express.listen(port, hostname);
      logger.log(`Server listening on ${hostname}:${port}`);
    },

    route(method, pattern, handler) {
      logger.log(method, pattern);

      express[ method.toLowerCase() ](pattern, (req, res) => {
        logger.log(req.method, req.url);

        const context = req.params || {};
        Object.assign(context, {
          req,
          res,
          headers: req.headers,
          body: req.body
        });

        handler(context)
          .then((ret) => {
            if (typeof ret === 'number') {
              res.status(ret).end();
            } else {
              res.json(ret);
            }
          })
          .catch((err) => {
            logger.log(err);
            res.status(500).send((err || {}).stack || String(err));
          });
      });
    }

  }

};
