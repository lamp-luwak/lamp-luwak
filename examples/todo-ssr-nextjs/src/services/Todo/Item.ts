import { store, dispatch, action } from "~/lib/core";
import { uniqid } from "~/lib/uniqid";
import { RemoveItem } from "../Todo";

export const ItemCompletedChanged = action();

export class Item {
  @store store: {
    id: string;
    label: string;
    completed: boolean;
  };

  constructor(label: string, completed?: boolean) {
    this.store = {
      id: uniqid(),
      label,
      completed: completed || false
    };
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

  public toggle() {
    this.store = { ...this.store, completed: !this.store.completed };
    dispatch(ItemCompletedChanged, this);
  }

  public setLabel(label: string) {
    this.store = { ...this.store, label };
  }

  public destroy() {
    dispatch(RemoveItem, this);
  }

}
