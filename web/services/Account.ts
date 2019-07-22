import { store, provide } from "~/lib/core";
import { FetcherPool, Fetcher } from "./FetcherPool";
import { SharedStorage } from "./SharedStorage";
import { Config } from "./Config";

const AccountStorageKey = "__account_token__";

export class Account {
  @provide private storage: SharedStorage;
  @provide private fetcherPool: FetcherPool;
  @provide private config: Config;

  @store public token: string | undefined;
  public fetcher: Fetcher;

  constructor() {
    this.token = this.token || this.storage.get(AccountStorageKey);

    this.fetcher = this.fetcherPool.make()
      .url(this.config.apiUrls.accountToken)
      .ok((data) => this.setToken(data.token))
      .before((next) => this.token ? this.token : next());
  }

  public setToken(token: string | undefined) {
    this.token = token;
    this.storage.set(AccountStorageKey, token);
    return this.token;
  }

}
