const { generateToken } = require('../auth/jwtUtils');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser({ displayName, email, password, image });

  if (!newUser) {
    return res.status(400).json({ message: 'User already registered' });
  }

  const token = generateToken(newUser);

  return res.status(200).json({ token });
};

module.exports = { createUser };