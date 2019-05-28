import { provide } from '@lib/core';
import { Route } from '@services/Route';
import { AccountApi } from '@api/AccountApi';

export class AccountRouter {
  @provide(Route) route: Route;
  @provide(AccountApi) accountApi: AccountApi;

  init() {
    this.route.make('GET', '/account/token', this.createToken.bind(this));
  }

  async createToken() {
    const token = await this.accountApi.createToken();
    return { token };
  }

}
