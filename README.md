<div align="center">

# lamp-luwak

> `lamp-luwak` is no longer maintained. Please use [remini](https://github.com/betula/remini) or [use-between](https://github.com/betula/use-between) instead of.

![lamp-luwak logo](./logo-sm.png)

Flexible state management for React

[![npm](https://img.shields.io/npm/v/lamp-luwak?style=flat-square)](https://www.npmjs.com/package/lamp-luwak) ![npm type definitions](https://img.shields.io/npm/types/lamp-luwak?style=flat-square) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/lamp-luwak?style=flat-square)](https://bundlephobia.com/result?p=lamp-luwak) [![build status](https://img.shields.io/github/workflow/status/betula/lamp-luwak/Tests?style=flat-square)](https://github.com/betula/lamp-luwak/actions?workflow=Tests) [![code coverage](https://img.shields.io/coveralls/github/betula/lamp-luwak?style=flat-square)](https://coveralls.io/github/betula/lamp-luwak)

</div>

### Introduction

Multistore state management with service ideology and module architecture for React. You can organize the code of your application by service-stores. Single instantiated instances of classes or function factory with a store inside at any place of your app code.

- Service-oriented and multistore architecture
- Update view components only dependent of changed stores
- No use Context API inside
- TypeScript supported
- Lightweight (~3Kb)

### Install

```bash
npm i --save lamp-luwak
# or
yarn add lamp-luwak
```

### Basic Usage

```typescript
import React from 'react';
import { set, useService } from 'lamp-luwak';

class CounterService {
  state = 0; // Initial state
  increment() {
    set(this, (state) => state + 1);
  }
  decrement() {
    set(this, (state) => state - 1);
  }
}

const Counter = () => {
  const counter = useService(CounterService);
  return (
    <>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={() => counter.decrement()}>-</button>
      <p>Counter: {counter.state}</p>
    </>
  )
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/examples/basic-usage)

### Documentation

- [Getting Started](./docs/getting-started.md)
- [Core Concepts](./docs/core-concepts.md)
- [API Reference](./docs/api-reference.md)

[The Russian article](https://habr.com/ru/post/497572/)

### Examples

- [Todos on CodeSandbox](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/examples/todos)
- [Server side rendering example](https://github.com/betula/lamp-luwak/tree/master/examples/ssr)

### License

Lamp Luwak is [MIT licensed](./LICENSE).
