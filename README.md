# @impress/react

Modular Data-View binding mechanism for React

### Install

`npm i @impress/react`

### Example

```TS
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
