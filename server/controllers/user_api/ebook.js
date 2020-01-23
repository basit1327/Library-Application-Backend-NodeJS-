'use strict';

const
	express = require('express'),
	eBookServices = require('../../services/user/ebook');

let router = express.Router();

router.get('/get_all', eBookServices.getEBookList);

module.exports = router;
