const express = require('express');
const router = express.Router();

const { listOutputTypeId, listKRAByDepartmentId } = require('../controller/appController');

router.route('/outputtype').get(listOutputTypeId);
router.route('/kra/:departmentId/:outputTypeId').get(listKRAByDepartmentId)

module.exports = router;
