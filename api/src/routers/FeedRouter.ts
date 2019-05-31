import { provide } from "@lib/core";
import { Route } from "@services/Route";

export class FeedRouter {
  @provide(Route) public route: Route;

  public init() {
    this.route.make("POST", "/feed/create", this.create.bind(this));
    this.route.make("GET", "/feed/list", this.list.bind(this));
  }

  public async create({ req, headers, body }: { req: any, headers: any, body: any }) {
    // tslint:disable-next-line: no-console
    console.log(
      req, headers, body,
    );
  }

  public async list() {
    return { items: [1, 2, 3] };
  }

}
