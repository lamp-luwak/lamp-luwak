const
  App = require('./libs/App')
;

module.exports = async ({ server, db }) => {
  return await App(__dirname, {
    server,
    db
  });
};
