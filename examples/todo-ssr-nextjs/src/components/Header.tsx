import { memo } from "react";
import { NewTodo } from "./NewTodo";

export const Header = memo(() => (
  <header className="header">
    <h1>todos</h1>
    <NewTodo />
  </header>
));
