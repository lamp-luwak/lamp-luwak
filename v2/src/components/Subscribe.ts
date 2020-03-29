
import { Component, ReactNode } from "~/driver";
import { subscribe } from "~/subscribe";
import { ObjectMap } from "~/types";

type ChildrenFunction<T = any> = {
  children: (props: T) => ReactNode;
}

@subscribe
export class Subscribe<T extends ObjectMap> extends Component<T & ChildrenFunction<T>> {
  public render() {
    return (this.props.children as ChildrenFunction<T>["children"])(this.props as T);
  }
}
