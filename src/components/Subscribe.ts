
import { PureComponent, ReactNode } from "~/driver";
import { subscribe } from "~/subscribe";
import { ObjectMap } from "~/types";

type ChildrenFunction<T = any> = {
  children: (props: T) => ReactNode;
}

@subscribe
export class Subscribe extends PureComponent<ObjectMap & ChildrenFunction> {
  public render() {
    return this.props.children(this.props);
  }
}
