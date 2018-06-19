
const store = new Map();

export const ctx = (Ctor) => {
  let instance;
  if (!(instance = store.get(Ctor))) {
    store.set(Ctor, instance = ctx.make(Ctor));
  }
  return instance;
}

ctx.make = function(Ctor, ...args) {
  Ctor.prototype.ctx = this;
  return new Ctor(...args);
};
