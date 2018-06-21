import { inject } from 'lib/core';
import { Route } from 'services/Route';
import { AccountApi } from 'api/AccountApi';

export class AccountRouter {
  @inject(Route) route;
  @inject(AccountApi) accountApi;

  init() {
    this.route.make('GET', '/account/token', this.createToken.bind(this));
  }

  async createToken() {
    const token = await this.accountApi.createToken();
    return { token };
  }

}
