'use strict';

const
	express = require('express'),
	catalogServices = require('../../services/admin/catalog');

let router = express.Router();

router.get('/get_all', catalogServices.getCatalogBooks);
router.post('/add_new', catalogServices.addNewCatalogBook);
router.post('/update', catalogServices.updateCatalogBook);
router.get('/delete', catalogServices.deleteCatalogBook);

module.exports = router;
