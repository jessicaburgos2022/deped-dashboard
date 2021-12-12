const express = require('express');
const router = express.Router();

const { DashboardPPAMonitored } = require('../controller/dashboardController');


router.route('/chart1').get(DashboardPPAMonitored);

module.exports = router;