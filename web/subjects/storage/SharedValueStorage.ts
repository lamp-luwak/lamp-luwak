import { inject } from "@lib/core";
import { SharedStorage } from "./SharedStorage";

export class SharedValueStorage {
  @inject(SharedStorage) storage;

  constructor(key) {
    this.key = key;
  }

  public get() {
    return this.storage.get(this.key);
  }

  public set(value) {
    return this.storage.set(this.key, value);
  }

}
