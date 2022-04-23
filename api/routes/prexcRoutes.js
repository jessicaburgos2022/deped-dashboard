const express = require('express');
const router = express.Router();

const { ListOrgOutcome, insertOrgOutcome, insertProject, listProjectIndicatorsByOrgOutcomeId, insertIndicator } = require('../controller/prexcController');

// router.route('/').get(searchProject);
router.route('/orgoutcome').post(insertOrgOutcome);
router.route('/orgoutcome/:OrgOutcomeId').get(ListOrgOutcome);
router.route('/project/indicator').get(listProjectIndicatorsByOrgOutcomeId);
router.route('/project').post(insertProject);
router.route('/indicator').post(insertIndicator);
// router.route('/').put(editProject);

module.exports = router;
