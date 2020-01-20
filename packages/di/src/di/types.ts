import { ClassType } from "../types";

export type Dep<T = any> = ClassType<T> | (() => T) | T;
export enum DepResolvePhase {
  Start,
  Finish,
}

export type ProvideInstanceSubscriber<T = any> = (target: object, instance: Dep<T>) => void;
