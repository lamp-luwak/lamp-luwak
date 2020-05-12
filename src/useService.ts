import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";
import { Dep, service } from "./di";
import { watch } from "./store";

export function useServices<A>(depA: Dep<A>): [A];
export function useServices<A,B>(depA: Dep<A>, depB: Dep<B>): [A,B];
export function useServices<A,B,C>(depA: Dep<A>, depB: Dep<B>, depC: Dep<C>): [A,B,C];
export function useServices<A,B,C,D>(depA: Dep<A>, depB: Dep<B>, depC: Dep<C>, depD: Dep<D>): [A,B,C,D];
export function useServices<A,B,C,D,E>(depA: Dep<A>, depB: Dep<B>, depC: Dep<C>, depD: Dep<D>, depE: Dep<E>): [A,B,C,D,E];
export function useServices<A,B,C,D,E,F>(depA: Dep<A>, depB: Dep<B>, depC: Dep<C>, depD: Dep<D>, depE: Dep<E>, depF: Dep<F>): [A,B,C,D,E,F];
export function useServices(...deps: any[]): any {
  const instances = deps.map(service);
  const forceUpdate = useForceUpdate();
  useEffect(
    () => {
      const unsubscribers = instances.map((inst) => watch(inst as any, forceUpdate));
      return () => {
        for (const unsubscriber of unsubscribers.slice()) {
          unsubscriber();
        }
      }
    },
    [...instances]
  );
  return instances;
}

export function useService<T>(dep: Dep<T>): T {
  return useServices(dep)[0];
}
