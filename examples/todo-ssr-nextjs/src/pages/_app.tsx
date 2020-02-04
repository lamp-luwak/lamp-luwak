import "todomvc-app-css/index.css";
import { serialize, unserialize, zone, cleanup } from "@impress/react";

const SerializedDataKey = "__SERIALIZED_DATA__";

export default function App({ Component, pageProps }: any) {
  if (!(process as any).browser) {
    cleanup();
  }
  if (pageProps[SerializedDataKey]) {
    unserialize(pageProps[SerializedDataKey]);
  }
  return <Component {...pageProps} />
}

App.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    await zone(async () => {
      pageProps = await Component.getInitialProps(ctx) || {};
      (pageProps as any)[SerializedDataKey] = serialize();
    });
  }
  return { pageProps };
};
