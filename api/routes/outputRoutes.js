const express = require('express');
const router = express.Router();

const { insertMajorOutput, insertMinorOutput, searchMajorOutput } = require('../controller/outputController');

router.route('/major').post(insertMajorOutput);
router.route('/minor').post(insertMinorOutput);
router.route('/major').get(searchMajorOutput);

module.exports = router;
