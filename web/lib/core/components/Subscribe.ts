import React from "react";
import { StoreContainer } from "../store/types";
import { isStoreContainer, subscribe } from "../store/lib";

interface Props {
  children: () => React.ReactNode;
  to?: object | object[];
}

export class Subscribe extends React.PureComponent<Props> {

  public unsubscribers: Array<() => any>;

  constructor(props: Props, context?: any) {
    super(props, context);

    const unsubscribers: Array<() => any> = this.unsubscribers = [];
    const update = this.forceUpdate.bind(this);

    const to = (this.props.to instanceof Array)
      ? this.props.to
      : [ this.props.to ];

    for (const item of to) {
      const container = item as StoreContainer;
      if (isStoreContainer(container)) {
        unsubscribers.push(subscribe(container, update));
      }

    }
  }

  public componentWillUnmount() {
    for (const unsubscriber of this.unsubscribers) {
      unsubscriber();
    }
  }

  public render() {
    return this.props.children();
  }
}
