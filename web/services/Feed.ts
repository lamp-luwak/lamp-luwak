import { store, provide, ssr } from "@lib/core";
import { Fetcher, FetcherPool } from "./FetcherPool";
import { Config } from "./Config";

@ssr("Feed")
export class Feed {
  @provide public fetcherPool: FetcherPool;
  @provide public config: Config;

  @store public list: any[] = [];

  public fetcher: Fetcher;

  constructor() {
    console.log("FETCH FeedList");
    this.fetcher = this.fetcherPool.make()
      .url(this.config.apiUrls.feedList)
      .ok((data) => this.setList(data.items));
  }

  public setList(list: any[]) {
    console.log("SET LIST FEED", list);
    this.list = list;
  }

}
