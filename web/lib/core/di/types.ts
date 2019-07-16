import { ClassType } from "../types";

export type Dep<T = any> = ClassType<T> | (() => T) | T;
export enum DepResolvePhase {
  Start,
  Finish,
}

export type PropertyKey = string;

export const ProvidePropertyKeys = Symbol("Provide property keys");

export interface ProvideContainer {
  [ProvidePropertyKeys]?: PropertyKey[];
}
