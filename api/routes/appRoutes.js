const express = require('express');
const router = express.Router();

const { listOutputTypeId, listKRAByDepartmentId, listProjectByKRAId } = require('../controller/appController');

router.route('/outputtype').get(listOutputTypeId);
router.route('/kra/:departmentId').get(listKRAByDepartmentId)
router.route('/project/:kraId').get(listProjectByKRAId)

module.exports = router;
