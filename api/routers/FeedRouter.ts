import { provide } from "@lib/core";
import { Route } from "@services/Route";
import { Request, Response } from "@services/Server";

export class FeedRouter {
  @provide public route!: Route;

  public init() {
    this.route.make("POST", "/feed/create", this.create.bind(this));
    this.route.make("GET", "/feed/list", this.list.bind(this));
  }

  public async create(req: Request, res: Response) {
    console.log(
      req, res,
    );
  }

  public async list() {
    return { items: [1, 2, 3] };
  }

}
