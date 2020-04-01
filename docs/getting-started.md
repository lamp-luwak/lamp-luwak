### Getting Started

Hi, Guys.

Today we ask about impress. For a first - store.

Store - Its a usually class (better) or function factory, with "store" property.
```typescript
export class Todo {
  store = [];
}
```
This place is the best place for define default store value.

useProvide - react hook for provide and subscribe to service from react component. Syntax here.
```typescript
const Todo = () => {
  const todo = useProvide(Todo);
  // ...
```

I think here we can start our first app.

```typescript
import React from 'react';
import { useProvide, modify } from '@impress/react';

type Hero = {
  name: string;
}

class Heroes {
  store = {
    list: [] as Hero[],
    name: 'Isaac Newton'
  };
  append() {
    const { list, name } = this.store;
    this.store = {
      list: list.concat({ name }),
      name: ''
    }
  }
  setName(name: string) {
    modify(this).name = name;
  }
}

export const App = () => {
  const heroes = useProvide(Heroes);
  return (
    <>
      <ul>
        {heroes.store.list.map((hero) =>(
          <li>{hero.name}</li>
        ))}
      </ul>
      Type heroes name and press enter<br/>
      <input
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            heroes.append();
          }
        }}
        onChange={(e) => heroes.setName(e.target.value)}
        value={heroes.store.name} />
    </>
  );
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/impress/tree/master/docs/code/heroes)

We use the instance of Heroes class as a usually immutable store with two methods:
- `add` method who same as reducer only modify immutable data. Add new hero to heroes list, and reset text in the inputbox after.
- And `setName` method who same as reducer too as well as the previous method. It uses `modify` method, who using current structure of store, and give a possibility to edit immutable data as a usual assignment, no more, only kind of syntax for updating immutable data.

provide - Its a function that return a single instantiated instance of any class or function factory.
```typescript
export class Todo {
  logger = provide(Logger);
}
```
Best place to use this function. Its mechanism is the same as Dependency Injection. You can get a single instance of any class or function factory from any place of your app. I think `logger` in this example - "service".

useSubscribe - react hook for subscribe react component to store or action recieved from props.
```typescript
const App = memo(({ item }) => {
  useSubscribe(item);
  // ...
})
```

create -

action -

dispatch -

modify -
