import { store } from "~/lib/core";
import { uniqid } from "~/lib/uniqid";
import { Todo } from "../Todo";


interface ItemStore {
  key: string;
  label: string;
  completed: boolean;
}

export class Item {
  @store store: ItemStore;

  constructor(label: string) {
    this.store = {
      key: uniqid(),
      label,
      completed: false
    };
  }

  public get key() {
    return this.store.key;
  }
  public get completed() {
    return this.store.completed;
  }
  public get label() {
    return this.store.label;
  }

  public toggle() {
    const { store } = this;
    this.store = {
      ...store,
      completed: !store.completed
    };
  }

  public destroy() {
    // dispatch(Todo.RemoveAction, this);
    // this.todo.remove(this);
  }

}
