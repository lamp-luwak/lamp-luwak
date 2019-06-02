
export type Type<T> = new (...args: any[]) => T;
export type TypeWithArgs<T, A extends any[]> = new (...args: A) => T;
