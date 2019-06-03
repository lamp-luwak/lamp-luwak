import Express from "express";
import Cors from "cors";
import BodyParser from "body-parser";
import { provide } from "@lib/core";
import { Logger } from "@services/Logger";

export interface Request extends Express.Request { }
export interface Response extends Express.Response { }
export type RequestHandler = (req: Request, res: Response) => Promise<any>;

export class Server {
  @provide public logger: Logger;

  public express: Express.Express;
  public port: number;
  public hostname: string;

  constructor() {
    this.express = Express();
    this.express.use(Cors());
    this.express.use(BodyParser.json());
  }

  public configure({ port, hostname }: { port: number, hostname: string }) {
    this.port = port;
    this.hostname = hostname;
  }

  public run() {
    this.express.listen(this.port, this.hostname);
    this.logger.log(`Server listening on ${this.hostname}:${this.port}`);
  }

  public route(method: string, pattern: string, handler: RequestHandler) {

    interface ExpressIndexSignature {
      [key: string]: Express.IRouterMatcher<this>;
    }

    (this.express as Express.Express & ExpressIndexSignature)[ method.toLowerCase() ](
      pattern,
      async (req: Express.Request, res: Express.Response) => {
        this.logger.log(req.method, req.url);

        try {
          const ret = await handler(req as Request, res as Response);
          if (typeof ret === "number") {
            res.status(ret).end();
          } else {
            res.json(ret);
          }

        } catch (err) {
          this.logger.log(err);
          res.status(500).send((err || {}).stack || String(err));
        }

      });
  }

}
