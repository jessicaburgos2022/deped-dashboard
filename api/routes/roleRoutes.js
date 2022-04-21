const express = require('express');
const router = express.Router();

const {searchRole} = require('../controller/roleController');

router.route('/').get(searchRole);

module.exports = router;
