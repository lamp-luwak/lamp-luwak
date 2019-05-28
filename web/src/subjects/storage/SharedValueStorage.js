import { inject } from "lib/core";
import { SharedStorage } from "./SharedStorage";

export class SharedValueStorage {
  @inject(SharedStorage) storage;

  constructor(key) {
    this.key = key;
  }

  get() {
    return this.storage.get(this.key);
  }

  set(value) {
    return this.storage.set(this.key, value);
  }

}
