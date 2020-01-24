'use strict';
const _ = require('lodash'),
	imageDir = 'images/',
	storageDir = './public/images/',
	dateUtil = require('../../../utils/date_utils'),
	multer = require('multer'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getCatalogBooks (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM catalog`);
			res.send({status:200,detail:'List of books in catalog',data:dbRes})
		} else {
			res.send({status: 400, detail: 'something went wrong while getting books in catalog'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting books in catalog'});
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

var catalogImageStorage = multer.diskStorage({
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

var uploadImageSetting = multer({
	storage : catalogImageStorage
	,fileFilter: function (req,file, callback) {
		if (!file || file==undefined) {
			return callback(new Error('No Image Attached'),false)
		}
		else {
			var fileMimeType = file.mimetype;
			if (fileMimeType !== 'image/png' && fileMimeType !== 'image/jpg' && fileMimeType !== 'image/gif' && fileMimeType !== 'image/jpeg') {
				return callback(new Error('Only images are allowed'), false)
			}
			file.extensionName = getFileExtension(fileMimeType);
			callback(null, true)
		}
	}
}).array('bookCover',1);

/**
 * @param mimeType
 * @description return extension by supplied mimetype'
 * @returns {(string)}
 */
function getFileExtension(mimeType){
	if ( mimeType=== 'image/png') {
		return '.png';
	}
	else if ( mimeType=== 'image/jpg') {
		return '.jpg';
	}
	else if ( mimeType=== 'image/gif') {
		return '.gif';
	}
	else {
		return '.jpeg';
	}
}





async function addNewCatalogBook(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadImageSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {isbn,title,author,edition,availability,rack} = JSON.parse(req.body.data);
				if (!isbn || !title || !author || !edition || !availability || !rack) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					let bookCover = null
					if ( req.savedPic.length>0){
						bookCover = req.savedPic[0];
					}
					addCatalogBooksWithDetail(isbn,title,author,edition,bookCover,rack,availability,res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function addCatalogBooksWithDetail (isbn,title,author,edition,cover,rack,availability,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO catalog 
			(isbn,title,author,edition,cover,rack_number,availability,added_at)
			VALUES('${isbn}','${title}','${author}','${edition}','${cover}','${rack}','${availability}','${new Date().getTime()}')
			`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book added to catalog'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while adding book in catalog'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while adding book in catalog'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while adding book in catalog'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function updateCatalogBook(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadImageSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {id,isbn,title,author,edition,availability,rack,cover} = JSON.parse(req.body.data);
				if (!id || !isbn || !title || !author || !edition || !availability || !rack || !cover) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					let bookCover = cover;
					if ( req.savedPic.length>0){
						bookCover = req.savedPic[0];
					}
					updateCatalogBooksWithDetail(id, isbn,title,author,edition,bookCover,rack,availability,res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function updateCatalogBooksWithDetail (id,isbn,title,author,edition,cover,rack,availability,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE catalog 
			SET isbn = '${isbn}',
			title = '${isbn}',
			author = '${author}',
			edition = '${edition}',
			cover = '${cover}',
			rack_number = '${rack}',
			availability = '${availability}',
			added_at = '${new Date().getTime()}'
			WHERE id=${id}`);

			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book detail has been updated'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while updating book in catalog'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while updating book in catalog'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while updating book in catalog'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function deleteCatalogBook(req,res) {
	let id = req.query.id;
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`DELETE FROM catalog WHERE id=${id}`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book deleted from catalog'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while deleting book from catalog'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while deleting book from catalog'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while deleting book from catalog'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


module.exports = {
	getCatalogBooks,
	addNewCatalogBook,
	updateCatalogBook,
	deleteCatalogBook
};
