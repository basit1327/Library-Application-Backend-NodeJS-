'use strict';
const _ = require('lodash'),
	md5 = require('md5'),
	auth = require('../../auth'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function userLogin (req,res){
	let connection;
	try {
		let {studentId,password} = req.body;
		if ( !studentId || !password ) {
			res.send({status:400,detail:'Invalid studentId or Password'});
			return;
		}

		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT 
				id,
				student_id,
				name
				from user_account
				where student_id = '${studentId}' AND password = '${password}'`);
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
						saveNewUserSession(hash,dbRes[0].id);
					}
				}
				else {
					res.send({status:400,detail:'studentId or password is not correct'})
				}
			} else {
				res.send({status: 400, detail: 'invalid email or password'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while trying to login'});
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

async function userRegister (req,res){
	let connection;
	try {
		let {name,studentId,password} = req.body;
		if ( !name || !studentId || !password ) {
			res.send({status:400,detail:'Invalid request'});
			return;
		}

		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO 
				user_account
				(student_id,password,name,created_at)
				VALUES (?,?,?,?)`,[studentId,password,name,new Date().getTime()]);
			if ( dbRes.affectedRows>0 ) {
				res.send({status:200,detail:'Account created, waiting to get approved'})
			} else {
				res.send({status: 400, detail: 'Oops, something went wrong'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while trying to create account'});
		}
	}
	catch (e) {
		let es = e.toString();
		if ( es.includes('Duplicate entry') ){
			res.send({status: 400, detail: 'Account with this student id is already created'});
		}
		else {
			res.send({status: 400, detail: 'something went wrong while trying to  create account'});
			console.log('Exception: ', e);
		}
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


async function userLogOut (req,res){
	let sessionData = await auth.getUserSessionDetail(req.headers.authorization);
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

async function saveNewUserSession(hash,userId){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT
			INTO user_session (hash,user_id,created_at)
			VALUES ('${hash}','${userId}','${new Date().getTime()}')`);
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
			user_session SET status = 0
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
			connection.release();
		}
	}
}


module.exports = {
	userLogin,
	userLogOut,
	userRegister
};
