'use strict';

const
	express = require('express'),
	dxfService = require('../../services/dxf');

let router = express.Router();

router.post('/convert_to_geojson', dxfService.convertDxfToGeoJSON);
router.post('/geojson_of_selected_layers', dxfService.layerFilterGeoJSONFile);

module.exports = router;
