
module.exports = ({ route, api }) => {

  route('GET', '/account/token', async () => {
    const token = await api.createAccountToken();
    return { token };
  });

};
