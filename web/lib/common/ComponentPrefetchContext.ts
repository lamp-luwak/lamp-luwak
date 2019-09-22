import { ServerResponse, IncomingMessage } from "http";
// import { findByName } from "~/lib/router";

interface SourceContext {
  req?: IncomingMessage;
  res?: ServerResponse;

  pathname: string;
  query: any;

  asPath?: string;
}

export class ComponentPrefetchContext {
  public query: any;
  public pathname: string;

  constructor(private ctx: SourceContext) {
    const { query, pathname } = this.ctx;

    this.query = query;
    this.pathname = pathname;
  }

  // public redirect(name: string) {
  //   const pathname = findByName(name).toPath();
  //   if (this.pathname === pathname) {
  //     return;
  //   }
  //   const { res } = this.ctx;
  //   if (res) {
  //     res.setHeader("Redirect", pathname);
  //     // res.end();
  //   }
  // }
}
