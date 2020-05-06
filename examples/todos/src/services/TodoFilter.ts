import { service, watch, on, update } from "lamp-luwak";
import { Todo } from "./Todo";
import { Item, ItemCompletedChanged } from "./Todo/Item";

export class TodoFilter {
  todo = service(Todo);
  state = {
    filter: "all",
    completed: [] as Item[],
    active: [] as Item[]
  }

  constructor() {
    watch(this.todo, this.refresh.bind(this));
    on(ItemCompletedChanged, this.refresh.bind(this));
  }

  refresh() {
    const list = this.todo.getList();
    update(this, {
      completed: list.filter(({ completed }) => completed),
      active: list.filter(({ completed }) => !completed),
    });
  }

  getCurrentList(): Item[] {
    const { filter } = this.state;
    switch (filter) {
      case "active":
        return this.state.active;
      case "completed":
        return this.state.completed;
      default:
        return this.todo.getList();
    }
  }

  getActiveCounter() {
    return this.state.active.length;
  }

  getCompletedCounter() {
    return this.state.completed.length;
  }

  getFilter() {
    return this.state.filter;
  }

  setFilter(filter: string) {
    update(this, { filter });
  }

}
