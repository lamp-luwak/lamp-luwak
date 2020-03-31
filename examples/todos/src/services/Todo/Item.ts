import { provide, action, subscribe, dispatch } from "@impress/react";
import { uniqid } from "../../lib/uniqid";
import { Todo } from "../Todo";

export const ItemChanged = action();
export const ItemCompletedChanged = action();
export const RemoveItem = action();

type Props = {
  label: string;
  completed?: boolean;
}
type Store = {
  id: string;
  label: string;
  completed: boolean;
}

export class Item {
  todo = provide(Todo);

  store: Store;

  constructor({ label, completed }: Props) {
    this.store = {
      id: uniqid(),
      label,
      completed: completed || false
    };
    subscribe(this, ItemChanged);
    subscribe(this, this.onChange, this);
  }

  protected onChange(store: Store, prevStore: Store) {
    if (store.completed !== prevStore.completed) {
      dispatch(ItemCompletedChanged, store, prevStore);
    }
  }

  public get id() {
    return this.store.id;
  }
  public get completed() {
    return this.store.completed;
  }
  public get label() {
    return this.store.label;
  }

  public setCompleted(completed: boolean) {
    if (completed !== this.store.completed) {
      this.store = { ...this.store, completed };
    }
  }

  public setLabel(label: string) {
    if (label !== this.store.label) {
      this.store = { ...this.store, label };
    }
  }

  public remove() {
    dispatch(RemoveItem, this);
  }

}
