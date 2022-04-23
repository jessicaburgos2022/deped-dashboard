const express = require('express');
const router = express.Router();

const { DashboardPPAMonitored, ConductedWithinTimeframe, BudgetUtilizationRate, SatisfactoryResult, DashboardOO } = require('../controller/dashboardController');


router.route('/chart1/:year').get(DashboardPPAMonitored);

router.route('/chart2/:year').get(SatisfactoryResult);

router.route('/chart3/:year').get(ConductedWithinTimeframe);

router.route('/chart4/:year').get(BudgetUtilizationRate);

router.route('/oo/:year').get(DashboardOO);

module.exports = router;