import React from "react";
import NextApp, { Container, AppContext } from "next/app";
import { serialize, setInitialState } from "~/lib/core";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const SerializedData = "__serialized_data__";

interface SerializedDataProps {
  [SerializedData]: any;
}

export default class App extends NextApp {
  public static async getInitialProps({ Component, ctx }: AppContext) {
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
      setInitialState(pageProps[SerializedData]);
    }

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }

}
