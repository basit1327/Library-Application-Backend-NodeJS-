'use strict';

const
	express = require('express'),
	dashboardServices = require('../../services/admin/dashboard');

let router = express.Router();

router.get('/get_stats', dashboardServices.getStats);

module.exports = router;
