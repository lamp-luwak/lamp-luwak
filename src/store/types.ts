export { ClassType, ObjectMap } from "~/types";
import { ObjectMap } from "~/types";
import { Updaters, Values, Keys } from "./consts";

export type Updater = () => any;

export interface Container {
  [Updaters]: Updater[];
  [Values]: ObjectMap;
  [Keys]: string[];
}

export type StorePropertyKey = string;
