<div align="center">

# @impress/react

![@impress/react logo](https://betula.github.io/impress/logo.png)

Modular state management for React

[![npm](https://img.shields.io/npm/v/@impress/react?style=flat-square)](https://www.npmjs.com/package/@impress/react) ![npm type definitions](https://img.shields.io/npm/types/@impress/react?style=flat-square) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@impress/react?style=flat-square)](https://bundlephobia.com/result?p=@impress/react) [![build status](https://img.shields.io/github/workflow/status/betula/impress/Tests?style=flat-square)](https://github.com/betula/impress/actions?workflow=Tests) [![code coverage](https://img.shields.io/coveralls/github/betula/impress?style=flat-square)](https://coveralls.io/github/betula/impress)

</div>

### Install

`npm i @impress/react`

### Basic Usage

```typescript
import { useProvide } from '@impress/react';

class User {
  store = 'John';
}

const UserNameEditor = () => {
  const user = useProvide(User);
  return (
    <input
      onChange={(e: any) => user.store = e.target.value}
      value={user.store}
    />
  )
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/impress/tree/master/examples/basic-usage)

### Introduction

Multistore state management with service ideology and module architecture for React. You can organize the code of your application by service-stores. Single instantiated classes with a store inside at any place of your app code.

- Service-oriented and multistore architecture
- Update view components only dependent of changed stores
- Data flow instruments
- Server side rendering (SSR)
- Possibility to make independent modules
- Minimal abstraction
- Lightweight (~2Kb)
- Minimum init page CPU time
- Designed by React hooks coding style

### Documentation

- [Getting Started](./docs/getting-started.md)

### Examples

- [Todos on CodeSandbox](https://codesandbox.io/s/github/betula/impress/tree/master/examples/todos)
- [Server side rendering example](https://github.com/betula/impress/tree/master/examples/ssr)

### License

Impress is [MIT licensed](./LICENSE).
