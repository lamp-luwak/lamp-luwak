import Express from 'express';
import Cors from 'cors';
import BodyParser from 'body-parser';
import { inject } from 'lib/core';
import { Logger } from './Logger';

export class Server {
  @inject(Logger) logger;

  constructor() {
    this.express = Express();
    this.express.use(Cors());
    this.express.use(BodyParser.json());
  }

  configure({ port, hostname }) {
    this.port = port;
    this.hostname = hostname;
  }

  run() {
    this.express.listen(this.port, this.hostname);
    this.logger.log(`Server listening on ${this.hostname}:${this.port}`);
  }

  route(method, pattern, handler) {
    this.logger.log(method, pattern);

    this.express[method.toLowerCase()](pattern, (req, res) => {
      this.logger.log(req.method, req.url);

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
          this.logger.log(err);
          res.status(500).send((err || {}).stack || String(err));
        });
    });
  }

}
