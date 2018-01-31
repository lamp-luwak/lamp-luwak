
module.exports = ({ logger }) => {

  return {

    init({ port, hostname }) {
      logger('init server', port, hostname);
    }

  }

};
