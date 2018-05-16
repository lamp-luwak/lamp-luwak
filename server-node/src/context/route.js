
module.exports = ({ server }) => {
  return server.route.bind(server);
};
