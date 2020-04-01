Hi, Guys.

Today we ask about impress. For a first - store.

Store - Its a usually class (better) or function factory, with "store" property.
```typescript
export class Todo {
  store = [];
}
```
This place is the best place for define default store value.

provide - Its a function who return single instantiated instance of any class or function factory.
```typescript
export class Todo {
  logger = provide(Logger);
}
```
Best place for use this function. Its mechanism same as Dependency Injection. You can get single instance of any class or function factory from any place of your app. I think `logger` in this example - "service".

useProvide - react hook for provide and subscribe to service from react component. Syntax here.
```typescript
const logger = useProvide(Logger);
```

I think here we can start our first app.

```typescript
import React, { useState } from 'react';
import { useProvide } from '@impress/react';

type Hero = {
  name: string;
}

class Heroes {
  store = [] as Hero[];
  add(hero: Hero) {
    this.store = [ ...this.store, hero ];
  }
}

export const App = () => {
  const [name, setName] = useState('Isaac Newton');
  const heroes = useProvide(Heroes);
  return (
    <>
      <ul>
        {heroes.store.map((hero) =>(
          <li>{hero.name}</li>
        ))}
      </ul>
      Type heroes name and press enter<br/>
      <input
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            heroes.add({ name });
            setName('');
          }
        }}
        onChange={(e) => setName(e.target.value)}
        value={name} />
    </>
  );
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/impress/tree/master/docs/code/heroes)

We use Heroes service as usually immutable store with `add` method who same reducer only modify immutable data.


----

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
