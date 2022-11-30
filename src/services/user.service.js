const { User } = require('../models');

const createUser = async (reqBody) => {
  const user = await User.create(reqBody);
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

module.exports = { createUser, getUserByEmail };