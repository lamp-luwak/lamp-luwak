import React from "react";
import { provide, resolve } from "~/lib/core";
import { Account } from "~/services/Account";
import { FetcherLoader } from "./FetcherLoader";
import { Feed } from "./Feed";

export class App extends React.PureComponent {
  @provide private account: Account;

  public static async prefetch() {
    await resolve(Account).fetcher.fetch();
    await Feed.prefetch();
  }

  public render() {
    return <FetcherLoader fetcher={this.account.fetcher} ok={() => <Feed />} />;
  }
}
