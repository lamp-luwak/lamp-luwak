const store = new Map();

export const provide = (Ctor: object): any => (
  (target: object, propertyName: string | symbol): PropertyDescriptor => ({
    get() {
      let instance = store.get(Ctor);
      if (!instance) {
        store.set(Ctor, (instance = new (Ctor as ObjectConstructor)()));
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
  })
);
