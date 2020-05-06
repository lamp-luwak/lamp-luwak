import React, { memo } from "react";
import { useService } from "lamp-luwak";
import { Todo } from "../services/Todo";
import { TodoFilter } from "../services/TodoFilter";

export const ClearCompletedButton = memo(() => {
  const [ todo, todoFilter ] = useService([ Todo, TodoFilter ]);

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
