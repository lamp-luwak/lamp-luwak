import { store, provide } from "@lib/core";
import { Fetcher, FetcherPool } from "./FetcherPool";
import { Config } from "./Config";

export class Feed {
  @provide public fetcherPool: FetcherPool;
  @provide public config: Config;

  @store public list = [];

  public fetcher: Fetcher;

  constructor() {
    this.fetcher = this.fetcherPool.make()
      .url(this.config.apiUrls.feedList)
      .ok((data) => this.list = data.items);
  }

}
