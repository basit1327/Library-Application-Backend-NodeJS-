'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getEBookList (req,res){
	let connection;
	try {
		let text = req.query.text || '';
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM ebook
			where 
			isbn LIKE  '%${text}%' OR 
			title LIKE  '%${text}%' OR 
			author LIKE  '%${text}%' 
			`);
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

module.exports = {
	getEBookList
};
