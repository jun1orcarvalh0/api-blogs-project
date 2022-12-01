const categoryService = require('../services/category.service');
const postService = require('../services/post.service');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const userId = req.user.id;

  const checkCategories = await categoryService.verifyCategoriesId(categoryIds);

  if (!checkCategories) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await postService.createPost(title, content, categoryIds, userId);

  return res.status(201).json(newPost);
};

module.exports = { createPost };