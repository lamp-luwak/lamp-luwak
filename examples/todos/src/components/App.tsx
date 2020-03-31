import React from "react";
import { useFilterFromRoute } from "../hooks/useFilterFromRoute";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TodoList } from "./TodoList";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const App = () => {
  useLocalStorage();
  useFilterFromRoute();

  return (
    <>
      <section className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      </footer>
    </>
  )
};
