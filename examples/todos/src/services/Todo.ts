import { make, subscribe } from "../lib/core";
import { Item, RemoveItem } from "./Todo/Item";

export class Todo {
  store = [] as Item[];

  constructor() {
    subscribe(RemoveItem, this.remove, this);
  }

  append(label: string) {
    const item = make(Item, { label });
    this.store = this.store.concat(item);
  }

  remove({ id }: Item) {
    this.store = this.store.filter((item) => item.id !== id);
  }

  isEmpty() {
    return this.store.length === 0;
  }

  getList() {
    return this.store;
  }

  toggleAll() {

  }

}
