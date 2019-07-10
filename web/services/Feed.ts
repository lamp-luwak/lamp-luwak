import { store, provide, ssr } from "~/lib/core";
import { Fetcher, FetcherPool } from "./FetcherPool";
import { Config } from "./Config";

@ssr("Feed")
export class Feed {
  @provide public fetcherPool: FetcherPool;
  @provide public config: Config;

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
