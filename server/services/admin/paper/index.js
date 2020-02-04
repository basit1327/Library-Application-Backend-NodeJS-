'use strict';
const _ = require('lodash'),
	multer = require('multer'),
	dateUtil = require('../../../utils/date_utils'),
	storageDir = './public/files/',
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getExamPapersList (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM paper`);
			res.send({status:200,detail:'List of Exam papers',data:dbRes})
		} else {
			res.send({status: 400, detail:'something went wrong while getting exam papers'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting exam papers'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


function generateRandomString(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

var fileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, storageDir)
	},
	filename: function (req, file, cb) {
		var random = generateRandomString(100) +file.extensionName;
		file.savedName = file.fieldname + random ;
		req.savedPic.push(file.savedName);
		cb(null, file.savedName);
	}
}); // catalog images storage

var uploadFileSetting = multer({
	storage : fileStorage
	,fileFilter: function (req,file, callback) {
		if (!file || file==undefined) {
			return callback(new Error('No file Attached'),false)
		}
		else {
			var fileMimeType = file.mimetype;
			if (fileMimeType !== 'application/pdf') {
				return callback(new Error('Only pdf are allowed'), false)
			}
			file.extensionName = getFileExtension(fileMimeType);
			callback(null, true)
		}
	}
}).array('paper',1);

/**
 * @param mimeType
 * @description return extension by supplied mimetype'
 * @returns {(string)}
 */
function getFileExtension(mimeType){
	if ( mimeType=== 'application/pdf') {
		return '.pdf';
	}
	else {
		return '.pdf';
	}
}

async function addNewPaper(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadFileSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {subject_code,title,semester_month,year} = JSON.parse(req.body.data);
				if ( req.savedPic.length==0 ){
					res.send({status:400,detail:'No file attached'});
				}
				else if (!subject_code || !title || !semester_month || !year ) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					addNewPaperWithDetail(subject_code,title,semester_month,year,req.savedPic[0],res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function addNewPaperWithDetail (subject_code,title,semester_month,year,file,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO paper 
			(subject_code,title,semester_month,year,file,added_at)
			VALUES('${subject_code}','${title}','${semester_month}','${year}','${file}','${new Date().getTime()}')
			`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Paper added'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while adding Paper'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while adding Paper'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while adding Paper'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}



async function updatePaper(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadFileSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {id,subject_code,title,semester_month,year,file} = JSON.parse(req.body.data);
				if ( req.savedPic.length>0 ){
					file = req.savedPic[0];
				}
				if (!id || !subject_code || !title || !semester_month || !year || !file) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					updatePaperWithDetail(id,subject_code,title,semester_month,year,file,res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function updatePaperWithDetail (id,subject_code,title,semester_month,year,file,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE paper 
			SET subject_code = '${subject_code}',
			title = '${title}',
			semester_month = '${semester_month}',
			year = '${year}',
			file = '${file}'
			WHERE id=${id}`);

			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Paper detail has been updated'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while updating Paper'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while updating Paper'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while updating Paper'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


async function deletePaper(req,res) {
	let id = req.query.id;
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`DELETE FROM paper WHERE id=${id}`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Paper deleted'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while deleting paper'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while deleting paper'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while deleting paper'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}



module.exports = {
	getExamPapersList,
	addNewPaper,
	updatePaper,
	deletePaper
};
