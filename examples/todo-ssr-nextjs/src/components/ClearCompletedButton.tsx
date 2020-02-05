import React, { memo } from "react";
import { useProvide } from "~/lib/core";
import { Todo } from "~/services/Todo";

export const ClearCompletedButton = memo(() => {
  const todo = useProvide(Todo);

  if(!todo.getCompletedCounter()) {
    return null;
  }

  return (
    <button
      className="clear-completed"
      onClick={() => todo.clearCompleted()}
    >Clear completed</button>
  );
})
