import { store, dispatch } from "~/lib/core";
import { uniqid } from "~/lib/uniqid";
import { RemoveItem } from "../Todo";

type Partial<T> = {
  [P in keyof T]?: T[P];
}

function update<T>(store: T, upd: Partial<T>): T {
  return {
    ...store,
    ...upd
  };
}

export class Item {
  @store store: {
    key: string;
    label: string;
    completed: boolean;
  };

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

    update(this.store, {
      completed: !this.store.completed
    });

    this.store = update(this.store, {
      completed: !this.store.completed
    });

    // this.store = update(this.store, {
    //   completed: !this.store.completed
    // });
  }

  public destroy() {
    dispatch(RemoveItem, this);
  }

}
