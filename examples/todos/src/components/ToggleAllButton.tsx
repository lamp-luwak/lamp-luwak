import React from "react";
import { useProvide } from "lamp-luwak";
import { Todo } from "../services/Todo";
import { TodoFilter } from "../services/TodoFilter";

export const ToggleAllButton = () => {
  const [ todo, todoFilter ] = useProvide([ Todo, TodoFilter ]);
  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={todoFilter.getActiveCounter() === 0}
        onChange={() => todo.toggleAll()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  )
};
