const express = require('express');
const router = express.Router();

const { userController, loadUser, searchUserAccounts } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/login').post(userController);
router.route('/').get(protect, loadUser);
router.route('/search').get(protect, searchUserAccounts);

module.exports = router;
