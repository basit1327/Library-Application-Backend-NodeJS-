'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

async function getMyRoomBookings ( req, res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM room_booking_request where user_id = ${req.userId} order by id desc`);
			res.send({status:200,detail:'List of your all bookings',data:dbRes})
		} else {
			res.send({status: 400, detail: 'something went wrong while getting room bookings'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting room bookings'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function newBooking (req, res){
	let connection;
	let {checkin_date,checkin_time,checkout_time,roomId} = req.body;
	if ( !checkin_date || !checkin_time || !checkout_time || !roomId){
		res.send({status:400,detail:'invalid request'});
		return;
	}
	try {
		let inDateTime = new Date(checkin_date+' '+checkin_time);
		let outDateTime = new Date(checkin_date+' '+checkout_time);

		if ( !inDateTime || !outDateTime ){
			res.send({status:400,detail:'invalid date'});
			return;
		}
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO room_booking_request
			(user_id,room_id,checkin_datetime,checkout_datetime)
			VALUES('${req.userId}',${roomId},'${inDateTime.getTime()}','${outDateTime.getTime()}')
			`);
			if ( dbRes.affectedRows>0 ){
				res.send({status:200,detail:'You booking has been added waiting for approval'})
			} else {
				res.send({status: 400, detail: 'something went wrong while creating booking'});
			}
		} else {
			res.send({status: 400, detail: 'something went wrong while creating booking'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while creating booking'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


module.exports = {
	getMyRoomBookings,
	newBooking
};
