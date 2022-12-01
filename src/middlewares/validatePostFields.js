const validatePostFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const validation = title && content && categoryIds;

  if (!validation) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = validatePostFields;