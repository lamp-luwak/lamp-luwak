import { action, subscribe, dispatch } from "lamp-luwak";
import { uniqid } from "../../lib/uniqid";

export const ItemChanged = action();
export const ItemCompletedChanged = action();
export const RemoveItem = action();

type Props = {
  id?: string,
  label: string;
  completed?: boolean;
}
type Store = {
  id: string;
  label: string;
  completed: boolean;
}

export class Item {
  store: Store;

  constructor(props?: Props) {
    this.store = {
      id: props?.id || uniqid(),
      label: props?.label || '',
      completed: props?.completed || false
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
