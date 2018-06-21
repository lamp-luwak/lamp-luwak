import Database from 'better-sqlite3';

export class Db {

  configure({ filename }) {
    this.filename = filename;
  }

  init() {
    this.db = new Database(this.filename);
  }

  async run(sqlText, params = {}) {
    return this.db.prepare(sqlText).run(params);
  }
}
