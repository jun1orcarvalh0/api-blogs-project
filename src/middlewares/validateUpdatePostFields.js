const validateUpdatePostFields = (req, res, next) => {
  const { title, content } = req.body;
  const validation = title && content;

  if (!validation) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = validateUpdatePostFields;