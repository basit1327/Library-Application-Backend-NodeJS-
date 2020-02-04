'use strict';
const _ = require('lodash'),
	imageDir = 'images/',
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getCatalogBooks (req,res){
	let connection;
	try {
		let text = req.query.text || '';
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM catalog
			where 
			isbn LIKE  '%${text}%' OR 
			title LIKE  '%${text}%' OR 
			author LIKE  '%${text}%' 
			`);
			if ( _.has(dbRes,'[0].cover') ){
				dbRes.forEach(e=>{
					e.cover = imageDir+e.cover;
				});
			}
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

module.exports = {
	getCatalogBooks
};
