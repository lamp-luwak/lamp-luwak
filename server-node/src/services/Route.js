import { inject } from 'lib/core';
import { Server } from 'services/Server';

export class Route {
  @inject(Server) server;

  make(...args) {
    return this.server.route(...args);
  }
}
