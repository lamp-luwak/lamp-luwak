import { store, action, listen, update, notify, lock, unlock } from "~/lib/core";
import { Item } from "./Todo/Item";

export const RemoveItem = action();
export const RefreshComputed = action();

export class Todo {
  @store list: Item[] = [];

  private computed = {
    completed: [] as Item[],
    active: [] as Item[]
  };

  public append(label: string) {
    this.list = update(this.list, [
      new Item(label)
    ]);
    this.refreshComputed();
  }

  @listen(RemoveItem)
  public remove(item: Item) {
    this.list = this.list.filter((_item) => item !== _item);
  }

  @listen(RefreshComputed)
  public refreshComputed() {
    this.computed = update(this.computed, {
      completed: this.list.filter(({ completed }) => completed),
      active: this.list.filter(({ completed }) => !completed),
    });
    notify(this);
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
}
