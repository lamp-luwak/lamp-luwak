import { memo } from "react";
import { useProvide } from "~/lib/core";
import { Todo } from "~/services/Todo";
import { TodoItem } from "./TodoItem";
import { ToggleAllButton } from "./ToggleAllButton";

export const TodoList = memo(() => {
  const todo = useProvide(Todo);
  if (todo.isEmpty()) {
    return null;
  }

  return (
    <section className="main">
      <ToggleAllButton />
      <ul className="todo-list">
        {todo.getFilteredList().map((item) => <TodoItem item={item} key={item.id} />)}
      </ul>
    </section>
  )
});
