### Core Concepts

- Services
- Stores
- Actions

### Services

Service - it single instantiated class or memoized result of function factory. Service can be accessed from any place of your app code through call `useProvide` or `provide` function.

```typescript
import { useProvide, modify } from "lamp-luwak";
// ...

class Modal {
  store = {
    text: '',
    opened: false
  };
  open(text: string) {
    this.store = {
      text,
      opened: true
    }
  }
  close() {
    modify(this).opened = false;
  }
}

const ModalButton: FC<{ text: string }> =  = ({ text, children }) => {
  const modal = useProvide(Modal);
  return (
    <button onClick={() => modal.open(text)}>
      {children}
    </button>
  )
};

const ModalContainer = () => {
  const modal = useProvide(Modal);
  const { opened, text } = modal.store;
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

We use single instantiated `Modal` service in `ModalButton` and `ModalContainer` components. Each update of `Modal` service store these two compononents will be updated too, because they got `Modal` service instance by call `useProvide` function inside.

### Stores

Store - instance of class or plain object with `store` property created by `create` function or recieved from `useProvide` or `provide` functions.
- You automatically subscribe to change of `store` property from react compoment that recieved service from `useProvide` function call.
- Or you can subscribe to change of `store` property use `subscribe` or `useSubscribe` functions.

```typescript
import { useProvide, provide, subscribe } from 'lamp-luwak';
// ...

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

Here you can see how to subcribe to change of `Todo` service store from `TodoCounter` service which calculate counters of active and completed items.

### Actions

And finally we can use actions for communication between "no service stores" and services. Or for another implementation of event bus abstraction.

```typescript
import { provide, subscribe, create, modify, action, useSubscribe } from 'lamp-luwak';
// ...

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

// ...

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
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/todo-counters-2)
