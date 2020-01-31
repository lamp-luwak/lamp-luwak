import { provide, bind } from "~/lib/core";
import { Route } from "~/services/Route";
import { Request, Response } from "~/services/Server";

export class FeedRouter {
  @provide public route: Route;

  public init() {
    this.route.make("POST", "/feed/create", this.create);
    this.route.make("GET", "/feed/list", this.list);
  }

  @bind
  public create(req: Request, res: Response) {
    console.log(
      req, res,
    );
  }

  @bind
  public list() {
    const items = [1, 2, 3];
    items.sort(() => 0 - Math.random() + 0.5);
    return { items };
  }

}
