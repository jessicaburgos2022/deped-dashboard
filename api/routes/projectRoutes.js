const express = require('express');
const router = express.Router();

const {searchProject,insertProject,editProject} = require('../controller/projectController');

router.route('/:departmentid').get(searchProject);
router.route('/').post(insertProject);
router.route('/').put(editProject);

module.exports = router;
