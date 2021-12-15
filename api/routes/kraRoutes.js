const express = require('express');
const router = express.Router();

const {searchKRA} = require('../controller/kraController');

router.route('/').get(searchKRA);
module.exports = router;
