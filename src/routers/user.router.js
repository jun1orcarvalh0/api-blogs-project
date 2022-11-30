const express = require('express');
const userController = require('../controllers/user.controller');
const validateCreateUserFields = require('../middlewares/validateCreateUserFields');

const router = express.Router();

router.post('/', validateCreateUserFields, userController.createUser);

module.exports = router;