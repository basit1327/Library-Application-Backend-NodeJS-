'use strict';

const
	express = require('express'),
	dxfController = require('../../controllers/dxf');

let router = express.Router();

router.use('/dxf', dxfController);

module.exports = router;
