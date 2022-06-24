const express = require('express');
const authentiaction = require('./authentication.controller');
const validateWithJoi = require('../../middlewares/joiVerify');

const router = express.Router();

router.post('/signup', validateWithJoi.Registration, authentiaction.SignUp);
router.post('/login', validateWithJoi.Login, authentiaction.Login);

module.exports = router;
