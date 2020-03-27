export type ClassType<T = any, K extends any[] = any> = new (...args: K) => T;
export type VoidFunction = () => void;
