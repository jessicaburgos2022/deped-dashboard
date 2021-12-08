const express = require('express');
const router = express.Router();

const { userController, loadUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/login').post(userController);
router.route('/').get(protect, loadUser);

module.exports = router;
