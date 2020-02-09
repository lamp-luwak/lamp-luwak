import { PureComponent, ReactNode } from "~/driver";
import { isContainer } from "~/store";
import { subscribe } from "~/subscribe";

interface Props<T = object | object[]> {
  children: (to: T extends any[] ? any : T) => ReactNode;
  to: T;
}

export class Subscribe<T> extends PureComponent<Props<T>> {

  constructor(props: Props<T>, context?: any) {
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
    return this.props.children(this.props.to as T extends any[] ? any : T);
  }
}
