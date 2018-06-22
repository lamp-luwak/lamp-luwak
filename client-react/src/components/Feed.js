import React from 'react';
import { subscribe, inject } from 'lib/core';
import { Feed as FeedSubject } from 'subjects/Feed';
import { FetcherLoader } from './FetcherLoader';

@subscribe
export class Feed extends React.PureComponent {

  @inject(FeedSubject) feed;

  constructor() {
    super();
    this.feed.fetcher.fetch();
  }

  render() {
    return (
      <FetcherLoader
        fetcher={this.feed.fetcher}
        ok={() => this.feed.list.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
        />
    );
  }
}
