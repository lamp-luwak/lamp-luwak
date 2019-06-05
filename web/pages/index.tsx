import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { App } from "@components/App";
import styles from "./index.styles";

const Title = styled.h1`
  color: red;
`;

class Index extends React.Component {

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Index page</title>
          <meta name="description" content="description for indexing bots" />
        </Head>
        <Title>Title</Title>
        {<App />}
        <p>Hello</p>
        <button>Butt</button>
        <style jsx>{styles}</style>
        <style jsx>{`
          p {
            color: yellow;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Index;
