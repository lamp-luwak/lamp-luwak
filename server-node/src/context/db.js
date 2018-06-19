const
  Pool = require('pg').Pool
;

module.exports = () => {
  let pool;

  return {

    init({ database, user }) {
      pool = new Pool({ database, user });
    },

    async rows(...args) {
      return ( await pool.query(...args) ).rows;
    },

    async row(...args) {
      return ( ( await pool.query(...args) ).rows || [] )[0];
    }

  };
};
