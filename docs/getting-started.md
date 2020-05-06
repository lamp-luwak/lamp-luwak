### Getting Started

Today we talk about `lamp-luwak`.

State management who combine inside:
- The service-oriented principle, you can use oop theory to organize apps code if you want.
- Automatically sync Data-View from data in `state` property in services to react component views.
- Update only those components who use only that services inside. It gives easy and great instruments to make independent update view areas. You can make your component with your own set of stores and services, and use in some app as usually component without any additional initialize phase attachments or registrations (SSR supported).
- Instruments for making dependent services from a set of other services, for example, filters or search indexes.
- Action/subscribe/dispatch - abstraction (inspired by Rust trait) for organizing different kinds of code design: Event bus, Global event bus, Event Emitter, Observer, Dispatcher, pub/sub, Command, etc.
- Nested stores and "no service" stores.
- And Server side rendering.

Below we try syntax of `lamp-luwak` and make our first project on it.

We need to install create react app.

```
npx create-react-app my-app
```

And install `lamp-luwak` to your project.

```
npm i --save lamp-luwak
# or
yarn add lamp-luwak
```

I think here we can start our first app. Put the next code to your `App.js`.

```typescript
import React from 'react';
import { useService, modify, set } from 'lamp-luwak';

class Heroes {
  state = {
    list: [],
    name: 'Isaac Newton'
  };
  append() {
    const { list, name } = this.state;
    set(this.state, {
      list: list.concat({ name }),
      name: ''
    });
  }
  setName(name) {
    modify(this).name = name;
  }
}

const App = () => {
  const heroes = useService(Heroes);
  return (
    <>
      <ul>
        {heroes.state.list.map((hero) => (
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
        value={heroes.state.name} />
    </>
  );
};

export default App;
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/heroes)

We use the instance of `Heroes` class as a usually immutable store with two methods:
- `add` method who same as reducer only modify immutable data. Add new hero to heroes list, and reset text in the inputbox after.
- And `setName` method who same as reducer too as well as the previous method. It uses `modify` method, who using current structure of store, and give a possibility to edit immutable data as a usual assignment, no more, only kind of syntax for updating immutable data.

Store - Its a usually class (better) or function factory returns object with `state` property.
```typescript
class Heroes {
  state = {
    list: [] as Hero[],
    name: 'Isaac Newton'
  };
  // ...
```
This place is the best place for define default store value.

`useService` - react hook for provide and subscribe to service from react component. Syntax here.
```typescript
export const App = () => {
  const heroes = useService(Heroes);
  // ...
```

For a deeper understanding of using `useService` we can separate `App` to two components. The code below has an equal effect as a previous code.

```typescript
const List = React.memo(() => {
  const heroes = useService(Heroes);
  return (
    <ul>
      {heroes.state.list.map((hero) => (
        <li>{hero.name}</li>
      ))}
    </ul>
  );
});

export const App = () => {
  const heroes = useService(Heroes);
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
        value={heroes.state.name} />
    </>
  );
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/docs/code/heroes-2)

We can use the single instance of `Heroes` class in any place of our application. And each use of `useService` hook makes a binding between called hook component and instance of `Heroes` class. After instantiating class through `useService` or `store`, it changes `state` property. Now `state` is getter/setter who updates all linked react components on each self-value change.

Below you can find short information about primary `lamp-luwak` functions.

`useSubscribe` - react hook for subscribe react component to store or action recieved from props.
```typescript
const App = memo(({ item }) => {
  useSubscribe(item);
  // ...
})
```

`service` - Its a function that return a single instantiated instance of any class or function factory with preformed `state` property.
```typescript
export class Todo {
  logger = service(Logger);
}
```
Best place to use this function. Its mechanism is the same as Dependency Injection. You can get a single instance of any class or function factory from any place of your app. I think `logger` in this example - _service_. Already we can make app with multiple services with relations between them.

`store` - Create new instance of store class or function factory. And make the property `state`, on it change possible to subscribe.
```typescript
const entity = store(Entity);
```

`action` - Create new object - Action. You can dispatch action or subscribe on it.
```typescript
import { action, on, dispatch } from 'lamp-luwak';

const RemoveItem = action();
on(RemoveItem, (item) => console.log(item));
dispatch(RemoveItem, {id: 1});
```

`dispatch` - Run all subscribed functions and pass arguments to calling subscribers.

`on` - Subscribe function to action dispatching. Subscribed function will be called each `dispatch` call. Subscribed function can get all arguments what passed to `dispatch` call.

`modify` - Helper for modify immutable data.
```typescript
  const Hero {
    state = {
      name: ''
    }
  }
  const hero = store(Hero);
  modify(hero).name = 'Ganesha';
```
This means that creating new plain object in `state` property with new name value.
