import { make } from "../lib/core";
import { Item } from "./Todo/Item";

export class Todo {
  store = [] as Item[];

  append(label: string) {
    const item = make(Item, { label });
    this.store = this.store.concat(item);
  }

  removeById(id: string) {
    this.store = this.store.filter((item) => item.id !== id);
  }

  updateCompletedDeps() {

  }

  isEmpty() {
    return this.store.length === 0;
  }

  getList() {
    return this.store;
  }

  getActiveCounter() {
    return 0;
  }

  toggleAll() {

  }

}
