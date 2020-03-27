import React from 'react';
import { useProvide } from "./lib/useProvide";

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

export const App = () => <UserNameEditor/>;
