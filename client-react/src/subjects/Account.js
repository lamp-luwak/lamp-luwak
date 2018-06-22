import { mut } from 'lib/core';
import { Fetcher } from './Fetcher';
import { SharedValueStorage } from './storage/SharedValueStorage';

export class Account {
  @mut token;

  constructor() {
    this.storage = new SharedValueStorage('account::token');
    this.token = this.storage.get();

    this.fetcher = new Fetcher()
      .url('/account/token')
      .ok(data => this.setToken(data.token))
      .before(next => this.token ? this.token : next());
  }

  setToken(token) {
    this.token = token;
    this.storage.set(token);
    return this.token;
  }

}
