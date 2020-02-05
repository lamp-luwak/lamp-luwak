import { PureComponent } from "react";
import { subscribe, store } from "~/lib/core";
import { Item as TodoItemType } from "~/services/Todo/Item";
import { EnterKeyCode } from "~/lib/consts";

@subscribe
export class TodoItem extends PureComponent<{ item: TodoItemType }> {
  @store editing = false;
  @store labelEditorText = "";

  private editInputSetFocusNeeded = false;
  private editInputNodeElement?: HTMLInputElement;

  private handleDestroyClick = () => {
    this.props.item.destroy();
  }

  private handleToggleClick = () => {
    this.props.item.toggle();
  }

  private handleEditDoubleClick = () => {
    this.editing = true;
    this.labelEditorText = this.props.item.label;
    this.editInputSetFocusNeeded = true;
  }

  private handleEditInputChange = (event: any) => {
    this.labelEditorText = event.target.value;
  }

  private handleEditInputKeyDown = (event: any) => {
    if (event.keyCode !== EnterKeyCode) {
      return;
    }
    const label = this.labelEditorText.trim();
    if (label) {
      this.props.item.setLabel(label);
      this.editing = false;
    }
  }

  private handleEditNodeReference = (node: HTMLInputElement) => {
    this.editInputNodeElement = node;
  }

  private handleDocumentMouseDown = (event: any) => {
    const node = this.editInputNodeElement;
    if (!node) return;
    if (!node.contains(event.target)) {
      this.editing = false;
    }
  }

  private getLiClassName() {
    if (this.editing) return "editing";
    if (this.props.item.completed) return "completed";
  }

  public componentDidUpdate() {
    if (this.editing && this.editInputSetFocusNeeded) {
      const node = this.editInputNodeElement;
      if (!node) return;

      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }

  public render() {
    const { item } = this.props;
    const { labelEditorText } = this;

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
          value={labelEditorText}
          onChange={this.handleEditInputChange}
          onKeyDown={this.handleEditInputKeyDown}
          ref={this.handleEditNodeReference}
        />
      </li>
    )
  }
}
