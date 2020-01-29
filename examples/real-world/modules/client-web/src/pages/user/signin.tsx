import React from "react";
import Head from "next/head";
// import { ComponentPrefetchContext } from "~/lib/common";
import { Link } from "~/lib/router";

class Signin extends React.Component {

  // public static async prefetch(ctx: ComponentPrefetchContext) {
  //   ctx.redirect("home");
  // }

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Signin page</title>
        </Head>
        <Link route="home">Home</Link>
        <h1>Signin page</h1>
        <form action="" method="post">
          <div>
            <input name="email" type="text" placeholder="email" />
          </div>
          <div>
            <input name="password" type="password" placeholder="password" />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <Link route="signup">Signup</Link>
      </React.Fragment>
    );
  }
}

export default Signin;
