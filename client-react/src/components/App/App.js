import React, { Component } from 'react';
import styled from 'styled-components';
import { createStore } from 'optice';
import { OptuxProvider } from 'optux';
import { Button } from 'antd';
import AuthProvider from 'providers/AuthProvider';


const MachineButton = styled(Button)`
  margin: 20px;
`;

class App extends Component {

  store = createStore();

  render() {
    return (
      <OptuxProvider store={this.store}>
        <AuthProvider>
          <div>
            <MachineButton type="primary">Hi! I'am machine!</MachineButton>
          </div>
        </AuthProvider>
      </OptuxProvider>
    );
  }
}

export default App;
