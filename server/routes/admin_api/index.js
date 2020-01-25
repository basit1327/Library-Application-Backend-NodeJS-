'use strict';

const
	express = require('express'),
	catalogController = require('../../controllers/admin_api/catalog'),
	eBookController = require('../../controllers/admin_api/ebook'),
	paperController = require('../../controllers/admin_api/paper'),
	accountController = require('../../controllers/admin_api/user_management'),
	dashboardController = require('../../controllers/admin_api/dashboard')

let router = express.Router();

router.use('/dashboard', dashboardController);
router.use('/catalog', catalogController);
router.use('/ebook', eBookController);
router.use('/paper', paperController);
router.use('/account', accountController);

module.exports = router;
