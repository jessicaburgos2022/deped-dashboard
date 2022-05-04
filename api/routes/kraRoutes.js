const express = require('express');
const router = express.Router();

const { searchKRA, insertKRA, editKRA } = require('../controller/kraController');

router.route('/:departmentid').get(searchKRA);
router.route('/').post(insertKRA);
router.route('/').put(editKRA);

module.exports = router;
