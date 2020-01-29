import { Updaters, Values, Keys } from "./consts";

export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export interface ObjectMap<T = any> {
  [key: string]: T;
}
export type PropertyKey = string;

export type Updater = () => any;

export interface Container {
  [Updaters]: Updater[];
  [Values]: ObjectMap;
  [Keys]: string[];
}

export type Notifier = (target: object) => void;
