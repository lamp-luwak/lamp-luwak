import React, { FC, useState } from 'react';
import { useProvide, provide, subscribe, create, modify, action, useSubscribe } from 'lamp-luwak';
import { Text } from './ui';

type TodoItemStore = {
  id: number,
  label: string,
  completed: boolean
}

const TodoItemChanged = action();

class TodoItem {
  store: TodoItemStore;
  constructor(store: TodoItemStore) {
    this.store = store;
    subscribe(this, TodoItemChanged);
  }
  toggle() {
    modify(this).completed = !this.store.completed;
  }
}

class Todo {
  store = [
    create(TodoItem, { id: 1, label: 'Cook the dinner', completed: false }),
    create(TodoItem, { id: 2, label: 'Cook the breakfast', completed: true })
  ]
  add(label: string) {
    this.store = this.store.concat(
      create(TodoItem, { id: Date.now(), label, completed: false })
    );
  }
}

class TodoCounters {
  todo = provide(Todo);
  store = {
    active: 0,
    completed: 0
  }
  constructor() {
    subscribe(this.todo, this.calculate, this);
    subscribe(TodoItemChanged, this.calculate, this);
    this.calculate();
  }
  calculate() {
    const items = this.todo.store;
    const completed = items.filter(item => item.store.completed).length;
    const active = items.length - completed;
    this.store = { completed, active };
  }
}

const Counters = () => {
  const { active, completed } = useProvide(TodoCounters).store;
  return (
    <>
      <div>Active: {active}</div>
      <div>Completed: {completed}</div>
    </>
  )
};

const Item: FC<{ item: TodoItem }> = ({ item }) => {
  const { label, completed } = item.store;
  useSubscribe(item);
  return (
    <li>
      <Text onClick={() => item.toggle()} lineThrough={completed}>
        {label}
      </Text>
    </li>
  )
};

const List = () => {
  const todo = useProvide(Todo);
  const items = todo.store;
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map(item => (
        <Item item={item} key={item.store.id} />
      ))}
    </ul>
  )
};

const Input = () => {
  const [text, setText] = useState('Cook the lunch');
  const todo = useProvide(Todo);
  const addHandler = () => {
    todo.add(text);
    setText('');
  };

  return (
    <>
      <input
        onChange={(e) => setText(e.target.value)}
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
