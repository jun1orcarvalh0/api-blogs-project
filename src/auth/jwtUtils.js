const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (data) => {
  const payload = jwt.sign({ data }, secret, jwtConfig);

  return payload;
};

module.exports = { generateToken };