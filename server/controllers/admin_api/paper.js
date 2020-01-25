'use strict';

const
	express = require('express'),
	examPaperServices = require('../../services/user/paper');

let router = express.Router();

router.get('/get_all', examPaperServices.getExamPapersList);
router.post('/add_new', examPaperServices.addNewPaper);
router.post('/update', examPaperServices.updatePaper);
router.get('/delete', examPaperServices.deletePaper);

module.exports = router;
