const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/', usersController.findAllUser);
router.get('/:userId', usersController.findUserById);
router.put('/:userId', usersController.updateUserById);
router.delete('/:userId', usersController.deleteUserById);

module.exports = router;