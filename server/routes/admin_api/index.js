'use strict';

const
	express = require('express'),
	dashboardController = require('../../controllers/admin_api/dashboard')

let router = express.Router();

router.use('/dashboard', dashboardController);

module.exports = router;
