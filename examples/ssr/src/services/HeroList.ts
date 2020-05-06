import fetch from 'isomorphic-unfetch'
import { service, modify } from 'lamp-luwak'
import { Config } from './Config'

export type Hero = {
  id: string,
  name: string,
  saying: string
}

export class HeroList {
  config = service(Config);
  state = {
    list: [] as Hero[],
    cache: {
      expires: 0,
    },
  };

  setList(list: Hero[]) {
    modify(this).list = list;
  }

  getList() {
    return this.state.list;
  }

  updateCacheExpires(expires = Date.now()) {
    modify(this).cache.expires = expires;
  }

  async fetch() {
    if (this.state.cache.expires > Date.now()) {
      return;
    }
    const { protocol, host } = this.config.state;
    const response = await fetch(`${protocol}://${host}/api`);
    const data = await response.json();
    this.setList(data);
    this.updateCacheExpires();
  }
}
