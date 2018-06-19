import React from 'react';
import styled from 'styled-components';
import { subscribe, inject } from 'lib/core';
import { User } from 'subjects/User';
import { Account } from 'subjects/Account';
import { Button } from 'antd';
import { FetcherLoading } from '../FetcherLoading/FetcherLoading';


const MachineButton = styled(Button)`
  margin: 20px;
`;

@subscribe
export class App extends React.Component {

  @inject(User) user;
  @inject(Account) account;

  constructor() {
    super();
    this.account.fetcher.fetch();
  }

  render() {
    return (
      <FetcherLoading fetcher={this.account.fetcher}>
        <div>
          hello {(this.user || {}).name}
          <br />
          <input onInput={(e) => this.user.setName(e.target.value)} />
          <br />
          Token: {this.account.token}
          <br />
          <MachineButton type="primary">Hi! I'am machine!</MachineButton>
        </div>
      </FetcherLoading>
    );
  }
}
