
module.exports = ({ logger }) => {

  return {

    init({ database, user }) {
      logger('init db', database, user);
    }

  }

};
