'use strict';

const
	express = require('express'),
	catalogController = require('../../controllers/admin_api/catalog'),
	eBookController = require('../../controllers/user_api/ebook'),
	paperController = require('../../controllers/user_api/paper'),
	dashboardController = require('../../controllers/admin_api/dashboard')

let router = express.Router();

router.use('/dashboard', dashboardController);
router.use('/catalog', catalogController);
router.use('/ebook', eBookController);
router.use('/paper', paperController);

module.exports = router;
