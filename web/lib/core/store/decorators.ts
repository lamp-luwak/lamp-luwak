import { StoreContainer } from "./interfaces";
import { addKey, get, set } from "./lib";

interface PropertyDescriptorWithInitializer extends PropertyDescriptor {
  initializer?: () => any;
}

export function store(
  target: object & StoreContainer,
  propertyKey: string,
  descriptor?: PropertyDescriptorWithInitializer,
  ): any {
  const initializer = (descriptor || {}).initializer;

  addKey(target, propertyKey);

  return {
    get(this: StoreContainer) {
      return get(this, propertyKey, initializer);
    },
    set(this: StoreContainer, value: any) {
      set(this, propertyKey, value);
    },
    configurable: false,
    enumerable: true,
  };
}
