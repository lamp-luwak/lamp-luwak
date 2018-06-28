import React from 'react';
import PropTypes from 'prop-types';
import { Subject } from '../PropTypes/Subject';

export class Subscribe extends React.PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    to: PropTypes.oneOfType([
      Subject,
      PropTypes.arrayOf(Subject)
    ]).isRequired
  }

  constructor(props, context) {
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
