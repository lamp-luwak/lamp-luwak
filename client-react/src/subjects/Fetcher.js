import { mut } from "lib/core";

export class Fetcher {

  @mut loading;

  constructor(url) {
    this.url = url;
  }

  async fetch() {
    this.loading = true;
    const data = await fetch(this.url);
    this.loading = false;
    return data;
  }

}
