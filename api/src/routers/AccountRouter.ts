import { provide } from "@lib/core";
import { Route } from "@services/Route";
import { AccountApi } from "@api/AccountApi";

export class AccountRouter {
  @provide(Route) public route: Route;
  @provide(AccountApi) public accountApi: AccountApi;

  public init() {
    this.route.make("GET", "/account/token", this.createToken.bind(this));
  }

  public async createToken() {
    const token = await this.accountApi.createToken();
    return { token };
  }

}
