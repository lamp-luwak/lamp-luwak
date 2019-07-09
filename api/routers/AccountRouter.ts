import { provide, bind } from "~/lib/core";
import { Route } from "~/services/Route";
import { AccountApi } from "~/api/AccountApi";

export class AccountRouter {
  @provide public route: Route;
  @provide public accountApi: AccountApi;

  public init() {
    this.route.make("GET", "/account/token", this.createToken);
  }

  @bind
  public async createToken() {
    const token = await this.accountApi.createToken();
    return { token };
  }

}
