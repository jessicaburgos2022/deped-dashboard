const express = require('express');
const router = express.Router();

const { DashboardPPAMonitored, ConductedWithinTimeframe, BudgetUtilizationRate, SatisfactoryResult, DashboardOO } = require('../controller/dashboardController');


router.route('/chart1/:year/:quarter').get(DashboardPPAMonitored);

router.route('/chart2/:year/:quarter').get(SatisfactoryResult);

router.route('/chart3/:year/:quarter').get(ConductedWithinTimeframe);

router.route('/chart4/:year/:quarter').get(BudgetUtilizationRate);

router.route('/oo/:year/:quarter').get(DashboardOO);

module.exports = router;