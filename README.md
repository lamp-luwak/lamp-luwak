<div align="center">

# @impress/react

![@impress/react logo](https://betula.github.io/impress/logo.png)

Modular Data-View binding mechanism for
[![npm](https://img.shields.io/npm/v/@impress/react?style=flat-square)](https://www.npmjs.com/package/@impress/react) ![npm type definitions](https://img.shields.io/npm/types/@impress/react?style=flat-square) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@impress/react?style=flat-square)](https://bundlephobia.com/result?p=@impress/react)

</div>

### Install

`npm i @impress/react`

### Example

```TypeScript
import { store, provide } from "@impress/react";

class User {
  @store name = "John";
}

class UserNameEditor extends React.PureComponent {
  @provide user: User;

  render() {
    const { user } = this;
    return (
      <input
        onChange={(e: any) => user.name = e.target.value}
        value={user.name}
      />
    )
  }
}
