const express = require('express');
const postController = require('../controllers/post.controller');
const validatePostFields = require('../middlewares/validatePostFields');
const validateToken = require('../middlewares/validateToken');
const validateUpdatePostFields = require('../middlewares/validateUpdatePostFields');

const router = express.Router();

router.post('/', validateToken, validatePostFields, postController.createPost);
router.put('/:id', validateToken, validateUpdatePostFields, postController.updatePost);
router.delete('/:id', validateToken, postController.deletePost);
router.get('/', validateToken, postController.getPosts);
router.get('/:id', validateToken, postController.getPostById);

module.exports = router;