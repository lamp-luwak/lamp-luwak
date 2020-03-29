export { ClassType, ObjectMap } from "~/types";
import { ObjectMap } from "~/types";
import { Updaters, Values, Keys } from "./consts";

export type Updater = () => any;

export interface Container extends Object {
  [Updaters]?: Updater[];
  [Values]?: ObjectMap;
  [Keys]?: string[];
  [key: string]: any;
}

export type StorePropertyKey = string;
