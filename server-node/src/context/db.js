const
  Database = require('better-sqlite3')
;

module.exports = () => {
  let db;

  return {

    init({ filename }) {
      db = new Database(filename);
    },

    async run(sqlText, params = {}) {
      return db.prepare(sqlText).run(params);
    }

  };
};
