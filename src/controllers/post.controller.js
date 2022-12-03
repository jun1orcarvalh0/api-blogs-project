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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const loginUser = req.user.id;

  const oldPost = await postService.findById(id); 

  if (!oldPost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (oldPost.userId !== loginUser) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const updatedPost = await postService.updatePost(title, content, id);
  
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const loginUser = req.user.id;

  const post = await postService.findById(id); 

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.userId !== loginUser) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await postService.deletePost(id);
  
  return res.status(204).end();
};

const getBySearchTerm = async (req, res) => {
  const { q } = req.query;

  console.log(q);

  if (!q) {
    const posts = await postService.findAll();
    return res.status(200).json(posts);
  }

  const postByQuery = await postService.findByQuery(q);
  return res.status(200).json(postByQuery);
  };

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, getBySearchTerm };