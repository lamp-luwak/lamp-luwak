import { provide } from "../../lib/core";
import { Todo } from "../Todo";

type Props = {
  label: string;
  completed?: boolean;
}

export class Item {
  todo = provide(Todo);

  store: {
    id: string;
    label: string;
    completed: boolean;
  };

  constructor({ label, completed }: Props) {
    this.store = {
      id: label + new Date(),
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

  public setCompleted(completed: boolean) {
    if (completed !== this.store.completed) {
      this.store = { ...this.store, completed };
      this.todo.updateCompletedDeps();
    }
  }

  public setLabel(label: string) {
    if (label !== this.store.label) {
      this.store = { ...this.store, label };
    }
  }

  public remove() {
    this.todo.removeById(this.id);
  }

}
