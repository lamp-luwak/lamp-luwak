import React from "react";
import { useProvide } from "../lib/core";
import { Todo } from "../services/Todo";
import { TodoItem } from "./TodoItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const TodoList = () => {
  const todo = useProvide(Todo);
  if (todo.isEmpty()) {
    return null;
  }

  return (
    <section className="main">
      <ToggleAllButton />
      <ul className="todo-list">
        {todo.getList().map((item) => <TodoItem item={item} key={item.id} />)}
      </ul>
    </section>
  )
};
