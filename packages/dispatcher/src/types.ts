import { Listeners, Locked } from "./consts";

export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export type PropertyKey = string;

export type Action = {
  [Listeners]: [ClassType, PropertyKey][];
  [Locked]?: boolean;
}
