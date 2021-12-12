const express = require('express');
const router = express.Router();

const { DashboardPPAMonitored, ConductedWithinTimeframe } = require('../controller/dashboardController');


router.route('/chart1').get(DashboardPPAMonitored);

router.route('/chart3').get(ConductedWithinTimeframe);

module.exports = router;