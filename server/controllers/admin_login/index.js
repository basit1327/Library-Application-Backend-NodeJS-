'use strict';

const
	express = require('express'),
	loginService = require('../../services/admin/admin_login');

let router = express.Router();

router.post('/login', loginService.adminLogin);
router.get('/logout', loginService.adminLogOut);

module.exports = router;
