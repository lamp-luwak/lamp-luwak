import { Unsubscribers, Values } from "./consts";
import { ObjectMap } from "~/types";
export { ClassType, PropertyKey } from "~/types";

export type Unsubscriber = () => void;

export interface Container extends Object {
  [Unsubscribers]?: Unsubscriber[];
  [Values]?: ObjectMap;
  [key: string]: any;
}
