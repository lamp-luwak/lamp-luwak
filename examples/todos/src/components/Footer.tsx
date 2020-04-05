import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useProvide } from "lamp-luwak";
import { Todo } from "../services/Todo";
import { TodoFilter } from "../services/TodoFilter";
import { ClearCompletedButton } from "./ClearCompletedButton";

export const Footer = memo(() => {
  const [ todo, todoFilter ] = useProvide([ Todo, TodoFilter ]);

  if (todo.isEmpty()) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{todoFilter.getActiveCounter()}</strong> item left</span>
      <ul className="filters">
        <li>
          <Link className={todoFilter.getFilter() === "all" ? "selected" : ""} to="/">All</Link>
        </li>
        <li>
          <Link className={todoFilter.getFilter() === "active" ? "selected" : ""} to="/active">Active</Link>
        </li>
        <li>
          <Link className={todoFilter.getFilter() === "completed" ? "selected" : ""} to="/completed">Completed</Link>
        </li>
      </ul>
      <ClearCompletedButton />
    </footer>
  );
})
