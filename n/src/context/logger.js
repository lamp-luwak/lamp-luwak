
module.exports = () => {

  return (...values) => {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    console.log(time, ...values);
  }

};
