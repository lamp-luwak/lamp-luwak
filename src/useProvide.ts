import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { Dep, provide } from "./di";
import { subscribe } from "./subscriber";

export function useProvide<T>(dep: Dep<T>): T;
export function useProvide<T>(deps: Dep<T>[]): T[];
export function useProvide<A>(deps: [Dep<A>]): [A];
export function useProvide<A,B>(deps: [Dep<A>,Dep<B>]): [A,B];
export function useProvide<A,B,C>(deps: [Dep<A>,Dep<B>,Dep<C>]): [A,B,C];
export function useProvide<A,B,C,D>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>]): [A,B,C,D];
export function useProvide<A,B,C,D,E>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>,Dep<E>]): [A,B,C,D,E];
export function useProvide<A,B,C,D,E,F>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>,Dep<E>,Dep<F>]): [A,B,C,D,E,F];
export function useProvide(depOrDeps: any): any {
  if (Array.isArray(depOrDeps)) {
    return depOrDeps.map(useProvide);
  }
  const instance = provide(depOrDeps);
  const forceUpdate = useForceUpdate();
  useEffect(
    () =>  subscribe(instance, forceUpdate),
    [instance]
  );
  return instance;
}
