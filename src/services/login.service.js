const { User } = require('../models');

const validateLogin = (email, password) => {
  const user = User.findOne({
    where: { email, password },
  });
  return user;
};

module.exports = { validateLogin };