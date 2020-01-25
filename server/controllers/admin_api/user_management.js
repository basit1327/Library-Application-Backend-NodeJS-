'use strict';

const
	express = require('express'),
	accountsServices = require('../../services/admin/user_management');

let router = express.Router();

router.get('/get_all_admin', accountsServices.getAdminAccounts);
router.get('/get_all_user', accountsServices.getUserAccounts);
router.post('/add_admin', accountsServices.addAdminAccounts);
router.post('/add_user', accountsServices.addUserAccounts);
router.post('/update_user', accountsServices.updateUserAccounts);
router.get('/delete_user', accountsServices.deleteUserAccounts);

module.exports = router;
