'use strict';
const _ = require('lodash'),
	dateUtil = require('../../../utils/date_utils'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getAdminAccounts (req,res){
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
			res.send({status: 400, detail: 'something went wrong while getting admin accounts'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting admin accounts'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function addAdminAccounts (req,res){
	
	let {staff_id,name,password} = req.body;
	if ( !staff_id || !name ||!password || !req.adminId ){
		res.send({status: 400, detail: 'invalid request'});
		return;
	}
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`
			INSERT into admin_account (staff_id,password,name,created_by,created_at)
			VALUES ('${staff_id}','${password}','${name}','${req.adminId}','${new Date().getTime()}')
			`);
			res.send({status:200,detail:'admin account created'})
		} else {
			res.send({status: 400, detail: 'something went wrong while creating admin account'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while creating admin account'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


async function getUserAccounts (req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT s.id,student_id,s.name,s.created_at,s.status
			FROM user_account s 
			WHERE s.status!=0`);
			res.send({status:200,detail:'List of user accounts',data:dbRes})
		} else {
			res.send({status: 400, detail: 'something went wrong while getting user accounts'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting user accounts'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function addUserAccounts (req,res){
	let {student_id,name,password} = req.body;
	if ( !student_id || !name ||!password || !req.adminId ){
		res.send({status: 400, detail: 'invalid request'});
		return;
	}
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`
			INSERT into user_account (student_id,password,name,created_at)
			VALUES ('${student_id}','${password}','${name}','${new Date().getTime()}')
			`);
			res.send({status:200,detail:'user account created'})
		} else {
			res.send({status: 400, detail: 'something went wrong while creating user account'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while creating user account'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function updateUserAccounts (req,res){
	let {id,student_id,name,password,status} = req.body;
	if (!id || !student_id || !name || !status || !req.adminId ){
		res.send({status: 400, detail: 'invalid request'});
		return;
	}
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let param = '';
			if ( password ){
				param+=` password= '${password}' , `
			}
			if ( status==1 ){
				param+=` status= '${status}' , approve_by='${req.adminId}' `
			}else {
				param+=` status= '${status}' `;
			}

			let dbRes = await connection.query(`
			UPDATE user_account set student_id='${student_id}',
			name='${name}', ${param}
			WHERE id=${id}`);
			res.send({status:200,detail:'user account updated'})
		} else {
			res.send({status: 400, detail: 'something went wrong while updating user account'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while updating user account'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function deleteUserAccounts (req,res){
	let id = req.query.id;
	if (!id || !req.adminId ){
		res.send({status: 400, detail: 'invalid request'});
		return;
	}
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`
			DELETE FROM user_account 
			WHERE id=${id}`);
			res.send({status:200,detail:'user account deleted'})
		} else {
			res.send({status: 400, detail: 'something went wrong while deleting user account'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while deleting user account'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


module.exports = {
	getAdminAccounts,
	getUserAccounts,
	addAdminAccounts,
	addUserAccounts,
	updateUserAccounts,
	deleteUserAccounts
};
