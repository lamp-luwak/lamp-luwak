import React from "react";
import NextApp, { Container, AppContext } from "next/app";
import { serialize, setInitialState, zone } from "~/lib/core";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const SerializedData = "__SERIALIZED_DATA__";

export default class App extends NextApp {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const prefetch = (Component as any).prefetch;
    if (prefetch) {
      (pageProps as any)[SerializedData] = await zone(async () => {
        await prefetch();
        return serialize();
      });
    }
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
