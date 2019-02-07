const express = require('express');
const router = express.Router();
const Users = require('../Controller/user');

router.post('/login', Users.login);

router.post('/register', Users.register);

module.exports = router;