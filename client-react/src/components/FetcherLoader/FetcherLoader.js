import React from 'react';
import PropTypes from 'prop-types';
import { subscribe } from 'lib/core';
import { Fetcher } from 'subjects/Fetcher';

@subscribe
export class FetcherLoader extends React.PureComponent {

  static propTypes = {
    fetcher: PropTypes.instanceOf(Fetcher)
  }

  render() {
    if (this.props.fetcher.loading) {
      return (
        <div>Loading</div>
      );
    } else {
      return this.props.children;
    }
  }
}

