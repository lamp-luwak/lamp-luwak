import React from "react";
import Head from "next/head";
import { Link } from "~/lib/router";

class Signup extends React.Component {

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Signup page 222</title>
        </Head>
        <Link route="home">Home</Link>
        <h1>Signup page</h1>
        <Link route="signin">Signin</Link>
      </React.Fragment>
    );
  }
}

export default Signup;
