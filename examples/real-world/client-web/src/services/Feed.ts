import { store, provide } from "~/lib/core";
import { Fetcher, FetcherPool } from "./FetcherPool";
import { Config } from "./Config";

export class Feed {
  @provide private fetcherPool: FetcherPool;
  @provide private config: Config;

  @store public list: any[] = [];

  public fetcher: Fetcher;

  constructor() {
    this.fetcher = this.fetcherPool.make()
      .url(this.config.apiUrls.feedList)
      .ok((data) => this.setList(data.items));
  }

  public setList(list: any[]) {
    this.list = list;
  }

  public append(item: any) {
    this.list = this.list.concat(item);
  }

}
