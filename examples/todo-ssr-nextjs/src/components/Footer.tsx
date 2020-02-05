import React, { memo } from "react";
import { useProvide } from "~/lib/core";
import Link from "next/link";
import { Todo } from "~/services/Todo";
import { ClearCompletedButton } from "./ClearCompletedButton";

export const Footer = memo(() => {
  const todo = useProvide(Todo);
  if (todo.isEmpty()) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{todo.getActiveCounter()}</strong> item left</span>
      <ul className="filters">
        <li>
          <Link href="/">
            <a className={todo.filter === "all" ? "selected" : ""}>All</a>
          </Link>
        </li>
        <li>
          <Link href="/active">
            <a className={todo.filter === "active" ? "selected" : ""}>Active</a>
          </Link>
        </li>
        <li>
          <Link href="/completed">
            <a className={todo.filter === "completed" ? "selected" : ""}>Completed</a>
          </Link>
        </li>
      </ul>
      <ClearCompletedButton />
    </footer>
  );
})
