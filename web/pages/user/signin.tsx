import React from "react";
import Head from "next/head";
import { Link } from "~/routes";

class Signin extends React.Component {

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Signin page</title>
        </Head>
        <h1>Signin page</h1>
        <Link route="signup">Signup</Link>
      </React.Fragment>
    );
  }
}

export default Signin;
