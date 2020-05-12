import React, { FC, useState } from 'react';
import { useService, service, watch, store, modify, action, useStore, on, set } from 'lamp-luwak';
import { Text } from './ui';

type TodoItemStore = {
  id: number,
  label: string,
  completed: boolean
}

const TodoItemChanged = action();

class TodoItem {
  state: TodoItemStore;
  constructor(state: TodoItemStore) {
    this.state = state;
    watch(this, TodoItemChanged);
  }
  toggle() {
    modify(this).completed = !this.state.completed;
  }
}

class Todo {
  state = [
    store(TodoItem, { id: 1, label: 'Cook the dinner', completed: false }),
    store(TodoItem, { id: 2, label: 'Cook the breakfast', completed: true })
  ]
  add(label: string) {
    set(this, this.state.concat(
      store(TodoItem, { id: Date.now(), label, completed: false })
    ));
  }
}

class TodoCounters {
  todo = service(Todo);
  state = {
    active: 0,
    completed: 0
  }
  constructor() {
    watch(this.todo, this.calculate.bind(this));
    on(TodoItemChanged, this.calculate.bind(this));
    this.calculate();
  }
  calculate() {
    const items = this.todo.state;
    const completed = items.filter(item => item.state.completed).length;
    const active = items.length - completed;
    set(this, { completed, active });
  }
}

const Counters = () => {
  const { active, completed } = useService(TodoCounters).state;
  return (
    <>
      <div>Active: {active}</div>
      <div>Completed: {completed}</div>
    </>
  )
};

const Item: FC<{ item: TodoItem }> = ({ item }) => {
  const { label, completed } = item.state;
  useStore(item);
  return (
    <li>
      <Text onClick={() => item.toggle()} lineThrough={completed}>
        {label}
      </Text>
    </li>
  )
};

const List = () => {
  const todo = useService(Todo);
  const items = todo.state;
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map(item => (
        <Item item={item} key={item.state.id} />
      ))}
    </ul>
  )
};

const Input = () => {
  const [text, setText] = useState('Cook the lunch');
  const todo = useService(Todo);
  const addHandler = () => {
    todo.add(text);
    setText('');
  };

  return (
    <>
      <input
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && addHandler()}
        value={text}
        autoFocus
      />
      <button onClick={addHandler}>Add</button>
    </>
  );
};

export const App = () => (
  <>
    <Input />
    <List />
    <Counters />
  </>
);
