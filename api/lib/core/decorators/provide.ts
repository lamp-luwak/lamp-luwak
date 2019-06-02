const store = new Map();

export function provide(target: object, propertyKey: string) {
  const Class = Reflect.getMetadata("design:type", target, propertyKey);
  Object.defineProperty(target, propertyKey, {
    get() {
      let instance = store.get(Class);
      if (!instance) {
        store.set(Class, (instance = new Class()));
      }

      Object.defineProperty(this, propertyKey, {
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
}
