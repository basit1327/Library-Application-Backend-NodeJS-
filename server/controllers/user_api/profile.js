'use strict';

const
	express = require('express'),
	profileServices = require('../../services/user/profile');

let router = express.Router();

router.post('/update_password', profileServices.updatePassword);

module.exports = router;
