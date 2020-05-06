import React from 'react';
import { useService, service, watch, set } from 'lamp-luwak';
import { Text } from './ui';

type TodoItem = {
  id: number,
  label: string,
  completed: boolean
}

class Todo {
  state: TodoItem[] = [
    { id: 1, label: 'Cook the dinner', completed: false },
    { id: 2, label: 'Cook the breakfast', completed: true }
  ]
  toggle(item: TodoItem) {
    const items = this.state;
    const index = items.indexOf(item);
    set(this, items.slice(0, index)
      .concat({
        ...items[index],
        completed: !item.completed
      })
      .concat(...items.slice(index+1))
    );
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
    this.calculate();
  }
  calculate() {
    const items = this.todo.state;
    const completed = items.filter(item => item.completed).length;
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

const List = () => {
  const todo = useService(Todo);
  const items = todo.state;
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Text onClick={() => todo.toggle(item)} lineThrough={item.completed}>
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
