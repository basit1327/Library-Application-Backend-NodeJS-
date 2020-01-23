'use strict';

const
	express = require('express'),
	catalogServices = require('../../services/user/catalog');

let router = express.Router();

router.get('/get_all', catalogServices.getCatalogBooks);

module.exports = router;
