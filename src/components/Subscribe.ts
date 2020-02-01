import React from "react";
import { isContainer } from "~/store";
import { subscribe } from "~/subscribe";

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
      if (item && isContainer(item)) {
        subscribe(this, item);
      }
    }
  }

  public render() {
    return this.props.children();
  }
}
