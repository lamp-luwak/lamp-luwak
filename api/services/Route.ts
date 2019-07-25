import { provide } from "~/lib/core";
import { Server, RequestHandler } from "~/services/Server";
import { Logger } from "~/services/Logger";

export class Route {
  @provide public server: Server;
  @provide public logger: Logger;

  public make(method: string, pattern: string, handler: RequestHandler) {
    this.logger.log("+", method, pattern);
    return this.server.route(method, pattern, handler);
  }
}
