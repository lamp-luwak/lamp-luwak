import { mut, inject } from 'lib/core';
import { fetchJson } from 'lib/fetch';
import { Config } from './Config';

export class Fetcher {
  @inject(Config) config;

  @mut loading;

  constructor(url, ok, fail) {
    this.url = url;
    this.ok = ok;
    this.fail = fail;
  }

  async fetch() {
    this.loading = true;
    try {
      const data = await fetchJson(this.config.get('api-host') + this.url);
      this.loading = false;
      return this.ok && this.ok(data);
    } catch(error) {
      this.loading = false;
      if (this.fail) {
        return this.fail(error);
      } else {
        console.error(error);
      }
    }
  }

}
