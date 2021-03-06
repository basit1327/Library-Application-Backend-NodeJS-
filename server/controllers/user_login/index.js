'use strict';

const
	express = require('express'),
	loginService = require('../../services/user/user_login');

let router = express.Router();

router.post('/login', loginService.userLogin);
router.post('/register', loginService.userRegister);
router.get('/logout', loginService.userLogOut);

module.exports = router;
