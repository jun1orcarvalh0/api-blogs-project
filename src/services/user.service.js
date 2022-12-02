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

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;
  return userWithoutPassword;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  await user.destroy();
};

module.exports = { createUser, getUserByEmail, findAll, findById, deleteUser };