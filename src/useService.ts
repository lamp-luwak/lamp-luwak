import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { Dep, service } from "./di";
import { watch } from "./store";

export function useService<T>(dep: Dep<T>): T;
export function useService<A>(deps: [Dep<A>]): [A];
export function useService<A,B>(deps: [Dep<A>,Dep<B>]): [A,B];
export function useService<A,B,C>(deps: [Dep<A>,Dep<B>,Dep<C>]): [A,B,C];
export function useService<A,B,C,D>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>]): [A,B,C,D];
export function useService<A,B,C,D,E>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>,Dep<E>]): [A,B,C,D,E];
export function useService<A,B,C,D,E,F>(deps: [Dep<A>,Dep<B>,Dep<C>,Dep<D>,Dep<E>,Dep<F>]): [A,B,C,D,E,F];
export function useService(a: any): any {
  if (Array.isArray(a)) {
    return a.map(useService);
  }
  const instance = service(a);
  const forceUpdate = useForceUpdate();
  useEffect(
    () =>  watch(instance as any, forceUpdate),
    [instance]
  );
  return instance;
}
