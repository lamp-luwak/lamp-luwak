// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { subscribe } from 'lib/core';
import { Fetcher, FetcherStatus } from 'subjects/Fetcher';
import { Spin, Alert } from 'antd';

type Props = {
  fetcher: Fetcher,
  ok?: Function,
  fail?: Function
};

@subscribe
export class FetcherLoader extends React.PureComponent<Props> {
  render() {
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

