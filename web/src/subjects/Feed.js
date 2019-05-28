import { mut, inst } from 'lib/core';
import { Fetcher } from './Fetcher';

export class Feed {

  @mut list = [];

  constructor() {
    this.fetcher = inst(Fetcher)
      .url('/feed/list')
      .ok(data => this.list = data.items);
  }

}
