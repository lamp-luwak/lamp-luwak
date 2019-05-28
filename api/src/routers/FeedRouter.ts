import { provide } from '@lib/core';
import { Route } from '@services/Route';

export class FeedRouter {
  @provide(Route) route: Route;

  init() {
    this.route.make('POST', '/feed/create', this.create.bind(this));
    this.route.make('GET', '/feed/list', this.list.bind(this));
  }

  async create({ req, headers, body }: { req: any, headers: any, body: any }) {
    console.log(
      req, headers, body
    );
  }

  async list() {
    return { items: [1, 2, 3] };
  }

}
