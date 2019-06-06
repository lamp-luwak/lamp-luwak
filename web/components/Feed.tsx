import React from "react";
import { subscribe, provide, resolve } from "@lib/core";
import { Feed as FeedService } from "@services/Feed";
import { FetcherLoader } from "./FetcherLoader";
import { FeedCreator } from "./FeedCreator";

interface FeedProps {}

@subscribe
export class Feed extends React.PureComponent<FeedProps> {
  @provide public feedService: FeedService;

  public static async prefetch() {
    return resolve(FeedService).fetcher.fetch();
  }

  public render() {
    return (
      <React.Fragment>
        <FeedCreator />
        <FetcherLoader
          fetcher={this.feedService.fetcher}
          ok={() => this.feedService.list.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          />
      </React.Fragment>
    );
  }
}
