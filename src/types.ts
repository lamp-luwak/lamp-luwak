export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export type FuncType<T = any, K extends any[] = any> = (...args: K) => T;
export interface ObjectMap<T = any> { [key: string]: T }
