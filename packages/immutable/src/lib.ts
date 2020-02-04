import { Partial } from "./types";

export function update<T>(struct: T, update: Partial<T>): T {
  return {
    ...struct,
    ...update
  };
}
