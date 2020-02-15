'use strict';
const _ = require('lodash'),
	md5 = require('md5'),
	auth = require('../../auth'),
	{invalidQueryResult,failedToGetDatabaseConnection} = require('../../../../configs/res_codes'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function adminLogin (req,res){
	let connection;
	try {
		let {staffId,password} = req.body;
		if ( !staffId || !password ) {
			res.send({status:400,detail:'Invalid staffId or Password'});
			return;
		}

		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT 
				id,
				staff_id,
				name
				from admin_account
				where staff_id = ? AND password = ?`,[staffId,password]);
			if ( _.has(dbRes, '[0].id') ) {
				if ( _.has(dbRes, '[0].id') ) {
					if ( dbRes[0].status==0 ){
						res.send({status:400,detail:'Account has been deleted'});
					}
					else {
						let hash = md5(new Date()+'IUKL');
						res.send({
							status:200,
							detail:'logged in successfully',
							sessionId:hash,
							name:dbRes[0].name
						});
						saveNewAdminSession(hash,dbRes[0].id);
					}
				}
				else {
					res.send({status:400,detail:'StaffId or password is not correct'})
				}
			} else {
				res.send({status: 400, detail: invalidQueryResult.description});
			}
		} else {
			res.send({status: 400, detail: failedToGetDatabaseConnection.description});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while trying to login'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function adminLogOut (req,res){
	let sessionData = await auth.getAdminSessionDetail(req.headers.authorization);
	if(sessionData instanceof Error){
		res.send({status:440,detail:sessionData.message});
	}
	else if ( !sessionData ){
		res.send({status:440,detail:'Your session has been expired'});
	}
	else if ( _.has(sessionData,'sessionId' )) {
		res.send({status:200,detail:'logged out successfully'});
		deleteSession(sessionData.sessionId);
	}
	else {
		res.send({status:400,detail:'invalid request'});
	}
}

async function saveNewAdminSession(hash,adminId){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT
			INTO admin_session (hash,admin_id,created_at)
			VALUES ('${hash}','${adminId}','${new Date().getTime()}')`);
			if ( _.has(dbRes, 'insertId') ) {
				console.log('Session Saved successfully');
			} else {
				throw 'no data in dbRes after add new session';
			}
		}
		else {
			throw 'failed to get session db connection while saving new session';
		}
	}
	catch (e) {
		console.log('Exception: ', e);
	} finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function deleteSession(sessionId){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE
			admin_session SET status = 0
			WHERE id=${sessionId}`);
			if ( _.has(dbRes, 'affectedRows') ) {
				console.log('Session deleted successfully');
			} else {
				throw 'no rows in dbRes after delete session';
			}
		}
		else {
			throw 'failed to get session db connection while deleting session';
		}
	}
	catch (e) {
		console.log('Exception: ', e);
	} finally {
		if ( connection ) {
			connection.end();
		}
	}
}


module.exports = {
	adminLogin,
	adminLogOut
};
