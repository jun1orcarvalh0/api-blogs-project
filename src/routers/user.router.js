const express = require('express');
const userController = require('../controllers/user.controller');
const validateCreateUserFields = require('../middlewares/validateCreateUserFields');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateCreateUserFields, userController.createUser);
router.get('/', validateToken, userController.getUsers);

module.exports = router;