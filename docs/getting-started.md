### Getting Started

Today we talk about lamp-luwak. For a first - store.

Store - Its a usually class (better) or function factory returns object with `store` property.
```typescript
class Todo {
  store = [];
}
```
This place is the best place for define default store value.

`useProvide` - react hook for provide and subscribe to service from react component. Syntax here.
```typescript
const App = () => {
  const todo = useProvide(Todo);
  // ...
```

I think here we can start our first app.

```typescript
import React from 'react';
import { useProvide, modify } from 'lamp-luwak';

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
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/heroes)

We use the instance of Heroes class as a usually immutable store with two methods:
- `add` method who same as reducer only modify immutable data. Add new hero to heroes list, and reset text in the inputbox after.
- And `setName` method who same as reducer too as well as the previous method. It uses `modify` method, who using current structure of store, and give a possibility to edit immutable data as a usual assignment, no more, only kind of syntax for updating immutable data.

For a deeper understanding of using `useProvide` we can separate `App` to two components. The code below has an equal effect as a previous code.

```typescript
const List = React.memo(() => {
  const heroes = useProvide(Heroes);
  return (
    <ul>
      {heroes.store.list.map((hero) =>(
        <li>{hero.name}</li>
      ))}
    </ul>
  );
});

export const App = () => {
  const heroes = useProvide(Heroes);
  return (
    <>
      <List />
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
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/heroes-2)

We can use the single instance of `Heroes` class in any place of our application. And each use of `useProvide` hook makes a binding between called hook component and instance of Heroes class. After instantiating Class through `useProvide` or `create`, it changes `store` property. Now `store` is getter/setter who updates all linked react components on each self-value change.

`useSubscribe` - react hook for subscribe react component to store or action recieved from props.
```typescript
const App = memo(({ item }) => {
  useSubscribe(item);
  // ...
})
```

`provide` - Its a function that return a single instantiated instance of any class or function factory with performed `store` property.
```typescript
export class Todo {
  logger = provide(Logger);
}
```
Best place to use this function. Its mechanism is the same as Dependency Injection. You can get a single instance of any class or function factory from any place of your app. I think `logger` in this example - _service_. Already we can make app with multiple services with relations between them.

`create` - Create new instance of store Class or function factory. And make the property `store`, on it change possible to subscribe.
```typescript
const entity = creact(Entity);
```

`action` - Create new object - Action. You can dispatch action or subscribe on It.
```typescript
import { action, subscribe, dispatch } from 'lamp-luwak';

const RemoveItem = action();
subscribe(RemoveItem, (item) => console.log(item));
dispatch(RemoveItem, {id: 1});
```

`dispatch` - Run all subscribed functions and pass arguments to calling subscribers.

`subscribe` - Subscribe function to object. Subscribed function will be called each `dispatch` call. Subscribed function can get all arguments whan passed to `dispatch` call.

`modify` - Helper for modify immutable data.
```typescript
  const Hero {
    store = {
      name: ''
    }
  }
  const hero = create(Hero);
  modify(hero).name = 'Ganesha';
```
This means that creating new plain object in `store` property with new name value.
