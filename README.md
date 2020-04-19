<div align="center">

# lamp-luwak

![lamp-luwak logo](https://betula.github.io/lamp-luwak/logo-sm.png)

Flexible state management for React

[![npm](https://img.shields.io/npm/v/lamp-luwak?style=flat-square)](https://www.npmjs.com/package/lamp-luwak) ![npm type definitions](https://img.shields.io/npm/types/lamp-luwak?style=flat-square) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/lamp-luwak?style=flat-square)](https://bundlephobia.com/result?p=lamp-luwak) [![build status](https://img.shields.io/github/workflow/status/betula/lamp-luwak/Tests?style=flat-square)](https://github.com/betula/lamp-luwak/actions?workflow=Tests) [![code coverage](https://img.shields.io/coveralls/github/betula/lamp-luwak?style=flat-square)](https://coveralls.io/github/betula/lamp-luwak)

</div>

### Introduction

Multistore state management with service ideology and module architecture for React. You can organize the code of your application by service-stores. Single instantiated instances of classes or function factory with a store inside at any place of your app code.

- Service-oriented and multistore architecture
- Update view components only dependent of changed stores
- Lightweight (~2Kb)
- Minimum init page CPU time
- TypeScript supported
- Server side rendering (SSR)

### Install

```bash
npm i --save lamp-luwak
# or
yarn add lamp-luwak
```

### Basic Usage

```typescript
import { useProvide, get, set } from 'lamp-luwak';

class User {
  store = 'John';
}

const UserNameEditor = () => {
  const user = useProvide(User);
  return (
    <input
      onChange={(e) => set(user, e.target.value)}
      value={get(user)}
    />
  )
};
```
[![Example on codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/examples/basic-usage)

### Documentation

- [Getting Started](./docs/getting-started.md)
- [Core Concepts](./docs/core-concepts.md)
- [API Reference](./docs/api-reference.md) - coming soon

[The Russian article.](https://github.com/betula/lamp-luwak-article-1/blob/master/README.md)

### Examples

- [Todos on CodeSandbox](https://codesandbox.io/s/github/betula/lamp-luwak/tree/master/examples/todos)
- [Server side rendering example](https://github.com/betula/lamp-luwak/tree/master/examples/ssr)

### License

Lamp Luwak is [MIT licensed](./LICENSE).
