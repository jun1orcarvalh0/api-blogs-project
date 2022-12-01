const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = { algorithm: 'HS256' };

const generateToken = (email, id, displayName) => {
  const payload = jwt.sign({ data: { email, id, displayName } }, secret, jwtConfig);

  return payload;
};

module.exports = { generateToken };