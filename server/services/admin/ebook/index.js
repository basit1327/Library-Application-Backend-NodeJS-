'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getEBookList (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM ebook`);
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
