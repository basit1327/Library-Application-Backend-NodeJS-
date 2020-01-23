'use strict';

const
	express = require('express'),
	examPaperServices = require('../../services/user/paper');

let router = express.Router();

router.get('/get_all', examPaperServices.getExamPapersList);

module.exports = router;
