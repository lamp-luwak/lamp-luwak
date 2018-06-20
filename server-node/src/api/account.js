const
  nanoid = require('nanoid')
  ;

module.exports = ({ db }) => {
  return {

    async createAccountToken() {
      const token = nanoid();
      await db.run('INSERT INTO tokens VALUES (:token)', { token });
      return token;
    }

  };
};
