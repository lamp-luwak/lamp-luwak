const store = new Map();

type ClassType = new () => object;

export const provide = (Class: ClassType): any => (
  target: object,
  propertyName: string | symbol,
): PropertyDescriptor => ({
  get() {
    let instance = store.get(Class);
    if (!instance) {
      store.set(Class, (instance = new Class()));
    }

    Object.defineProperty(this, propertyName, {
      value: instance,
      enumerable: true,
      configurable: false,
      writable: false,
    });
    return instance;
  },
  enumerable: true,
  configurable: true,
});
