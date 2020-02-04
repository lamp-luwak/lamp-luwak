import Head from "next/head";
import { NewTodo } from "~/components/NewTodo";
import { TodoList } from "~/components/TodoList";

export default () => (
  <>
    <Head>
      <title>Todo SSR example</title>
    </Head>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo />
      </header>
      <TodoList />
      {/* <!-- This footer should hidden by default and shown when there are todos --> */}
      <footer className="footer">
        {/* <!-- This should be `0 items left` by default --> */}
        <span className="todo-count"><strong>0</strong> item left</span>
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
        {/* <!-- Hidden if no completed items are left ↓ --> */}
        <button className="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
      {/* <!-- Remove the below line ↓ --> */}
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      {/* <!-- Change this out with your name and url ↓ --> */}
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </>
);
