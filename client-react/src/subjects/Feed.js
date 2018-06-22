import { mut } from 'lib/core';
import { Fetcher } from './Fetcher';

export class Feed {

  @mut list = [];

  constructor() {
    this.fetcher = new Fetcher(
      '/feed/list',
      (data) => this.list = data.items
    );
  }

}
