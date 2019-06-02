import { mut, inst } from "@lib/core";
import { Fetcher } from "./Fetcher";
import { SharedValueStorage } from "./storage/SharedValueStorage";

export class Account {
  @mut public token: string;

  constructor() {
    this.storage = inst(SharedValueStorage, "account::token");
    this.token = this.storage.get();

    this.fetcher = inst(Fetcher)
      .url("/account/token")
      .ok(data => this.setToken(data.token))
      .before(next => this.token ? this.token : next());
  }

  setToken(token) {
    this.token = token;
    this.storage.set(token);
    return this.token;
  }

}
