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

const findAll = async () => {
  const users = await User.findAll();
  const usersWithoutPassword = users.map((user) => user.dataValues)
  .map(({ password, ...user }) => user);
  return usersWithoutPassword;
};

module.exports = { createUser, getUserByEmail, findAll };