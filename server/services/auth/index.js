'use strict';
const _ = require('lodash'),
	sessionDBConnection = require('../../dataaccesss/dbconnection').DbConnection;

async function getAdminSessionDetail(sessionHash){
	let connection;
	try {
		connection = await new sessionDBConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT
			id,hash,admin_id,created_at,status
			FROM admin_session where hash='${sessionHash}' and status=1`);

			if ( _.has(dbRes, '[0].id') ) {
				if ( _.has(dbRes,'[0].id') ) {
					if ( dbRes[0].hash==sessionHash){
						return {
							adminId:dbRes[0].admin_id,
							sessionId:dbRes[0].id
						}
					}
				}else{
					return null;
				}
			} else {
				return null;
			}
		}
		else {
			return new Error('failed to check session');
		}
	}
	catch (e) {
		console.log('Exception: ', e);
		return new Error('failed to check session');
	} finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function getUserSessionDetail(sessionHash){
	let connection;
	try {
		connection = await new sessionDBConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT
			id,hash,user_id,created_at,status
			FROM user_session where hash='${sessionHash}' and status!=0`);

			if ( _.has(dbRes, '[0].id') ) {
				if ( _.has(dbRes,'[0].id') ) {
					if ( dbRes[0].hash==sessionHash){
						return {
							userId:dbRes[0].user_id,
							sessionId:dbRes[0].id
						}
					}
				}else{
					return null;
				}
			} else {
				return null;
			}
		}
		else {
			return new Error('failed to check session');
		}
	}
	catch (e) {
		console.log('Exception: ', e);
		return new Error('failed to check session');
	} finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function authenticateUserSession(req,res,next){
	let sessionHash = req.headers.authorization;
	if ( !sessionHash ){
		res.send({status:440,detail:'session expire'});
		return;
	}
	let connection;
	try {
		connection = await new sessionDBConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT
			id,hash,user_id,created_at,status
			FROM user_session where hash='${sessionHash}' and status=1`);

			if ( _.has(dbRes, '[0].id') ) {
				if ( _.has(dbRes,'[0].id') ) {
					if ( dbRes[0].hash==sessionHash){
						req.userId = dbRes[0].user_id;
						next();
					}
				}else{
					res.send({status:440,detail:'session expire'});
				}
			} else {
				res.send({status:440,detail:'session expire'});
			}
		}
		else {
			res.send({status:440,detail:'session expire'});
		}
	}
	catch (e) {
		console.log('Exception: ', e);
		res.send({status:440,detail:'session expire'});
	} finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function authenticateAdminSession(req,res,next){
	let sessionHash = req.headers.authorization;
	if ( !sessionHash ){
		res.send({status:440,detail:'session expire'});
		return;
	}
	let connection;
	try {
		connection = await new sessionDBConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT
			id,hash,admin_id,created_at,status
			FROM admin_session where hash='${sessionHash}' and status=1`);

			if ( _.has(dbRes, '[0].id') ) {
				if ( _.has(dbRes,'[0].id') ) {
					if ( dbRes[0].hash==sessionHash){
						req.adminId = dbRes[0].admin_id;
						next();
					}
				}else{
					res.send({status:440,detail:'session expire'});
				}
			} else {
				res.send({status:440,detail:'session expire'});
			}
		}
		else {
			res.send({status:440,detail:'session expire'});
		}
	}
	catch (e) {
		console.log('Exception: ', e);
		res.send({status:440,detail:'session expire'});
	} finally {
		if ( connection ) {
			connection.release();
		}
	}
}


module.exports = {
	getAdminSessionDetail,
	getUserSessionDetail,
	authenticateUserSession,
	authenticateAdminSession
};
