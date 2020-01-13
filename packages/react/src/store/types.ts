
export const StoreSubscribe = Symbol("Store subscribe");
export const StoreNotify = Symbol("Store notify");
export const StoreUpdaters = Symbol("Store updaters");
export const StoreValues = Symbol("Store values");
export const StoreKeys = Symbol("Store property names");
export const StoreSerialize = Symbol("Store serialize");
export const StoreUnserialize = Symbol("Store unserialize");

export type StoreUpdater = () => any;

export interface StoreContainer {
  [StoreUpdaters]?: Map<StoreUpdater, StoreUpdater>;
  [StoreValues]?: any;
  [StoreKeys]?: string[];
}
