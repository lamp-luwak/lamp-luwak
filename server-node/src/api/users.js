
module.exports = ({ db }) => {
  return {

    async getUserByEmail(email) {
      return await db.row('SELECT * FROM "users" WHERE email=$1', [ email ]);
    }

  };
};
