import React from "react";
import { provide, resolve } from "~/lib/core";
import { Feed as FeedService } from "~/services/Feed";
import { FetcherLoader } from "./FetcherLoader";
import { FeedCreator } from "./FeedCreator";

interface FeedProps {}

export class Feed extends React.PureComponent<FeedProps> {
  @provide private feedService: FeedService;

  public static async prefetch() {
    await resolve(FeedService).fetcher.fetch();
  }

  public render() {
    return (
      <>
        <FeedCreator />
        <FetcherLoader
          fetcher={this.feedService.fetcher}
          ok={() => (
            this.feedService.list.map((item, index) => (
              <div key={index}>{item}</div>
            ))
          )}
        />
      </>
    );
  }
}
