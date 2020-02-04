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
      /* <!-- This section should be hidden by default and shown when there are todos --> */
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todo.each((item) => <TodoItem item={item} key={item.key} />)}
          {/* <!-- These are here just to show the structure of the list items --> */}
          {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" checked />
              <label>Taste JavaScript</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="Create a TodoMVC template" />
          </li>
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>Buy a unicorn</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" value="Rule the web" />
          </li>
        </ul>
      </section>
    )
  }
}
