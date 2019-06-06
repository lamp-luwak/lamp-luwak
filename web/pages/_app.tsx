import React from "react";
import NextApp, { Container, AppContext } from "next/app";
import { reset, serialize, init } from "@lib/core";

const SerializedData = "__serialized_data__";

interface SerializedDataProps {
  [SerializedData]: any;
}

export default class App extends NextApp {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    reset();
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    (pageProps as SerializedDataProps)[SerializedData] = serialize();
    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;

    if (pageProps[SerializedData]) {
      init(pageProps[SerializedData]);
    }

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
