import { store } from "~/lib/core";
import { Item } from "./Todo/Item";

export class Todo {
  @store list: Item[] = [];

  public append(label: string) {
    this.list = [
      ...this.list,
      new Item(label)
    ];
  }

  public isEmpty() {
    return this.list.length === 0;
  }

  public each<T>(callback: (item: Item) => T): T[] {
    return this.list.map(callback);
  }

  public remove(item: Item) {
    this.list = this.list.filter((_item) => item !== _item);
  }
}
