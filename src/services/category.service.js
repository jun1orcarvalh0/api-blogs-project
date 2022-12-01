const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const verifyCategoriesId = async (categoryIds) => {
  const categories = await Category.findAll({
    where: {
      id: categoryIds,
    },
  });

  if (categories.length !== categoryIds.length) {
    return null;
  }

  return categories;
};

module.exports = { createCategory, getCategories, verifyCategoriesId };