import React from "react";
import { subscribe, provide } from "@lib/core";
import { Feed as FeedService } from "@services/Feed";
import { FetcherLoader } from "./FetcherLoader";
import { FeedCreator } from "./FeedCreator";

interface FeedProps {}

@subscribe
export class Feed extends React.PureComponent<FeedProps> {

  @provide public feedService: FeedService;

  constructor(props: FeedProps) {
    super(props);
    this.feedService.fetcher.exec();
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
