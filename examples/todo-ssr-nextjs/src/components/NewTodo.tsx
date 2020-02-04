import { PureComponent } from "react";
import { store, provide } from "~/lib/core";
import { EnterKeyCode } from "~/lib/consts";
import { Todo } from "~/services/Todo";

export class NewTodo extends PureComponent {
  @provide todo: Todo;
  @store label = "";

  private handleInputChange = (event: any) => {
    this.label = event.target.value;
  }

  private handleInputKeyDown = (event: any) => {
    if (event.keyCode !== EnterKeyCode) {
      return;
    }
    const label = this.label.trim();
    if (label) {
      this.todo.append(label);
      this.label = "";
    }
  }

  public render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
        value={this.label}
      />
    )
  }
}
