const express = require('express');
const categoryController = require('../controllers/category.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, categoryController.createCategory);
router.get('/', validateToken, categoryController.getCategories);

module.exports = router;