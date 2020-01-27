import React from "react";
import NextApp, { AppContext } from "next/app";
import { serialize, unserialize, zone } from "~/lib/core";
import { ComponentPrefetchContext } from "~/lib/common";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

const SerializedDataKey = "__SERIALIZED_DATA__";

export default class App extends NextApp {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const prefetch = (Component as any).prefetch;
    if (prefetch) {
      await zone(async () => {
        await prefetch(new ComponentPrefetchContext(ctx));
        (pageProps as any)[SerializedDataKey] = serialize();
      });
    }
    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;

    if (pageProps[SerializedDataKey]) {
      unserialize(pageProps[SerializedDataKey]);
    }

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

}
