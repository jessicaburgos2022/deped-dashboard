const express = require('express');
const router = express.Router();

const { insertMajorOutput, insertMinorOutput, insertContributoryOutput, searchMajorOutput, searchMinorOutput, searchContributoryOutput, ListIndicatorsByDepartmentId } = require('../controller/outputController');

router.route('/major').post(insertMajorOutput);
router.route('/minor').post(insertMinorOutput);
router.route('/contributory').post(insertContributoryOutput);
router.route('/major').get(searchMajorOutput);
router.route('/minor').get(searchMinorOutput);
router.route('/contributory').get(searchContributoryOutput);
router.route('/indicator/:departmentid').get(ListIndicatorsByDepartmentId);

module.exports = router;
