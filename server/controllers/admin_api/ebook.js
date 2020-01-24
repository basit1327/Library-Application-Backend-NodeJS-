'use strict';

const
	express = require('express'),
	eBookServices = require('../../services/admin/ebook');

let router = express.Router();

router.get('/get_all', eBookServices.getEBookList);
router.post('/add_new', eBookServices.addNewBook);
router.post('/update', eBookServices.updateBook);
router.get('/delete', eBookServices.deleteBook);

module.exports = router;
