import { RootZoneId } from "./consts";
import state from "./state";
import { DestroyListener } from "./types";

const { index, parentIndex, destroyListeners } = state;

export async function zone<T = void>(callback: () => T): Promise<T> {
  const asyncHooks = (!process.browser) ? require("async_hooks") : null; // With love for Webpack
  if (!asyncHooks) {
    return callback();
  }
  if (typeof state.hook === "undefined") {
    state.hook = asyncHooks.createHook({
      // tslint:disable-next-line: variable-name
      init(asyncId: number, _type: any, triggerAsyncId: number) {
        const rootAsyncId = index[triggerAsyncId];
        if (rootAsyncId) {
          index[asyncId] = rootAsyncId;
        }
      },
      before(asyncId: number) {
        state.currentId = index[asyncId] || RootZoneId;
      },
      destroy(asyncId: number) {
        delete index[asyncId];
      },
    }).enable();
  }
  // tslint:disable-next-line: no-shadowed-variable
  return new Promise((resolve, reject) => {
    process.nextTick(async () => {
      const asyncId = asyncHooks.executionAsyncId();
      parentIndex[asyncId] = index[asyncId] || RootZoneId;
      state.currentId = index[asyncId] = asyncId;
      try {
        // tslint:disable-next-line: await-promise
        resolve(await callback());
      } catch (error) {
        reject(error);
      }
      delete parentIndex[asyncId];
      fireDestroy(asyncId);
    });
  });
}

export function getZoneId(): number {
  return state.currentId;
}

export function getZoneParentId(zoneId: number) {
  return parentIndex[zoneId];
}

export function onZoneDestroy(listener: DestroyListener) {
  destroyListeners.push(listener);
}

function fireDestroy(zoneId: number) {
  destroyListeners.forEach((listener) => listener(zoneId));
}
