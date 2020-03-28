import { provide, subscribe } from "../lib/core";
import { Todo } from "./Todo";
import { Item, ItemCompletedChanged } from "./Todo/Item";

export class TodoFilter {
  todo = provide(Todo);
  store = {
    filter: 'all',
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
    if (filter === 'all') {
      return this.todo.getList();
    }
    return [];
  }

  getActiveCounter() {
    return this.store.active.length;
  }

}
