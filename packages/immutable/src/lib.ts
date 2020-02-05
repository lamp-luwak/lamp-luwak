import { Partial } from "./types";

export function update<T>(struct: T, upd: Partial<T>): T;
export function update<T>(struct: T[], upd: T[]): T[];
export function update(struct: any, upd: any): any {
  if (Array.isArray(struct)) {
    return [ ...struct, ...upd ];
  }
  return {
    ...struct,
    ...upd
  };
}
