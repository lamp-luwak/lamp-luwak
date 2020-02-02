export { ClassType, ObjectMap, PropertyKey } from "~/types";
import { ObjectMap } from "~/types";
import { Updaters, Values, Keys } from "./consts";

export type Updater = () => any;

export interface Container {
  [Updaters]: Updater[];
  [Values]: ObjectMap;
  [Keys]: string[];
}
