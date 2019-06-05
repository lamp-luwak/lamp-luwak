import React from "react";
import { subscribe } from "@lib/core";
import { Fetcher, FetcherStatus } from "@services/FetcherPool";
import { Spin, Alert } from "antd";

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
          : <Alert type="warning" message="Ok section does not defined" />;

      case FetcherStatus.Fail:
        return fail
          ? fail()
          : <Alert type="error" message="Failed to fetch" />;

      case FetcherStatus.Progress:
      default:
        return <Spin />;
    }
  }
}
