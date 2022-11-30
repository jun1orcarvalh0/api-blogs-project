const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (email) => {
  const payload = jwt.sign({ data: email }, secret, jwtConfig);

  return payload;
};

module.exports = { generateToken };