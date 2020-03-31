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

useSubscribe - react hook for subscribe react component to store or action recieved from props.
```typescript
const App = memo(({ item }) => {
  useSubscribe(item);
  // ...
})
```

action -
create -
