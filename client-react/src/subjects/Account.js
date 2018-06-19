import { mut } from 'lib/core';
import { Fetcher } from './Fetcher';

export class Account {

  @mut token;

  constructor() {
    this.fetcher = new Fetcher(
      '/account/token',
      (data) => this.token = data.token
    );
  }

}
