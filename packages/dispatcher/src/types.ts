import { Listeners, Locked } from "./consts";

export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export type PropertyKey = string;

export type ActionListener = ((...values: any[]) => any) | [ClassType, PropertyKey];
export type Action = {
  [Listeners]: ActionListener[];
  [Locked]?: boolean;
}
export type ListenerRemover = () => void;
