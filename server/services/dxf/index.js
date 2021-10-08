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
					let jsonData = await readGeoJSONFromGeoJSONFile(`${storageDirGeoJSON + req.savedFile.replace('.dxf','')}.geojson`)
					let features = jsonData.features;
					let layersSet = new Set();
					features.map(e=>{
						layersSet.add(e.properties.Layer)
					})
					res.send({
						status:200,
						message: 'DXF to GeoJSON conversion succeed',
						data: {
							fileName: req.savedFile.replace('.dxf','.geojson'),
							layers: Array.from(layersSet)
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

async function readGeoJSONFromGeoJSONFile(filePath){
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8' , (err, data) => {
			if (err) {
				console.error(err)
				reject(new Error('Failed to read geojson file, No such a file'));
			}
			else {
				let jsonData = JSON.parse(data);
				resolve(jsonData);
			}
		})
	})
}

async function layerFilterGeoJSONFile(req,res){
	try {
		let data = await readGeoJSONFromGeoJSONFile(`${storageDirGeoJSON + req.body.fileName}`)
		if(!data){
			throw new Error('Failed to read file, file not exist or corrupted')
		}
		let features = data.features;
		let requiredLayers =  req.body.layers;
		let filteredRecord = features.filter(e=>{
			return requiredLayers.indexOf(e.properties.Layer) !== -1
		})

		data.features = filteredRecord;
		res.send(data)
	}
	catch (e){
		console.log(e)
		res.send({status:400, message: e.message ? e.message : "Something went wrong..."})
	}
}

module.exports = {
	convertDxfToGeoJSON,
	layerFilterGeoJSONFile
};
