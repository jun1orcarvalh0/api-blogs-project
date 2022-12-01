const { generateToken } = require('../auth/jwtUtils');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userExists = await userService.getUserByEmail(email);

  if (userExists) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUser = await userService.createUser({ displayName, email, password, image });

  const token = generateToken(newUser);

  return res.status(201).json({ token });
};

const getUsers = async (req, res) => {
  const users = await userService.findAll();

  return res.status(200).json(users);
};

module.exports = { createUser, getUsers };