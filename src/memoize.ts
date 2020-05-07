import { FuncType } from "./types";

export function memoize<A, K extends any[] = any[], M = any>(selector: () => [A], fn: (a: A, ...args: K) => M): FuncType<M, K>;
export function memoize<A, B, K extends any[] = any[], M = any>(selector: () => [A, B], fn: (a: A, b: B, ...args: K) => M): FuncType<M, K>;
export function memoize<A, B, C, K extends any[] = any[], M = any>(selector: () => [A, B, C], fn: (a: A, b: B, c: C, ...args: K) => M): FuncType<M, K>;
export function memoize<A, B, C, D, K extends any[] = any[], M = any>(selector: () => [A, B, C, D], fn: (a: A, b: B, c: C, d: D, ...args: K) => M): FuncType<M, K>;
export function memoize<A, B, C, D, E, K extends any[] = any[], M = any>(selector: () => [A, B, C, D, E], fn: (a: A, b: B, c: C, d: D, e: E, ...args: K) => M): FuncType<M, K>;
export function memoize<M = any>(selector: () => any[], fn: (...args: any[]) => M): FuncType<M> {
  let lastInput = null as any;
  let cached = undefined as any;

  const check = (input: any[]) => {
    if (!lastInput) return false;
    if (input.length !== lastInput.length) return false;

    for (let i = 0; i < input.length; i++) {
      if (input[i] !== lastInput[i]) {
        return false
      }
    }
    return true;
  }

  return (...suffix: any[]): M => {
    const input = selector().concat(suffix);
    if (!check(input)) {
      lastInput = input.slice();
      cached = fn(...input);
    }
    return cached;
  }
}
