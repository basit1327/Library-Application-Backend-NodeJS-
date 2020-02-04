'use strict';
const _ = require('lodash'),
	DbConnection = require('../../../dataaccesss/dbconnection').DbConnection;

let pendingBookingTimeCheckTask = null;
let reservedBookingTimeCheckTask = null;

(startTimeCheckingTaskForPending =>{
	pendingBookingTimeCheckTask = setInterval(async ()=>{
		let connection;
		try {
			connection = await new DbConnection().getConnection();
			if ( connection ) {
				let dbRes = await connection.query(`SELECT * FROM room_booking_request where status=0`);
				if ( _.has(dbRes,'[0].id') ){
					let checkinTimeArray = [];
					let timeNow = new Date();
					dbRes.forEach((e,i)=>{
						let dt = new Date(Number(e.checkin_datetime));
						if ( timeNow>=dt ){
							checkinTimeArray.push(e.id);
						}
						else {
							// console.log('skipping:',e.id);
						}
					});
					// console.log('checkinTimeArray',checkinTimeArray);
					if ( checkinTimeArray.length>0 ){
						updateTimeoutBookingStatus(checkinTimeArray);
					}
				}
			} else {
				console.log('something went wrong  in pendingBookingTimeCheckTask');
			}
		}
		catch (e) {
			console.log('Exception: ', e);
		}
		finally {
			if ( connection ) {
				connection.release();
			}
			console.log('==== pendingBookingTimeCheckTask Executed ====');
		}
	},20*1000);
})();

async function updateTimeoutBookingStatus(idsArray){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE room_booking_request set status=${2} where id in(${idsArray.toString()})`);
			console.log('status updated to all timeout room bookings');
		} else {
			console.log('something went wrong in updateTimeoutBookingStatus');
		}
	}
	catch (e) {
		console.log('something went wrong in updateTimeoutBookingStatus');
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


(startTimeCheckingTaskForReserved =>{
	reservedBookingTimeCheckTask = setInterval(async ()=>{
		let connection;
		try {
			connection = await new DbConnection().getConnection();
			if ( connection ) {
				let dbRes = await connection.query(`SELECT * FROM room_bookings where status=0`);
				if ( _.has(dbRes,'[0].id') ){
					let checkoutTimeArray = [];
					let timeNow = new Date();
					dbRes.forEach((e,i)=>{
						let dt = new Date(Number(e.checkout_datetime));
						if ( timeNow>=dt ){
							checkoutTimeArray.push(e.id);
						}
						else {
							// console.log('skipping:',e.id);
						}
					});
					// console.log('checkinTimeArray',checkinTimeArray);
					if ( checkoutTimeArray.length>0 ){
						updateCompleteBookingStatus(checkoutTimeArray);
					}
				}
			} else {
				console.log('something went wrong in reservedBookingTimeCheckTask');
			}
		}
		catch (e) {
			console.log('Exception: ', e);
		}
		finally {
			if ( connection ) {
				connection.release();
			}
			console.log('==== reservedBookingTimeCheckTask Executed ====');
		}
	},20*1000);
})();

async function updateCompleteBookingStatus(idsArray){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`UPDATE room_bookings set status=${1} where id in(${idsArray.toString()})`);
			console.log('status updated to all complete bookings');
		} else {
			console.log('something went wrong in updateCompleteBookingStatus');
		}
	}
	catch (e) {
		console.log('something went wrong in updateCompleteBookingStatus');
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}



async function getBookingRequests(req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT r.*,
			u.name AS user_name,u.student_id,
			rt.name AS room_name 
			FROM room_booking_request r 
			INNER JOIN user_account u ON 
			r.user_id = u.id
			INNER JOIN room_types rt ON 
			r.room_id = rt.id
			where r.status!=1
			order by r.id desc
			`);
			res.send({status:200,detail:'List of pending bookings',data:dbRes})
		} else {
			res.send({status: 400, detail:'something went wrong while getting pending bookings'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting pending bookings'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function getReservedBookings(req,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT r.*,
			u.name AS user_name,u.student_id,
			rt.name AS room_name 
			FROM room_bookings r 
			INNER JOIN user_account u ON 
			r.user_id = u.id
			INNER JOIN room_types rt ON 
			r.room_id = rt.id
			order by r.id desc
			`);
			res.send({status:200,detail:'List of reserved bookings',data:dbRes})
		} else {
			res.send({status: 400, detail:'something went wrong while getting reserved bookings'});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting reserved bookings'});
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function rejectRoomBooking(req,res){
	let bookingId = req.query.bookingId;
	if ( !bookingId ){
		res.send({status:400,detail:"invalid request"});
		return;
	}
	else{
		let connection;
		try {
			connection = await new DbConnection().getConnection();
			if ( connection ) {
				let bookingDetail = await connection.query(`UPDATE 
				room_booking_request
				SET status = 3
 				where id = ${bookingId}`);
				res.send({status:200,detail:'Successfully reject a booking request'})
			} else {
				console.log('something went wrong in rejecting Booking');
			}
		}
		catch (e) {
			console.log('something went wrong in rejecting Booking');
			console.log('Exception: ', e);
		}
		finally {
			if ( connection ) {
				connection.release();
			}
		}
	}
}


async function approveRoomBooking(req,res){
	let bookingId = req.query.bookingId;
	if ( !bookingId ){
		res.send({status:400,detail:"invalid request"});
		return;
	}
	else{
		let connection;
		try {
			connection = await new DbConnection().getConnection();
			if ( connection ) {
				let bookingDetail = await connection.query(`SELECT * 
				FROM room_booking_request
 				where id = ${bookingId}
 				AND status = 0`);
				
				if ( _.has(bookingDetail,'[0].id') ) {
					let data = bookingDetail[0];
					approveABooking(data.id,data.user_id,data.checkin_datetime,data.checkout_datetime,data.room_id,req.adminId,res);
				}
			} else {
				console.log('something went wrong in approve Booking');
			}
		}
		catch (e) {
			console.log('something went wrong in approve Booking');
			console.log('Exception: ', e);
		}
		finally {
			if ( connection ) {
				connection.release();
			}
		}
	}
}

async function approveABooking(requestId,userId,checkinTime,checkoutTime,roomId,adminId,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let activeBookings = await connection.query(`SELECT * 
			FROM room_bookings
 			where STATUS = 0
 			AND room_id = ${roomId}`);
			let canBook = true;
			activeBookings.forEach(e=>{
				if ( checkinTime >= e.checkin_datetime && checkinTime <= e.checkout_datetime ) {
					canBook = false;
				}
				if ( checkoutTime >= e.checkin_datetime && checkoutTime <= e.checkout_datetime ) {
					canBook = false;
				}
			});
			if ( canBook ){
				let insertRes = await connection.query(`INSERT INTO
					room_bookings
					(user_id,booking_id,room_id,checkin_datetime,checkout_datetime,approve_by)
					VALUES (${userId},${requestId},${roomId},'${checkinTime}','${checkoutTime}',${adminId})
				`);
				if ( insertRes.affectedRows>0 ){
					res.send({status:200,detail:'Booking has been approved',id:requestId})
					await connection.query(`UPDATE room_booking_request
					SET status=1
 					where id = ${requestId}`)
				}
				else {
					throw 'could not insert new booking'
				}
			}
			else {
				res.send({status:400,detail:'Room has been booked for this time interval'})
			}
		} else {
			res.send({status:400,detail:'something went wrong in approving booking'})
		}
	}
	catch (e) {
		console.log('something went wrong in approving booking');
		console.log('Exception: ', e);
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}



module.exports = {
	getBookingRequests,
	approveRoomBooking,
	getReservedBookings,
	rejectRoomBooking
};
