const express = require('express');
const authentiaction = require('./authentication.controller');
const validateWithJoi = require('../../middlewares/joiVerify');

const router = express.Router();

router.post('/signup', validateWithJoi.Registration, authentiaction.SignUp);

module.exports = router;
