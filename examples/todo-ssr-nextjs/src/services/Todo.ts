import { store, action, listen, update, notify, lock, unlock } from "~/lib/core";
import { fetchJson } from "~/lib/fetchJson";
import { Item } from "./Todo/Item";

export const RemoveItem = action();
export const RefreshComputed = action();

export class Todo {
  @store list: Item[] = [];
  @store filter = "all";
  @store prefetched = false;

  private computed = {
    completed: [] as Item[],
    active: [] as Item[]
  };

  constructor() {
    this.refreshComputed();
  }

  public append(label: string, completed?: boolean) {
    this.list = update(this.list, [
      new Item(label, completed)
    ]);
    this.refreshComputed();
  }

  @listen(RefreshComputed)
  public refreshComputed() {
    this.computed = update(this.computed, {
      completed: this.list.filter(({ completed }) => completed),
      active: this.list.filter(({ completed }) => !completed),
    });
    notify(this);
  }

  @listen(RemoveItem)
  public remove(item: Item) {
    this.list = this.list.filter((_item) => item !== _item);
    this.refreshComputed();
  }

  public clearCompleted() {
    this.list = this.list.filter(({ completed }) => !completed);
    this.refreshComputed();
  }

  public toggleAll() {
    lock(RefreshComputed);
    if (this.computed.active.length > 0) {
      for (const item of this.list) {
        if (!item.completed) {
          item.toggle();
        }
      }
    } else {
      for (const item of this.list) {
        if (item.completed) {
          item.toggle();
        }
      }
    }
    unlock(RefreshComputed);
    this.refreshComputed();
  }

  public getAllList() {
    return this.list;
  }

  public getActiveList() {
    return this.computed.active;
  }

  public getCompletedList() {
    return this.computed.completed;
  }

  public isEmpty() {
    return this.list.length === 0;
  }

  public getActiveCounter() {
    return this.computed.active.length;
  }

  public getCompletedCounter() {
    return this.computed.completed.length;
  }

  public setFilter(filter: string) {
    this.filter = filter;
  }

  public getFilteredList() {
    switch(this.filter) {
      case "active": return this.getActiveList();
      case "completed": return this.getCompletedList();
      default: return this.getAllList();
    }
  }

  public async prefetch() {
    if (this.prefetched) return;
    const todos = await fetchJson("/api/todos");
    for (const { label, completed } of todos) {
      this.append(label, completed);
    }
    this.prefetched = true;
  }
}
