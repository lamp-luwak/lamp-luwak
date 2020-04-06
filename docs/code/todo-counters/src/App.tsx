import React from 'react';
import { useProvide, provide, subscribe } from 'lamp-luwak';
import { Text } from './ui';

type TodoItem = {
  id: number,
  label: string,
  completed: boolean
}

class Todo {
  store: TodoItem[] = [
    { id: 1, label: 'Cook the dinner', completed: false },
    { id: 2, label: 'Cook the breakfast', completed: true }
  ]
  toggle(item: TodoItem) {
    const items = this.store;
    const index = items.indexOf(item);
    this.store = items.slice(0, index)
      .concat({
        ...items[index],
        completed: !item.completed
      })
      .concat(...items.slice(index+1));
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
    this.calculate();
  }
  calculate() {
    const items = this.todo.store;
    const completed = items.filter(item => item.completed).length;
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

const List = () => {
  const todo = useProvide(Todo);
  const items = todo.store;
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map(item => (
        <li>
          <Text key={item.id} onClick={() => todo.toggle(item)} lineThrough={item.completed}>
            {item.label}
          </Text>
        </li>
      ))}
    </ul>
  );
};

export const App = () => (
  <>
    <List />
    <Counters />
  </>
);
