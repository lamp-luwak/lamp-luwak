import React from "react";
import { StoreContainer } from "../store/types";
import { isStoreContainer } from "../store/lib";
import { subscribe } from "../subscribe/lib";

interface Props {
  children: () => React.ReactNode;
  to?: object | object[];
}

export class Subscribe extends React.PureComponent<Props> {

  constructor(props: Props, context?: any) {
    super(props, context);

    const items = Array.isArray(this.props.to)
      ? this.props.to
      : [ this.props.to ];

    for (const item of items) {
      const container = item as StoreContainer;
      if (isStoreContainer(container)) {
        subscribe(this, container);
      }
    }
  }

  public render() {
    return this.props.children();
  }
}
