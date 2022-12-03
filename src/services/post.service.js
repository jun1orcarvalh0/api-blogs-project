const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async (title, content, categoryIds, userId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t },
        );
    
      const { id } = newPost.dataValues;
    
      const arrayOfObj = categoryIds.reduce(
        (acc, curr) => [{ postId: id, categoryId: acc }, { postId: id, categoryId: curr }],
        );
    
      await PostCategory.bulkCreate(arrayOfObj, { transaction: t });
    
      return newPost;
    });
    return result;
  } catch (e) {
    console.log(e);
    return { isError: true };
  }
};

const findAll = async () => {
  const posts = await BlogPost.findAll(
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] },
    );
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] });

  if (!post) {
    return null;
  }

  return post;
};

const updatePost = async (title, content, id) => {
  const updatedPost = await BlogPost.findByPk(id, 
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
  { model: Category, as: 'categories', through: { attributes: [] } }] });
  updatedPost.title = title;
  updatedPost.content = content;
  updatedPost.updated = new Date();

  await updatedPost.save();

  return updatedPost;
};

const deletePost = async (id) => {
  const post = await BlogPost.findByPk(id);
  await post.destroy();
};

const findByQuery = async (query) => {
  const result = await BlogPost.findAll({
    where: { [Op.or]: [{ title: { [Op.like]: `%${query}%` } }, 
    { content: { [Op.like]: `%${query}%` } }] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return result;
};

module.exports = { createPost, findAll, findById, updatePost, deletePost, findByQuery };