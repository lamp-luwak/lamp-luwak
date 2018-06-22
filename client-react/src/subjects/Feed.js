import { mut } from 'lib/core';
import { Fetcher } from './Fetcher';

export class Feed {

  @mut list = [];

  constructor() {
    this.fetcher = new Fetcher()
      .url('/feed/list')
      .ok(data => this.list = data.items);
  }

}
