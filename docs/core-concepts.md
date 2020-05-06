### Core Concepts

- Services
- Stores
- Actions

### Services

Service - it single instantiated class or memoized result of function factory. Service can be accessed from any place of your app code through call `useService` or `service` function.

```typescript
import { useService, modify, set } from "lamp-luwak";
// ...

class Modal {
  state = {
    text: '',
    opened: false
  };
  open(text: string) {
    set(this, {
      text,
      opened: true
    });
  }
  close() {
    modify(this).opened = false;
  }
}

const ModalButton: FC<{ text: string }> =  = ({ text, children }) => {
  const modal = useService(Modal);
  return (
    <button onClick={() => modal.open(text)}>
      {children}
    </button>
  )
};

const ModalContainer = () => {
  const modal = useService(Modal);
  const { opened, text } = modal.state;
  if (!opened) return null;
  return (
    <Overlay>
      <Panel>
        <Body>{text}</Body>
        <Footer>
          <button onClick={() => modal.close()}>Close</button>
        </Footer>
      </Panel>
    </Overlay>
  )
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/modal)

We use a single instantiated `Modal` service in `ModalButton` and `ModalContainer` components. Each update of the `Modal` service store these two components will be updated too because they got `Modal` service instance by call `useService` function inside.

### Stores

Store - an instance of a class or plain object with `state` property created by `store` function or received from `useService` or `service` functions.
- You automatically subscribe to the change of `state` property in a react component that received service from `useService` function call.
- Or you can subscribe to the change of `state` property use `watch` or `useSubscribe` functions.

```typescript
import { useService, service, watch, set } from 'lamp-luwak';
// ...

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
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/todo-counters)

Here you can see how to subscribe to the change of `Todo` service store, from `TodoCounter` service which calculates counters of active and completed items.

### Actions

And finally, we can use actions for communication between "no service stores" and services. Or for another implementation of event bus abstraction.

```typescript
import { service, watch, on, store, modify, action, useSubscribe } from 'lamp-luwak';
// ...

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

// ...

const Item: FC<{ item: TodoItem }> = ({ item }) => {
  const { label, completed } = item.state;
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
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/todo-counters-2)
