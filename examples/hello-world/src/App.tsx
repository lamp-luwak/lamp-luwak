import React from "react";
import { provide, store, Subscribe, resolve } from "@impress/react";
import "./App.css";

class User {
  @store name: string = "World";
}

class UserNameEditor extends React.Component {
  @provide(User) user: User;

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

const App: React.FC = () => {
  const user = resolve(User);
  return (
    <div className="App-box">
      <div>
        <label>Name</label> <UserNameEditor />
      </div>
      <div>
        <Subscribe to={user}>
          {() => (
            <>
              {"Hello "}
              <b>{user.name}!</b>
            </>
          )}
        </Subscribe>
      </div>
    </div>
  );
}

export default App;
