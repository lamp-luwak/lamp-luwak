import { PureComponent } from "react";
import { subscribe, store } from "~/lib/core";
import { Item as TodoItemType } from "~/services/Todo/Item";

@subscribe
export class TodoItem extends PureComponent<{ item: TodoItemType }> {
  @store store = {
    editing: false,
    label: ""
  };

  private handleDestroyClick = () => {
    this.props.item.destroy();
  }

  private handleToggleClick = () => {
    this.props.item.toggle();
  }

  private handleEditDoubleClick = () => {
    this.store = {
      ...this.store,
      editing: true
    }

    this.store = update(this.store, { editing: false });
  }

  private getLiClassName() {
    if (this.editing) {
      return "editing";
    }
    if (this.props.item.completed) {
      return "completed";
    }
  }

  public render() {
    const { item } = this.props;

    return (
      <li className={this.getLiClassName()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed}
            onChange={this.handleToggleClick}
          />
          <label onDoubleClick={this.handleEditDoubleClick}>{item.label}</label>
          <button className="destroy" onClick={this.handleDestroyClick} />
        </div>
        <input
          className="edit"
          value="Create a TodoMVC template"
        />
      </li>
    )
  }
}
