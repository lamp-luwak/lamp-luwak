import React from "react";
import { NewTodo } from "./NewTodo";

export const Header = () => (
  <header className="header">
    <h1>todos</h1>
    <NewTodo />
  </header>
);
