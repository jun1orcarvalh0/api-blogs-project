const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const newCategory = await categoryService.createCategory(name);

  return res.status(201).json({ newCategory, name });
};

const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();

  return res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };