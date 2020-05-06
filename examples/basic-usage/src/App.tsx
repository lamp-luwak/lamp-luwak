import React from 'react';
import { set, useService } from 'lamp-luwak';

class User {
  state = 'John'; // Initial state
}

const UserNameEditor = () => {
  const user = useService(User);
  return (
    <>
      <input
        onChange={(e: any) => set(user, e.target.value)}
        value={user.state}
        autoFocus
      />
      <p>Hello {user.state}!</p>
    </>
  )
};

export const App = () => <UserNameEditor/>;
