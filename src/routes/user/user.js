const express = require('express');

const authentication = require('../../middlewares/isAuthenticated');
const validateWithJoi = require('../../middlewares/joiVerify');

const userController = require('./user.controller')


const router = express.Router();

router.get('/me', authentication.isAuthenticated, userController.getMe);

module.exports = router;