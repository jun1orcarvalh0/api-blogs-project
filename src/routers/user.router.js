const express = require('express');
const userController = require('../controllers/user.controller');
// const validateUserFields = require('../middlewares/validateLoginFields');

const router = express.Router();

router.post('/', userController.createUser);

module.exports = router;