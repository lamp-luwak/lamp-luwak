import React from 'react';
import styled from 'styled-components';
import { aware, inject } from 'lib/core';
import { User } from 'subjects/User';
import { Button } from 'antd';


const MachineButton = styled(Button)`
  margin: 20px;
`;

@aware
export class App extends React.Component {

  @inject(User) user;

  render() {
    return (


      <div>
        hello {(this.user || {}).name}
        <br />
        <input onInput={(e) => this.user.setName(e.target.value)} />
        <br />
        <MachineButton type="primary">Hi! I'am machine!</MachineButton>
      </div>
    );
  }
}

export default App;
