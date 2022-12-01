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

  if (newPost.isError) { 
    return res.status(400).json({ message: 'algo deu errado' });
  }

  return res.status(201).json(newPost);
};

const getPosts = async (req, res) => {
  const posts = await postService.findAll();

  return res.status(200).json(posts);
};
module.exports = { createPost, getPosts };