'use strict';

const
	express = require('express'),
	roomBookingServices = require('../../services/admin/room_booking');

let router = express.Router();

router.get('/get_pending', roomBookingServices.getBookingRequests);
router.get('/get_reserved', roomBookingServices.getReservedBookings);
router.get('/approve', roomBookingServices.approveRoomBooking);

module.exports = router;
