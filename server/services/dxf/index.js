'use strict';
const multer = require('multer'),
	fs = require('fs'),
	md5 = require('md5'),
	storageDir = './public/files/dxf',
	storageDirGeoJSON = './public/files/geojson/',
	showOutput = false,
	colors = require('colors'),
	{ exec } = require("child_process");

const fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, storageDir)
	},
	filename: function (req, file, cb) {
		file.savedName = md5(new Date().getTime())+'.dxf';
		req.savedFile = file.savedName;
		cb(null, file.savedName);
	}
}); // dxf file storage

const uploadFileSetting = multer({
	storage: fileStorage
	, fileFilter: function (req, file, callback) {
		if (!file || file == undefined) {
			return callback(new Error('No file Attached'), false)
		} else {
			callback(null, true)
		}
	}
}).single('designFile');

async function convertDxfToGeoJSON(req,res) {
	req.savedFile = null;
	uploadFileSetting(req,res, async (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				if ( !req.savedFile ){
					res.send({status:400,detail:'No file attached'});
				}
				else {
					console.log(`File is saved, processing started`);
					let result = await commandExecutor(`ogr2ogr -f GeoJSON -s_srs epsg:2157 -t_srs epsg:4326 ${storageDirGeoJSON + req.savedFile.replace('.dxf','')}.geojson ${storageDir + '/' + req.savedFile}`,'dxfToGeoJSON')
					if(result){
						writeSuccessExecution('GeoJSON Created for '+req.savedFile)
					}
					let jsonData = await readLayerFromGeoJSONFile(`${storageDirGeoJSON + req.savedFile.replace('.dxf','')}.geojson`)
					res.send({
						status:200,
						message: 'DXF to GeoJSON conversion succeed',
						data: {
							fileName: req.savedFile.replace('.dxf','')+'.json',
							layers: jsonData
						}
					})
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

function writeErrorLog(errorIn, stackTrace){
	console.log('----------------------- Error Begin -----------------------'.red)
	console.log(`Error in: ${errorIn}`.red)
	console.log(stackTrace)
	console.log('----------------------- Error End -----------------------'.red)
}

function writeSuccessExecution(message){
	console.log(`✓ Successfully ${message}`.green)
}

async function commandExecutor(command,name){
	return new Promise((resolve) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				writeErrorLog(name,error.message)
				resolve(false)
			}
			else if (stderr) {
				writeErrorLog(`${name}:stderr`,stderr)
				resolve(false)
			}
			else {
				if(showOutput){
					console.log(`-------- OUTPUT FOR ${name} BEGIN --------`)
					console.log(`stdout: ${stdout}`);
					console.log(`-------- OUTPUT FOR ${name} END --------`)
				}
				resolve(true)
			}
		});
	})
}

async function readLayerFromGeoJSONFile(filePath){
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8' , (err, data) => {
			if (err) {
				console.error(err)
				reject('Failed to read geojson file');
			}
			else {
				let jsonData = JSON.parse(data);
				let features = jsonData.features;
				let layersSet = new Set();
				features.map(e=>{
					layersSet.add(e.properties.Layer)
				})
				resolve(Array.from(layersSet));
			}
		})
	})
}

module.exports = {
	convertDxfToGeoJSON
};
