import { store, action, on, notify, lock, unlock, DidUnserialize } from "~/lib/core";
import { fetchJson } from "~/lib/fetchJson";
import { Item, ItemCompletedChanged } from "./Todo/Item";

export const RemoveItem = action();
export const RefreshComputed = action();

export class Todo {
  @store list: Item[] = [];
  @store filter = "all";

  private computed = {
    completed: [] as Item[],
    active: [] as Item[]
  };

  [DidUnserialize]() {
    this.refreshComputed();
  }

  public async prefetch() {
    const todos = await fetchJson("/api/todos");
    for (const { label, completed } of todos) {
      this.append(label, completed);
    }
  }

  public append(label: string, completed?: boolean) {
    this.list = this.list.concat([
      new Item(label, completed)
    ]);
    this.refreshComputed();
  }

  @on(ItemCompletedChanged)
  public refreshComputed() {
    this.computed = {
      completed: this.list.filter(({ completed }) => completed),
      active: this.list.filter(({ completed }) => !completed),
    };
    notify(this);
  }

  @on(RemoveItem)
  public remove(item: Item) {
    this.list = this.list.filter((_item) => item !== _item);
    this.refreshComputed();
  }

  public clearCompleted() {
    this.list = this.list.filter(({ completed }) => !completed);
    this.refreshComputed();
  }

  public toggleAll() {
    lock(ItemCompletedChanged);
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
    unlock(ItemCompletedChanged);
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
}
