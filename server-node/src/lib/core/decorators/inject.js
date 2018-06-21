
const store = new Map();

export const inject = (Ctor) => (Prototype, property) => ({
  get() {
    let instance = store.get(Ctor);
    if (!instance) {
      store.set(Ctor, instance = new Ctor());
    }

    Object.defineProperty(this, property, {
      value: instance,
      enumerable: true,
      configurable: false,
      writable: false
    });
    return instance;
  },
  enumerable: true,
  configurable: true
});
