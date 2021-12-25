const express = require('express');
const router = express.Router();
const { listOutcomeType, searchOutcome, insertOutcome, listIndicatorsByOutcomeId, updateIsGraphDataByIndicatorId } = require('../controller/outcomeController');
router.route('/outcometype/').get(listOutcomeType);
router.route('/indicator/:outcomeid').get(listIndicatorsByOutcomeId);
router.route('/indicator/graphdata').post(updateIsGraphDataByIndicatorId);
router.route('/search').post(searchOutcome);
router.route('/').post(insertOutcome);
module.exports = router;
