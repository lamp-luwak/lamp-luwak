import React, { memo } from "react";
import { useProvide } from "../lib/core";
import { Todo } from "../services/Todo";
import { TodoFilter } from "../services/TodoFilter";

export const ClearCompletedButton = memo(() => {
  const todo = useProvide(Todo);
  const todoFilter = useProvide(TodoFilter);

  if(!todoFilter.getCompletedCounter()) {
    return null;
  }

  return (
    <button
      className="clear-completed"
      onClick={() => todo.clearCompleted()}
    >Clear completed</button>
  );
})
