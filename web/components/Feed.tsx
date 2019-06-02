import React from "react";
import { subscribe, inject } from "@lib/core";
import { Feed as FeedSubject } from "@subjects/Feed";
import { FetcherLoader } from "./FetcherLoader";
import { FeedCreator } from "./FeedCreator";

interface FeedProps {}

@subscribe
export class Feed extends React.PureComponent<FeedProps> {

  @inject(FeedSubject) feed: FeedSubject;

  constructor(props: FeedProps) {
    super(props);
    this.feed.fetcher.fetch();
  }

  render() {
    return (
      <React.Fragment>
        <FeedCreator />
        <FetcherLoader
          fetcher={this.feed.fetcher}
          ok={() => this.feed.list.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          />
      </React.Fragment>
    );
  }
}
