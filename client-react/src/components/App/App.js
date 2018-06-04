import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const BlackButton = styled(Button)`
  color: black;
`;


class App extends Component {

  render() {
    return (
      <div>
        <BlackButton type="primary">Primary</BlackButton>
      </div>
    );
  }
}

export default App;
