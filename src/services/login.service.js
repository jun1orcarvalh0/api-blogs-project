const { User } = require('../models');

const validateLogin = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });
  return user;
};

module.exports = { validateLogin };