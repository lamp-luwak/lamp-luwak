import fetch from 'isomorphic-unfetch'
import { provide, register } from '@impress/react'
import { Config } from './Config'

export type Hero = {
  id: string,
  name: string,
  saying: string
}

export class HeroList {
  config = provide(Config);
  store = {
    list: [] as Hero[],
    cache: {
      expires: 0,
    },
  };

  setList(list: Hero[]) {
    this.store = {
      ...this.store,
      list
    };
  }

  getList() {
    return this.store.list;
  }

  updateCacheExpires(expires = Date.now()) {
    this.store = {
      ...this.store,
      cache: {
        ...this.store.cache,
        expires
      }
    };
  }

  async fetch() {
    if (this.store.cache.expires > Date.now()) {
      return;
    }
    const { protocol, host } = this.config.store;
    const response = await fetch(`${protocol}://${host}/api`);
    const data = await response.json();
    this.setList(data);
    this.updateCacheExpires();
  }
}
register(HeroList, 'HeroList');
