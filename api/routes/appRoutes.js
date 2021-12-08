const express = require('express');
const router = express.Router();

const { listBusinessUnit, getDeploymentPerMarket, getMostDeployed} = require('../controller/appController');

router.route('/businessunit').get(listBusinessUnit);
router.route('/businessunit/deployments').get(getDeploymentPerMarket)
router.route('/businessunit/mostdeployed/:pageSize').get(getMostDeployed)

module.exports = router;
