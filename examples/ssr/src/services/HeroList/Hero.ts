import { register } from '../../lib/core'

type Store = {
  id: string,
  name: string,
  saying: string
}

export class Hero {
  store = {
    name: '',
    saying: ''
  } as Store

  constructor(data?: any) {
    if (data) {
      this.store = data;
    }
  }
}
register("Hero", Hero);
