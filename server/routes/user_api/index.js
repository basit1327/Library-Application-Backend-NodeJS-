'use strict';

const
	express = require('express'),
	eBookController = require('../../controllers/user_api/ebook'),
	paperController = require('../../controllers/user_api/paper'),
	catalogController = require('../../controllers/user_api/catalog'),
	roomBookingController = require('../../controllers/user_api/room_booking'),
	profileController = require('../../controllers/user_api/profile')

let router = express.Router();

router.use('/ebook', eBookController);
router.use('/paper', paperController);
router.use('/catalog', catalogController);
router.use('/profile', profileController);
router.use('/room_booking', roomBookingController);

module.exports = router;
