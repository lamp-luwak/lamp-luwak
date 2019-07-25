import React from "react";
import Head from "next/head";
import { Link } from "~/routes";

class Signup extends React.Component {

  public render() {
    return (
      <React.Fragment>
        <Head>
          <title>Signup page</title>
        </Head>
        <h1>Signup page</h1>
        <Link route="signin">Signin</Link>
      </React.Fragment>
    );
  }
}

export default Signup;
