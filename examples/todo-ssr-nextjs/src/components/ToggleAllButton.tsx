import { memo } from "react";
import { useProvide } from "~/lib/core";
import { Todo } from "~/services/Todo";

export const ToggleAllButton = memo(() => {
  const todo = useProvide(Todo);

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={todo.getActiveCounter() === 0}
        onChange={() => todo.toggleAll()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  )
});
