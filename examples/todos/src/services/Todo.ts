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

  clearCompleted() {
    this.store = this.store.filter(({ completed }) => !completed);
  }

  isEmpty() {
    return this.store.length === 0;
  }

  getList() {
    return this.store;
  }

  toggleAll() {
    const completedTo = this.store.some(({ completed }) => !completed);
    for (const item of this.store) {
      if (completedTo !== item.completed) {
        item.setCompleted(completedTo);
      }
    }
  }

}
