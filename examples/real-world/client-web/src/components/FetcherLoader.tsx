import React from "react";
import { subscribe } from "~/lib/core";
import { Fetcher, FetcherStatus } from "~/services/FetcherPool";

interface FetcherLoaderProps {
  fetcher: Fetcher;
  ok?: () => any;
  fail?: () => any;
}

@subscribe
export class FetcherLoader extends React.PureComponent<FetcherLoaderProps> {

  public render() {
    const { fetcher, ok, fail } = this.props;

    switch (fetcher.status) {
      case FetcherStatus.Ok:
        return ok
          ? ok()
          : <b>Ok section does not defined</b>;

      case FetcherStatus.Fail:
        return fail
          ? fail()
          : <b>Failed to fetch</b>;

      case FetcherStatus.Progress:
      default:
        return <span>[ PROGRESS... ]</span>;
    }
  }
}
