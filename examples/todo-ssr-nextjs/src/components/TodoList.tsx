import { PureComponent } from "react";
import { provide } from "~/lib/core";
import { Todo } from "~/services/Todo";
import { TodoItem } from "./TodoItem";


export class TodoList extends PureComponent {

  @provide todo: Todo;

  public render() {
    const { todo } = this;

    if (todo.isEmpty()) {
      return null;
    }

    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todo.each((item) => <TodoItem item={item} key={item.key} />)}
        </ul>
      </section>
    )
  }
}
