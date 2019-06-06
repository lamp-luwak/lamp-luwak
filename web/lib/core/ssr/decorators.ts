import { ClassType } from "./interfaces";
import { register } from "./lib";

export function ssr<T extends ClassType>(id: string) {
  return (Class: T) => {
    register(id, Class);
    return Class;
  };
}
