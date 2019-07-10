import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { App } from "~/components/App";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

// tslint:disable-next-line: max-classes-per-file
class Index extends React.Component {

  public static async getInitialProps() {
    return App.prefetch();
  }

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Welcome</title>
          <meta name="description" content="description for indexing bots" />
        </Head>
        <Title>Title</Title>
        <App />
      </React.Fragment>
    );
  }
}

export default Index;
