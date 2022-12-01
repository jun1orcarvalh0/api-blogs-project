const express = require('express');
const postController = require('../controllers/post.controller');
const validatePostFields = require('../middlewares/validatePostFields');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, validatePostFields, postController.createPost);

module.exports = router;