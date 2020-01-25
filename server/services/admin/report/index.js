'use strict';
const _ = require('lodash'),
	dateUtil = require('../../../utils/date_utils'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getUserReport (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT a.id,a.staff_id,a.name , a.created_at , aa.name as created_by
			FROM admin_account a 
			inner join admin_account aa
			WHERE a.created_by = aa.created_by
			AND a.status=1
			group by a.id`);
			res.send({status:200,detail:'List of admin accounts',data:dbRes})
		} else {
			res.send({status: 400, detail: 'something went wrong while getting user report'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting user report'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

module.exports = {
	getUserReport
};
