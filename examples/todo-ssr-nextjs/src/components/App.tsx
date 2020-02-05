import { memo } from "react";
import { resolve, quiet } from "~/lib/core";
import Head from "next/head";
import { TodoList } from "./TodoList";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Todo } from "~/services/Todo";

export const App = memo(({ filter }: any) => {
  quiet(() => {
    resolve(Todo).setFilter(filter);
  });

  const suffix = filter.slice(0, 1).toUpperCase() + filter.slice(1);
  return (
    <>
      <Head>
        <title>Todos &middot; {suffix}</title>
      </Head>
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
  );
});
