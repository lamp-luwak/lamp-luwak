import React from "react";
import { subscribe, provide, resolve } from "~/lib/core";
import { Account } from "~/services/Account";
import { FetcherLoader } from "./FetcherLoader";
import { Feed } from "./Feed";

@subscribe
export class App extends React.PureComponent {
  @provide public account: Account;

  public static async prefetch() {
    await resolve(Account).fetcher.fetch();
    await Feed.prefetch();
  }

  public render() {
    return <FetcherLoader fetcher={this.account.fetcher} ok={() => <Feed />} />;
  }
}
