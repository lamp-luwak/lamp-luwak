import { provide, subscribe } from "lamp-luwak";
import { Todo } from "./Todo";
import { Item, ItemCompletedChanged } from "./Todo/Item";

export class TodoFilter {
  todo = provide(Todo);
  store = {
    filter: "all",
    completed: [] as Item[],
    active: [] as Item[]
  }

  constructor() {
    subscribe(this.todo, this.refresh, this);
    subscribe(ItemCompletedChanged, this.refresh, this);
  }

  refresh() {
    const list = this.todo.getList();
    this.store = {
      ...this.store,
      completed: list.filter(({ completed }) => completed),
      active: list.filter(({ completed }) => !completed),
    };
  }

  getCurrentList(): Item[] {
    const { filter } = this.store;
    switch (filter) {
      case "active":
        return this.store.active;
      case "completed":
        return this.store.completed;
      default:
        return this.todo.getList();
    }
  }

  getActiveCounter() {
    return this.store.active.length;
  }

  getCompletedCounter() {
    return this.store.completed.length;
  }

  getFilter() {
    return this.store.filter;
  }

  setFilter(filter: string) {
    this.store = {
      ...this.store,
      filter
    }
  }

}
