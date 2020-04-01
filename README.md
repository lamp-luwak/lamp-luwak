<div align="center">

# @impress/react

![@impress/react logo](https://betula.github.io/impress/logo.png)

Modular Data Flow for React

[![npm](https://img.shields.io/npm/v/@impress/react?style=flat-square)](https://www.npmjs.com/package/@impress/react) ![npm type definitions](https://img.shields.io/npm/types/@impress/react?style=flat-square) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@impress/react?style=flat-square)](https://bundlephobia.com/result?p=@impress/react) [![build status](https://img.shields.io/github/workflow/status/betula/impress/Tests?style=flat-square)](https://github.com/betula/impress/actions?workflow=Tests) [![code coverage](https://img.shields.io/coveralls/github/betula/impress?style=flat-square)](https://coveralls.io/github/betula/impress)

</div>

### Install

`npm i @impress/react`

### Basic Usage

```typescript
import { useProvide } from "@impress/react";

class User {
  store = "John";
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

### Documentation

- [Getting Started](./docs/getting-started.md)

### Examples

- [Todos in CodeSandbox](https://codesandbox.io/s/github/betula/impress/tree/master/examples/todos)

