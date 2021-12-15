const express = require('express');
const router = express.Router();

const { insertMajorOutput, editMajorOutput, insertMinorOutput, editMinorOutput, insertContributoryOutput, searchMajorOutput, searchMinorOutput, searchContributoryOutput, ListIndicatorsByDepartmentId, editOutputStatus } = require('../controller/outputController');

router.route('/major').post(insertMajorOutput);
router.route('/major').put(editMajorOutput);
router.route('/minor').post(insertMinorOutput);
router.route('/minor').put(editMinorOutput);
router.route('/contributory').post(insertContributoryOutput);
router.route('/major').get(searchMajorOutput);
router.route('/minor').get(searchMinorOutput);
router.route('/contributory').get(searchContributoryOutput);
router.route('/indicator/:departmentid').get(ListIndicatorsByDepartmentId);
router.route('/major/status').put(editOutputStatus);

module.exports = router;
