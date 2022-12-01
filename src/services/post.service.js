const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
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

module.exports = { createPost };