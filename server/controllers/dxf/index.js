'use strict';

const
	express = require('express'),
	dxfService = require('../../services/dxf');

let router = express.Router();

router.post('/convert_to_geojson', dxfService.convertDxfToGeoJSON);

module.exports = router;
