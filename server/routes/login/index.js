'use strict';

const
	express = require('express'),
	userLoginController = require('../../controllers/user_login'),
	adminLoginController = require('../../controllers/admin_login');

let router = express.Router();

router.use('/admin', adminLoginController);
router.use('/user', userLoginController);

module.exports = router;
