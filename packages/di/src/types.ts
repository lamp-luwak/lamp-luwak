export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export interface ObjectMap<T = any> {
  [key: string]: T;
}
export type PropertyKey = string;

export type Dep<T = any> = ClassType<T> | (() => T) | T;
export enum DepResolvePhase {
  Start,
  Finish,
}

export type ProvideInstanceSubscriber<T = any> = (target: object, instance: Dep<T>) => void;
