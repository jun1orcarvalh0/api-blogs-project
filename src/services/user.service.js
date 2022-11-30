const { User } = require('../models');

const createUser = async (reqBody) => {
  const user = await User.create(reqBody);
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

module.exports = { createUser };