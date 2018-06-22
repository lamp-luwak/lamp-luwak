import sqlite from 'sqlite';

export class Db {

  configure({ filename }) {
    this.filename = filename;
  }

  async init() {
    this.db = await sqlite.open(this.filename);
    await this.db.migrate({ force: 'last' });
  }

  async run(query, params = {}, paramPrefix = ':') {
    const prefixiedParams = {};
    for (const name of Object.keys(params)) {
      const namePrefix = name[0] !== paramPrefix ? paramPrefix : '';
      prefixiedParams[namePrefix + name] = params[name];
    }
    return this.db.run(query, prefixiedParams);
  }
}
