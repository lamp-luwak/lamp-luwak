// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Subject } from '../PropTypes/Subject';

type Props = {
  children: Function,
  to?: Subject | Array<Subject>
};

export class Subscribe extends React.PureComponent<Props> {

  unsubscribers: Array<Function>;

  constructor(props: Props, context?: any) {
    super(props, context);

    const unsubscribers = this.unsubscribers = [];
    const update = this.forceUpdate.bind(this);

    for (const subject of [].concat(this.props.to)) {
      unsubscribers.push(subject.__mutSubscribe(update));
    }
  }

  componentWillUnmount() {
    for (const unsubscriber of this.unsubscribers) {
      unsubscriber();
    }
  }

  render() {
    return this.props.children();
  }
}
