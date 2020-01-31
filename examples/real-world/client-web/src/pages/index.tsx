import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { App } from "~/components/App";
import { Link } from "~/lib/router";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

class Index extends React.Component {

  public static async prefetch() {
    await App.prefetch();
  }

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Real World Example</title>
          <meta name="description" content="Real World @impress/react example" />
        </Head>
        <Link route="signin">Signin</Link>
        <Link route="signup">Signup</Link>
        <Title>Title</Title>
        <App />
      </React.Fragment>
    );
  }
}

export default Index;
