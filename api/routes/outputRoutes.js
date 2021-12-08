const express = require('express');
const router = express.Router();

const { insertMajorOutput, insertMinorOutput } = require('../controller/outputController');

router.route('/major').post(insertMajorOutput);
router.route('/minor').post(insertMinorOutput);

module.exports = router;
