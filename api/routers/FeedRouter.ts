import { provide, bind } from "@lib/core";
import { Route } from "@services/Route";
import { Request, Response } from "@services/Server";

export class FeedRouter {
  @provide public route: Route;

  public init() {
    this.route.make("POST", "/feed/create", this.create);
    this.route.make("GET", "/feed/list", this.list);
  }

  @bind
  public async create(req: Request, res: Response) {
    console.log(
      req, res,
    );
  }

  @bind
  public async list() {
    return { items: [1, 2, 3] };
  }

}
