import { inject } from 'lib/core';
import { Route } from 'services/Route';

export class FeedRouter {
  @inject(Route) route;

  init() {
    this.route.make('GET', '/feed/list', this.list.bind(this));
  }

  async list() {
    return { items: [1,2,3] };
  }

}
