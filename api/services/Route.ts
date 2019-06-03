import { provide } from "@lib/core";
import { Server, RequestHandler } from "@services/Server";

export class Route {
  @provide public server: Server;

  public make(method: string, pattern: string, handler: RequestHandler) {
    return this.server.route(method, pattern, handler);
  }
}
