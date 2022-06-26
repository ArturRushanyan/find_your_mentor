const express = require('express');

const authentication = require('../../middlewares/isAuthenticated');
const validateWithJoi = require('../../middlewares/joiVerify');
const userController = require('./user.controller')

const router = express.Router();

router.get('/me', authentication.isAuthenticated, userController.getMe);
router.post('/me', authentication.isAuthenticated, validateWithJoi.updateUserData, userController.updateUserPersonalInformation);
router.get('/:id', authentication.isAuthenticated, userController.getUserById);
router.get('/', authentication.isAuthenticated, userController.getUsers);

module.exports = router;
