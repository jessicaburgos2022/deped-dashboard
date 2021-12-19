const express = require('express');
const router = express.Router();

const {searchProject,insertProject,editProject} = require('../controller/projectController');

router.route('/').get(searchProject);
router.route('/').post(insertProject);
router.route('/').put(editProject);

module.exports = router;
