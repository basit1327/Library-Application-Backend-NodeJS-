'use strict';
const _ = require('lodash'),
	multer = require('multer'),
	dateUtil = require('../../../utils/date_utils'),
	storageDir = './public/files/',
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getEBookList (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM ebook order by id desc`);
			res.send({status:200,detail:'List of eBooks',data:dbRes})
		} else {
			res.send({status: 400, detail: 'something went wrong while getting eBooks'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting eBooks'});
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
}).array('book',1);

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

async function addNewBook(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadFileSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {isbn,title,author,edition,price,publish_date} = JSON.parse(req.body.data);
				if ( req.savedPic.length==0 ){
					res.send({status:400,detail:'No file attached'});
				}
				else if (!isbn || !title || !author || !edition || !price ||!publish_date) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					let bookCover = null;
					if ( req.savedPic.length>0){
						bookCover = req.savedPic[0];
					}
					addNewBookWithDetail(isbn,title,author,edition,price,publish_date,req.savedPic[0],res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function addNewBookWithDetail (isbn,title,author,edition,price,publishDate,file,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO ebook 
			(isbn,title,author,edition,price,file,publish_date,added_at)
			VALUES('${isbn}','${title}','${author}','${edition}','${price}','${file}','${publishDate}','${new Date().getTime()}')
			`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book added'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while adding book'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while adding book'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while adding book'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


async function updateBook(req,res) {
	req.savedPic = [];  // multer will push saved images in this array attached with req
	uploadFileSetting(req,res, (err)=> {
		if (err) {
			res.send({status:400,detail:err});
		}
		else {
			try {
				let {id,isbn,title,author,edition,price,publish_date,file} = JSON.parse(req.body.data);
				if ( req.savedPic.length>0 ){
					file = req.savedPic[0];
				}
				if (!id || !isbn || !title || !author || !edition || !price ||!publish_date ||!file) { // If No Form is submitted
					res.send({status:400,detail:'Please provide all details'});
				}
				else {
					updateBooksWithDetail(id, isbn,title,author,edition,price,publish_date,file,res);
				}
			}
			catch (e) {
				res.send({status:400,detail:'Something went wrong'});
				console.log(e);
			}
		}
	});
}

async function updateBooksWithDetail (id,isbn,title,author,edition,price,publishDate,file,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE ebook 
			SET isbn = '${isbn}',
			title = '${isbn}',
			author = '${author}',
			edition = '${edition}',
			price = '${price}',
			publish_date = '${publishDate}',
			file = '${file}'
			WHERE id=${id}`);

			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book detail has been updated'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while updating book'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while updating book'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while updating book'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


async function deleteBook(req,res) {
	let id = req.query.id;
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`DELETE FROM ebook WHERE id=${id}`);
			if ( dbRes.affectedRows ){
				res.send({status:200,detail:'Book deleted'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while deleting book'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while deleting book'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while deleting book'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


module.exports = {
	getEBookList,
	addNewBook,
	updateBook,
	deleteBook
};
