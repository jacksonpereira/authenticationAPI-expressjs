const User = require("../domains/user")();

module.exports = () => {
  return {
    find: query => {
      // return User.findOne(query);
      return new Promise((resolve, reject) => {
        User.findOne(query)
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    create: user => {
      return new Promise((resolve, reject) => {
        resolve(User.create(user));
        reject({});
      });
    }
  };
};