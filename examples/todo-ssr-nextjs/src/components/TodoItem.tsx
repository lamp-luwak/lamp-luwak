import { PureComponent } from "react";
import { subscribe } from "~/lib/core";
import { Item as TodoItemType } from "~/services/Todo/Item";

@subscribe
export class TodoItem extends PureComponent<{ item: TodoItemType }> {

  public render() {
    const { item } = this.props;
    return (
      <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" checked />
          <label>{item.label}</label>
          <button className="destroy"></button>
        </div>
        <input className="edit" value="Create a TodoMVC template" />
      </li>
    )
  }
}
