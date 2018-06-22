import { mut, inject } from 'lib/core';
import { fetchJson } from 'lib/fetch';
import { Config } from './Config';
import { message } from 'antd';

export const FetcherStatus = {
  Progress: 1,
  Ok: 2,
  Fail: 3
}

export class Fetcher {
  @inject(Config) config;

  @mut status;

  constructor(url, ok, fail) {
    this.url = url;
    this.ok = ok;
    this.fail = fail;
  }

  async fetch() {
    this.status = FetcherStatus.Progress;
    try {
      const data = await fetchJson(this.config.get('api-host') + this.url);
      const result = this.ok && this.ok(data);
      this.status = FetcherStatus.Ok;
      return result;
    }
    catch(error) {
      if (this.fail) {
        const result = this.fail(error);
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
