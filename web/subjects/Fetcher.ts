import { mut, inject } from "@lib/core";
import { fetchJson } from "@lib/fetch";
import { Config } from "./Config";
import { message } from "antd";

export const FetcherStatus = {
  Progress: 1,
  Ok: 2,
  Fail: 3
}

export class Fetcher {
  @inject(Config) config;

  @mut status;

  url(url) {
    this._url = url;
    return this;
  }

  ok(fn) {
    this._ok = fn;
    return this;
  }

  fail(fn) {
    this._fail = fn;
    return this;
  }

  before(fn) {
    this._before = fn;
    return this;
  }

  async fetch() {
    if (this._before) {
      let isStopped = true;
      const result = this._before(() => isStopped = false);
      if (isStopped) {
        this.status = FetcherStatus.Ok;
        return result;
      }
    }

    this.status = FetcherStatus.Progress;
    try {
      const data = await fetchJson(this.config.get("api-host") + this._url);
      const result = this._ok && this._ok(data);
      this.status = FetcherStatus.Ok;
      return result;
    }
    catch(error) {
      if (this._fail) {
        const result = this._fail(error);
        this.status = FetcherStatus.Fail;
        return result;
      }
      else {
        console.error(error);
        message.error(error.message);
        this.status = FetcherStatus.Fail;
      }
    }
  }

}
