const express = require('express');
const router = express.Router();

const { listOutputTypeId, listKRAByDepartmentId, listUnitIdPerDepartmentId, listProjectByKRAId, listProjectsByDepartmentId, listDepartment, listRoleList } = require('../controller/appController');
router.route('/department').get(listDepartment);
router.route('/unitbydept/:departmentId').get(listUnitIdPerDepartmentId);
router.route('/outputtype').get(listOutputTypeId);
router.route('/kra/:departmentId').get(listKRAByDepartmentId);
router.route('/project/:kraId').get(listProjectByKRAId);
router.route('/project/department/:departmentId').get(listProjectsByDepartmentId);
router.route('/role/list').get(listRoleList);
module.exports = router;
