import React, { memo } from "react";
import { useProvide } from "~/lib/core";
import { Todo } from "~/services/Todo";
import { ClearCompletedButton } from "./ClearCompletedButton";

export const Footer = memo(() => {
  const todo = useProvide(Todo);

  return (
    /* <!-- This footer should hidden by default and shown when there are todos --> */
    <footer className="footer">
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count"><strong>{todo.getActiveCounter()}</strong> item left</span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <ClearCompletedButton />
    </footer>
  );
})
