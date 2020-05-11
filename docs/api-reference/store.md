### store

Store is an object that holds the state value. There can be multiple stores.

```typescript
store(initialValue?)
store(store, [...stores], selector)
store(class | function, [...args])
```

Store is a central part of your app. All data stored in state value can be watched for it changing.

```typescript
const name = store("Lazar");
watch(name, (state, prevState) => {
  console.log(state, prevState);
});
```

[watch](./watch.md) function makes a subscription to changing state in store. Each time when state will be changed subscribed function will be called.

```typescript
set(name, "Viraj"); // -> console.log("Viraj", "Lazar")
```

After [set](./set.md) function call in your `console` will appear two strings "Viraj" and "Lazar". First is a current value of state, and the second string is previous.

Store abstraction give possibilities for connect your data to React component.

```typescript
const Name = () => {
  useStore(name);
  return <p>Name: {name.state}</p>
}
```
