const { BlogPost, PostCategory } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const newPost = await BlogPost.create(
    { title, content, userId, published: new Date(), updated: new Date() },
    );

  const { id } = newPost.dataValues;

  const arrayOfObj = categoryIds.reduce(
    (acc, curr) => [{ postId: id, categoryId: acc }, { postId: id, categoryId: curr }],
    );

  await PostCategory.bulkCreate(arrayOfObj);

  return newPost;
};

module.exports = { createPost };