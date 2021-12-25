const express = require('express');
const router = express.Router();
const { listOutcomeType, searchOutcome, insertOutcome } = require('../controller/outcomeController');
router.route('/outcometype/').get(listOutcomeType);
router.route('/search').post(searchOutcome);
router.route('/').post(insertOutcome);
module.exports = router;
