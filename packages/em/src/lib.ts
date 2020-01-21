import { EventListener } from "./types";
import { Listeners } from "./consts";

export function emit(target: object, event: string, data: any): void {
  const listeners = ((target as any)?.[Listeners]?.[event] || []).slice();
  for (const listener of listeners) {
    try {
      listener(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export function on(target: object, event: string, listener: EventListener): () => void {
  const map: any = (target as any)[Listeners] = (target as any)[Listeners] || {};
  const listeners = map[event] = map[event] || [];
  listeners.push(listener);
  return (): void => {
    let index = 0;
    while (index < listeners.length) {
      if (listeners[index] === listener) {
        listeners.splice(index, 1);
      } else {
        index++;
      }
    }
  }
}

export function once(target: object, event: string, listener: EventListener): () => void {
  const off = on(target, event, (data: any) => {
    try {
      listener(data);
      off();
    } catch (error) {
      off();
      throw error;
    }
  });
  return off;
}
