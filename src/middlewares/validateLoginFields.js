const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;
  const validation = email && password;

  if (!validation) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = validateLoginFields;