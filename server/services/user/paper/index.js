'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getExamPapersList (req,res){
	let connection;
	try {
		let text = req.query.text || '';
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM paper
 			where 
			subject_code LIKE  '%${text}%' OR 
			title LIKE  '%${text}%'  
 			`);
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

module.exports = {
	getExamPapersList
};
