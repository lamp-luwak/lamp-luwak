import React from "react";
import styled from "styled-components";
import Head from "next/head";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

class Index extends React.Component {

  public render() {
    return (
      <>
        <Head>
          <title>TODO SSR example</title>
        </Head>
        <Title>TODO SSR example</Title>
      </>
    );
  }
}

export default Index;
