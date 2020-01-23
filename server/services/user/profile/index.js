'use strict';
const _ = require('lodash'),
	imageDir = 'images/',
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function updatePassword (req,res){
	let newPassword = req.body.newPassword;
	if(!newPassword){
		res.send({status: 400, detail: 'invalid request'});
		return;
	}
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE user_account SET password = '${newPassword}' WHERE (id = '${req.userId}')`);
			if ( _.has(dbRes,'affectedRows') ){
				res.send({status:200,detail:'Password has been updated'})
			}
			else {
				res.send({status: 400, detail: 'something went wrong while updating password'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while updating password'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while updating password'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

module.exports = {
	updatePassword
};
