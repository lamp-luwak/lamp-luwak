
type ClassType = new(...args: any[]) => any;

export const index = new Map<string, ClassType>();
export const dictionary = new Map<ClassType, string>();

export function ssr<T extends ClassType>(id: string) {
  console.log("SSR ->", id);
  return (Class: T) => {
    index.set(id, Class);
    dictionary.set(Class, id);
    return Class;
  };
}
