import { store, on, set } from "lamp-luwak";
import { Item, RemoveItem } from "./Todo/Item";

export class Todo {
  state = [] as Item[];

  constructor() {
    on(RemoveItem, this.remove.bind(this));
  }

  append(label: string) {
    const item = store(Item, { label });
    set(this, this.state.concat(item));
  }

  remove({ id }: Item) {
    set(this, this.state.filter((item) => item.id !== id));
  }

  clearCompleted() {
    set(this, this.state.filter(({ completed }) => !completed));
  }

  isEmpty() {
    return this.state.length === 0;
  }

  getList() {
    return this.state;
  }

  toggleAll() {
    const completedTo = this.state.some(({ completed }) => !completed);
    for (const item of this.state) {
      if (completedTo !== item.completed) {
        item.setCompleted(completedTo);
      }
    }
  }

}
