const { generateToken } = require('../auth/jwtUtils');
const loginService = require('../services/login.service');

const getToken = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginService.validateLogin(email, password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(user.email);

  return res.status(200).json({ token });
};

module.exports = { getToken };