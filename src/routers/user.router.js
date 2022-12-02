const express = require('express');
const userController = require('../controllers/user.controller');
const validateCreateUserFields = require('../middlewares/validateCreateUserFields');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateCreateUserFields, userController.createUser);
router.delete('/me', validateToken, userController.deleteUser);
router.get('/', validateToken, userController.getUsers);
router.get('/:id', validateToken, userController.getUser);

module.exports = router;