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
    const { fetcher, children } = this.props;
    
    return fetcher.loading
      ? <div>Loading...</div>
      : children;
  }
}

