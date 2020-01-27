'use strict';

const
	express = require('express'),
	roomBookingServices = require('../../services/user/room_booking');

let router = express.Router();

router.get('/get_all', roomBookingServices.getMyRoomBookings);
router.post('/new_booking', roomBookingServices.newBooking);
module.exports = router;
