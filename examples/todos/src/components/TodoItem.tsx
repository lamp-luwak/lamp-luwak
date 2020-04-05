import React, { useState, useRef, useEffect } from "react";
import { useSubscribe } from "lamp-luwak";
import { EnterKeyCode } from "../lib/consts";
import { useClickAway } from "../lib/useClickAway";
import { Item as TodoItemType } from "../services/Todo/Item";

type Props = {
  item: TodoItemType;
}

export const TodoItem = ({ item }: Props) => {
  const [ editing, setEditing ] = useState(false);
  const [ labelEditorText, setLabelEditorText ] = useState("");
  const [ editInputSetFocusNeeded, setEditInputSetFocusNeeded ] = useState(false);

  const editInputElementRef = useRef<HTMLInputElement>(null);
  useClickAway(editInputElementRef, () => {
    setEditing(false);
  });
  useSubscribe(item);

  useEffect(() => {
    if (editing && editInputSetFocusNeeded) {
      const node = editInputElementRef.current;
      if (!node) return;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }, [editInputSetFocusNeeded, editing])

  const handleDestroyClick = () => item.remove();
  const handleToggleClick = () => item.setCompleted(!item.completed);

  const handleEditDoubleClick = () => {
    setEditing(true);
    setLabelEditorText(item.label);
    setEditInputSetFocusNeeded(true);
  }

  const handleEditInputChange = (event: any) => setLabelEditorText(event.target.value);
  const handleEditInputKeyDown = (event: any) => {
    if (event.keyCode !== EnterKeyCode) {
      return;
    }
    const label = labelEditorText.trim();
    if (label) {
      item.setLabel(label);
      setEditing(false);
    }
  }

  const getLiClassName = () => {
    if (editing) return "editing";
    if (item.completed) return "completed";
  }

  return (
    <li className={getLiClassName()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.completed}
          onChange={handleToggleClick}
        />
        <label onDoubleClick={handleEditDoubleClick}>{item.label}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>
      <input
        className="edit"
        value={labelEditorText}
        onChange={handleEditInputChange}
        onKeyDown={handleEditInputKeyDown}
        ref={editInputElementRef}
      />
    </li>
  )
};
