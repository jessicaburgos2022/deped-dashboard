const express = require('express');
const router = express.Router();

const { ListOrgOutcome, insertOrgOutcome, insertProject } = require('../controller/prexcController');

// router.route('/').get(searchProject);
router.route('/orgoutcome').post(insertOrgOutcome);
router.route('/orgoutcome/:OrgOutcomeId').get(ListOrgOutcome);
router.route('/project').post(insertProject);
router.route('/prexc-indicator').post(insertProject);
// router.route('/').put(editProject);

module.exports = router;
