const express = require('express');
const router = express.Router();

const { searchRole, insertRole, deleteRole, insertUserAccess, getActions, getRoleActions } = require('../controller/roleController');

router.route('/').get(searchRole);
router.route('/').post(insertRole);
router.route('/:id').delete(deleteRole);
router.route('/').put(insertUserAccess);
router.route('/actions').get(getActions);
router.route('/roleaction').get(getRoleActions);

module.exports = router;
